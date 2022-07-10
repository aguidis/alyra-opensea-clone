import { StaticJsonRpcProvider } from '@ethersproject/providers';
import MarketplaceNFT from '../contracts/MarketplaceNFT.json';
import GenericNFT from '../contracts/PokemonNFT.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';

const provider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
const signer = provider.getSigner();

const contractNetwork = MarketplaceNFT.networks[DEFAULT_NETWORK];
const maketplaceContract = new ethers.Contract(contractNetwork.address, MarketplaceNFT.abi, signer);

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
                const collectionCount = await maketplaceContract.getCollectionCount();

                for (let i = 0; i < parseInt(collectionCount.toString(), 10); i++) {
                    const collection = await maketplaceContract.getCollectionAtIndex(i);

                    const nftContract = new ethers.Contract(collection.nftAddress, GenericNFT.abi, signer);

                    nftContract
                        .tokenByIndex(0)
                        .then((tokenIndex) => {
                            console.log('tokenIndex', tokenIndex);

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
                    this.collection = await maketplaceContract.getCollectionByAddress(identifier);
                } else {
                    this.collection = await maketplaceContract.getCollectionAtIndex(identifier);
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

                // Promise.all()
                const grog = [...Array(max).keys()].map((i) => {
                    return nftContract
                        .tokenByIndex(i)
                        .then((tokenIndex) => {
                            return nftContract.tokenURI(tokenIndex);
                        })
                        .then((tokenURI) => {
                            const ipfsGateway = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                            return fetch(ipfsGateway).then((metadata) => metadata.json());
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

            console.log('address', address);
            console.log('tokenIndex', tokenIndex);

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
                const listing = await maketplaceContract.getListing(address, tokenIndex);

                this.token = {
                    ...token,
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
        }
    }
});
