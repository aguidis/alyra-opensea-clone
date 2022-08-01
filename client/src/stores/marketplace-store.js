import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useWalletStore } from './wallet-store';
import MarketplaceNFT from '../contracts/MarketplaceNFT.json';
import GenericNFT from '../contracts/GenericNFT.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';

const readOnlyProvider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
const signer = readOnlyProvider.getSigner();

const marketplaceNetwork = MarketplaceNFT.networks[DEFAULT_NETWORK];

const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, MarketplaceNFT.abi, signer);

export const useMarketplaceStore = defineStore({
    id: 'marketplace',
    state: () => ({
        collections: [],
        accountTokens: [],
        collection: null,
        collectionItems: [],
        token: null,
        transactionHash: null,
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

                const tokenPromises = [...Array(max).keys()].map((i) => {
                    let currentTokenId;
                    let currentTokenMetadata;

                    return nftContract
                        .tokenByIndex(i)
                        .then((tokenId) => {
                            currentTokenId = tokenId;
                            return nftContract.tokenURI(tokenId);
                        })
                        .then((tokenURI) => {
                            const ipfsGateway = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                            return fetch(ipfsGateway).then((metadata) => metadata.json());
                        })
                        .then((metadata) => {
                            currentTokenMetadata = metadata;
                            return readOnlyMarketplaceContract.getListing(address, currentTokenId);
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

                Promise.all(tokenPromises).then((values) => {
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

                let totalSupply = await nftContract.totalSupply();
                totalSupply = parseInt(totalSupply.toString(), 10);

                if (tokenIndex >= totalSupply) {
                    throw 'Token index not found';
                }

                const tokenId = await nftContract.tokenByIndex(tokenIndex);

                const tokenURI = await nftContract.tokenURI(tokenId);

                const metadataUrl = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                const tokenMetadata = await fetch(metadataUrl);

                const token = await tokenMetadata.json();
                const listing = await readOnlyMarketplaceContract.getListing(address, tokenIndex);
                const owner = await nftContract.ownerOf(tokenIndex);

                // Get listing history
                const filter = readOnlyMarketplaceContract.filters.ItemListed(tokenIndex, address);
                const logs = await readOnlyMarketplaceContract.queryFilter(filter, 0, 'latest');
                const listingHistory = logs.map((event) => {
                    const eventContent = event.args;
                    return {
                        price: parseInt(eventContent.price.toString(), 10),
                        seller: eventContent.seller,
                        transactionHash: event.transactionHash
                    };
                });

                this.token = {
                    ...token,
                    owner: owner,
                    tokenMetadata: metadataUrl,
                    listing: {
                        price: parseInt(listing.price.toString(), 10),
                        seller: listing.seller,
                        history: listingHistory
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

                const latestEvent = receipt.events.at(-1);
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
        async updateListing(nftAddress, tokenId, price) {
            this.loading = true;

            try {
                const { state: wallet } = useWalletStore();
                const signer = wallet.provider.getSigner();

                // Update item price
                const marketplaceContract = new ethers.Contract(marketplaceNetwork.address, MarketplaceNFT.abi, signer);
                const tx = await marketplaceContract.updateListing(nftAddress, tokenId, price);
                // Wait for one block confirmation. The transaction has been mined at this point.
                const receipt = await tx.wait();

                const latestEvent = receipt.events.at(-1);
                if (receipt.events.length === 0 || latestEvent.event !== 'ItemListed') {
                    throw 'Update token listing attempt not confirmed.';
                }

                this.token.listing.price = parseInt(latestEvent.args.price.toString());
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async cancelListing(nftAddress, tokenId) {
            this.loading = true;

            try {
                const { state: wallet } = useWalletStore();
                const signer = wallet.provider.getSigner();

                // Update item price
                const marketplaceContract = new ethers.Contract(marketplaceNetwork.address, MarketplaceNFT.abi, signer);
                const tx = await marketplaceContract.cancelListing(nftAddress, tokenId);
                // Wait for one block confirmation. The transaction has been mined at this point.
                const receipt = await tx.wait();

                const latestEvent = receipt.events.at(-1);
                if (receipt.events.length === 0 || latestEvent.event !== 'ItemCanceled') {
                    throw 'Token listing cancellation attempt not confirmed.';
                }

                this.token.listing.price = 0;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async buyItem(nftAddress, tokenId, price) {
            console.log('allo');
            this.loading = true;

            try {
                const { state: wallet } = useWalletStore();
                const signer = wallet.provider.getSigner();

                // Update item price
                const marketplaceContract = new ethers.Contract(marketplaceNetwork.address, MarketplaceNFT.abi, signer);

                let overrides = {
                    value: ethers.utils.parseEther(price.toString())
                };

                const tx = await marketplaceContract.buyItem(nftAddress, tokenId, overrides);

                // Wait for one block confirmation. The transaction has been mined at this point.
                const receipt = await tx.wait();

                this.transactionHash = receipt.transactionHash;

                const latestEvent = receipt.events.at(-1);

                if (receipt.events.length === 0 || latestEvent.event !== 'ItemBought') {
                    throw 'Token order not confirmed.';
                }

                this.token.listing.price = 0;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchAccountTokens() {
            this.loading = true;

            if (this.accountTokens.length > 0) {
                this.loading = false;
                return;
            }

            try {
                const { state: wallet } = useWalletStore();
                const collectionCount = await readOnlyMarketplaceContract.getCollectionCount();

                let tokenPromises = [];

                const collectionCountInt = parseInt(collectionCount.toString(), 10);

                for (let i = 0; i < collectionCountInt; i++) {
                    const collection = await readOnlyMarketplaceContract.getCollectionAtIndex(i);

                    const nftContract = new ethers.Contract(collection.nftAddress, GenericNFT.abi, signer);
                    const balance = await nftContract.balanceOf(wallet.address);

                    const balanceInt = parseInt(balance.toString(), 10);
                    const promises = [...Array(balanceInt).keys()].map((y) => {
                        let currentTokenId;
                        let currentTokenMetadata;

                        return nftContract
                            .tokenOfOwnerByIndex(wallet.address, y)
                            .then((tokenId) => {
                                currentTokenId = tokenId;
                                return nftContract.tokenURI(tokenId);
                            })
                            .then((tokenURI) => {
                                const ipfsGateway = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                                return fetch(ipfsGateway).then((metadata) => metadata.json());
                            })
                            .then((metadata) => {
                                currentTokenMetadata = metadata;

                                return readOnlyMarketplaceContract.getListing(collection.nftAddress, currentTokenId);
                            })
                            .then((listing) => {
                                return {
                                    id: currentTokenId.toString(),
                                    ...currentTokenMetadata,
                                    nftAddress: collection.nftAddress,
                                    listing: {
                                        price: parseInt(listing.price.toString(), 10),
                                        seller: listing.seller
                                    }
                                };
                            });
                    });

                    tokenPromises = [...tokenPromises, ...promises];
                }

                Promise.all(tokenPromises).then((values) => {
                    this.accountTokens = values;
                    this.loading = false;
                });
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
