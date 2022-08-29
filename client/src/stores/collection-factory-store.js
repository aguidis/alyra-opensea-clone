import { ethers } from 'ethers';
import { defineStore, storeToRefs } from 'pinia';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

import NFTCollectionFactory from '../contracts/NFTCollectionFactory.json';
import NFTMarketplace from '../contracts/NFTMarketplace.json';
import UpgradableGenericNFT from '../contracts/UpgradableGenericNFT.json';

import { getNetworkParams } from '../helpers/network-params';
import { DEFAULT_NETWORK } from '../constants/blockchain';
import { useWalletStore } from './wallet-store';

const provider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);

const factoryNetwork = NFTCollectionFactory.networks[DEFAULT_NETWORK];
// Prevent error: Error: unknown account #0 (operation="getAddress", code=UNSUPPORTED_OPERATION, version=providers/5.6.8)
const readOnlyFactoryContract = new ethers.Contract(factoryNetwork.address, NFTCollectionFactory.abi, provider);

const marketplaceNetwork = NFTMarketplace.networks[DEFAULT_NETWORK];
const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, NFTMarketplace.abi, provider);

export const useCollectionFactoryStore = defineStore({
    id: 'collection-factory',
    state: () => ({
        newCollection: null,
        accountCollections: [],
        accountCollectionsForMinting: [],
        transactionHash: null,
        loading: false,
        error: null
    }),
    actions: {
        async create(name, symbol, description, authorName) {
            this.loading = true;

            try {
                const { provider } = useWalletStore();
                const signer = provider.getSigner();

                const factoryContract = new ethers.Contract(factoryNetwork.address, NFTCollectionFactory.abi, signer);

                const tx = await factoryContract.createNFTCollection(name, symbol, description, authorName);

                // Wait for one block confirmation. The transaction has been mined at this point.
                const receipt = await tx.wait();

                this.transactionHash = receipt.hash;
                const latestEvent = receipt.events.at(-1);

                if (receipt.events.length === 0 || latestEvent.event !== 'NFTCollectionCreated') {
                    throw 'Collection creation failed.';
                }

                this.newCollection = await readOnlyMarketplaceContract.getCollectionByAddress(latestEvent.args._collectionAddress);
            } catch (error) {
                console.log('creation failed', error);

                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchAccountCollections(accountAddress) {
            this.loading = true;
            this.accountCollections = [];

            if (!accountAddress) {
                return;
            }

            try {
                const collectionCount = await readOnlyFactoryContract.getOwnerBalance(accountAddress);

                const balance = parseInt(collectionCount.toString(), 10);

                for (let i = 0; i < balance; i++) {
                    const collectionAddress = await readOnlyFactoryContract.getOwnerCollectionByIndex(accountAddress, i);

                    // Fetch collection information
                    let marketPlaceCollection = await readOnlyMarketplaceContract.getCollectionByAddress(collectionAddress);

                    const nftContract = new ethers.Contract(collectionAddress, UpgradableGenericNFT.abi, provider);

                    let totalSupply = await nftContract.totalSupply();
                    totalSupply = parseInt(totalSupply.toString(), 10);

                    if (totalSupply > 0) {
                        // Fetch first item for each collection in order to have an image preview
                        nftContract
                            .tokenByIndex(0)
                            .then((tokenIndex) => {
                                return nftContract.tokenURI(tokenIndex);
                            })
                            .then((tokenURI) => {
                                const ipfsGateway = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                                return fetch(ipfsGateway).then((metadata) => metadata.json());
                            })
                            .then((itemMetadata) => {
                                marketPlaceCollection = { ...marketPlaceCollection, coverImage: itemMetadata.image };
                            });
                    }

                    this.accountCollections.push(marketPlaceCollection);
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchAccountCollectionsForMinting(accountAddress) {
            this.loading = true;

            try {
                const collectionCount = await readOnlyFactoryContract.getOwnerBalance(accountAddress);

                const balance = parseInt(collectionCount.toString(), 10);

                if (balance === 0) {
                    return;
                }

                for (let i = 0; i < balance; i++) {
                    const collectionAddress = await readOnlyFactoryContract.getOwnerCollectionByIndex(accountAddress, i);

                    // Fetch collection information
                    let marketPlaceCollection = await readOnlyMarketplaceContract.getCollectionByAddress(collectionAddress);

                    this.accountCollectionsForMinting.push(marketPlaceCollection);
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
