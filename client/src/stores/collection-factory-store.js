import { ethers } from 'ethers';
import { defineStore } from 'pinia';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

import NFTCollectionFactory from '../contracts/NFTCollectionFactory.json';
import NFTMarketplace from '../contracts/NFTMarketplace.json';
import UpgradableGenericNFT from '../contracts/UpgradableGenericNFT.json';

import { getNetworkParams } from '../helpers/network-params';
import { DEFAULT_NETWORK } from '../constants/blockchain';
import { useWalletStore } from './wallet-store';

const readOnlyProvider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
const signer = readOnlyProvider.getSigner();

const factoryNetwork = NFTCollectionFactory.networks[DEFAULT_NETWORK];
const readOnlyFactoryContract = new ethers.Contract(factoryNetwork.address, NFTCollectionFactory.abi, signer);

const marketplaceNetwork = NFTMarketplace.networks[DEFAULT_NETWORK];
const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, NFTMarketplace.abi, signer);

export const useCollectionFactoryStore = defineStore({
    id: 'collection-factory',
    state: () => ({
        newCollection: null,
        ownedCollections: [],
        transactionHash: null,
        loading: false,
        error: null
    }),
    actions: {
        async create(name, symbol, description, authorName) {
            this.loading = true;

            try {
                const { state: wallet } = useWalletStore();
                const signer = wallet.provider.getSigner();

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
        async fetchAccountCollections() {
            this.loading = true;

            if (this.ownedCollections.length > 0) {
                this.loading = false;
                return;
            }

            try {
                const { state: wallet } = useWalletStore();

                const collectionCount = await readOnlyFactoryContract.getOwnerBalance(wallet.address);

                const balance = parseInt(collectionCount.toString(), 10);

                /*
                if (balance === 0) {
                    return;
                }

                for (let i = 0; i < balance; i++) {
                    const collectionAddress = await readOnlyFactoryContract.getOwnerCollectionByIndex('0x14CE1C9Fe889c90E7716E091045D7f821306fc94', i);

                    // Fetch collection information
                    let marketPlaceCollection = await readOnlyMarketplaceContract.getCollectionByAddress(collectionAddress);

                    const nftContract = new ethers.Contract(collectionAddress, UpgradableGenericNFT.abi, signer);

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

                    this.ownedCollections.push(marketPlaceCollection);
                }
                */
            } catch (error) {
                console.log('ici', error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
