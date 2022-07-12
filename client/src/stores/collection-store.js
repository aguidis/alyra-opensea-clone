import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useWalletStore } from './wallet-store';
import MarketplaceNFT from '../contracts/MarketplaceNFT.json';
import GenericNFT from '../contracts/PokemonNFT.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';

const readOnlyProvider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
const signer = readOnlyProvider.getSigner();

const marketplaceNetwork = MarketplaceNFT.networks[DEFAULT_NETWORK];
const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, MarketplaceNFT.abi, signer);

export const useCollectionStore = defineStore({
    id: 'collection',
    state: () => ({
        collections: [],
        collection: null,
        collectionItems: [],
        token: null,
        loading: false,
        error: null
    }),
    actions: {
        async fetchCollections() {
            this.loading = true;

            if (this.collections.length > 0) {
                this.loading = false;
                return;
            }

            try {
                const collectionCount = await readOnlyMarketplaceContract.getCollectionCount();

                for (let i = 0; i < parseInt(collectionCount.toString(), 10); i++) {
                    const collection = await readOnlyMarketplaceContract.getCollectionAtIndex(i);

                    const nftContract = new ethers.Contract(collection.nftAddress, GenericNFT.abi, signer);

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
                            const collectionWithCoverImage = { ...collection, coverImage: itemMetadata.image };

                            this.collections.push(collectionWithCoverImage);
                        });
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCollection(identifier) {
            this.loading = true;
            this.collection = null;

            try {
                if (ethers.utils.isAddress(identifier)) {
                    this.collection = await readOnlyMarketplaceContract.getCollectionByAddress(identifier);
                } else {
                    this.collection = await readOnlyMarketplaceContract.getCollectionAtIndex(identifier);
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCollectionItems(address) {
            console.log('fetchCollectionItems');
            this.loading = true;
            this.collectionItems = [];

            try {
                const nftContract = new ethers.Contract(address, GenericNFT.abi, signer);

                // TODO handle infinite scroll pagination
                let totalSupply = await nftContract.totalSupply();
                totalSupply = parseInt(totalSupply.toString(), 10);
                const max = totalSupply > 10 ? 9 : totalSupply;

                const grog = [...Array(max).keys()].map((i) => {
                    let currentTokenIndex;
                    let currentTokenMetadata;

                    return nftContract
                        .tokenByIndex(i)
                        .then((tokenIndex) => {
                            currentTokenIndex = tokenIndex;
                            return nftContract.tokenURI(tokenIndex);
                        })
                        .then((tokenURI) => {
                            const ipfsGateway = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                            return fetch(ipfsGateway).then((metadata) => metadata.json());
                        })
                        .then((metadata) => {
                            currentTokenMetadata = metadata;
                            return readOnlyMarketplaceContract.getListing(address, currentTokenIndex);
                        })
                        .then((listing) => {
                            return {
                                ...currentTokenMetadata,
                                listing: {
                                    price: parseInt(listing.price.toString(), 10),
                                    seller: listing.seller
                                }
                            };
                        });
                });

                Promise.all(grog).then((values) => {
                    this.collectionItems = values;
                    this.loading = false;
                });
            } catch (error) {
                this.error = error;
            }
        },
        async fetchToken(address, tokenIndex) {
            this.loading = true;
            this.token = null;

            try {
                const nftContract = new ethers.Contract(address, GenericNFT.abi, signer);

                // TODO handle infinite scroll pagination
                let totalSupply = await nftContract.totalSupply();
                totalSupply = parseInt(totalSupply.toString(), 10);

                if (tokenIndex >= totalSupply) {
                    throw 'Token index not found';
                }

                const tokenId = await nftContract.tokenByIndex(tokenIndex);
                const tokenURI = await nftContract.tokenURI(tokenId);

                const metadataUrl = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                const tokenMetadata = await fetch(metadataUrl);

                this.tokenMetadata = metadataUrl;
                const token = await tokenMetadata.json();
                const listing = await readOnlyMarketplaceContract.getListing(address, tokenIndex);
                const owner = await nftContract.ownerOf(tokenIndex);

                this.token = {
                    ...token,
                    owner: owner,
                    tokenMetadata: metadataUrl,
                    listing: {
                        price: parseInt(listing.price.toString(), 10),
                        seller: listing.seller
                    }
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async listItem(nftAddress, tokenId, price) {
            this.loading = true;

            try {
                const { state: wallet } = useWalletStore();
                const signer = wallet.provider.getSigner();

                // First approve Marketplace to apply changes on behalf of the owner
                const nftContract = new ethers.Contract(nftAddress, GenericNFT.abi, signer);

                const nftOperator = await nftContract.getApproved(tokenId);

                if (!nftOperator || nftOperator !== marketplaceNetwork.address) {
                    await nftContract.approve(marketplaceNetwork.address, tokenId);
                }

                // Then list item into marketplace
                const marketplaceContract = new ethers.Contract(marketplaceNetwork.address, MarketplaceNFT.abi, signer);
                const tx = await marketplaceContract.listItem(nftAddress, tokenId, price);
                // Wait for one block confirmation. The transaction has been mined at this point.
                const receipt = await tx.wait();

                const latestEvent = receipt.events[0];
                if (receipt.events.length === 0 || latestEvent.event !== 'ItemListed') {
                    throw 'Listing token attempt not confirmed.';
                }

                this.token.listing.price = parseInt(latestEvent.args.price.toString());
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        test(price) {
            this.token.listing.price = price;
        }
    }
});
