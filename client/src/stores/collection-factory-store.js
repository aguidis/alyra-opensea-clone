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

console.log('factoryNetwork', factoryNetwork.address)

const readOnlyFactoryContract = new ethers.Contract(factoryNetwork.address, NFTCollectionFactory.abi, signer);

const marketplaceNetwork = NFTMarketplace.networks[DEFAULT_NETWORK];

console.log('marketplaceNetwork', marketplaceNetwork.address)

const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, NFTMarketplace.abi, signer);

export const useCollectionFactoryStore = defineStore({
    id: 'collection-factory',
    state: () => ({
        factoryAddress: factoryNetwork.address,
        collection: null,
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

                console.log('factoryContract', factoryContract)

                const receipt = await factoryContract.createNFTCollection(name, symbol, description, authorName);

                this.transactionHash = receipt.transactionHash;

                const latestEvent = receipt.events.at(-1);

                if (receipt.events.length === 0 || latestEvent.event !== 'NFTCollectionCreated') {
                    throw 'Collection creation failed.';
                }

                console.log('NFTCollectionCreated', latestEvent)

            } catch (error) {
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
                const collectionCount = await readOnlyFactoryContract.getOwnerBalance();
                const balance = parseInt(collectionCount.toString(), 10);

                if (balance === 0) {
                    return;
                }

                for (let i = 0; i < balance; i++) {
                    const collectionAddress = await readOnlyFactoryContract.getOwnerCollectionByIndex(i);

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
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
