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
    id: 'post',
    state: () => ({
        collections: [],
        collection: null,
        collectionItems: [],
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

                    this.collections.push(collection);
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCollection(index) {
            this.loading = true;
            this.collection = null;

            try {
                this.collection = await maketplaceContract.getCollectionAtIndex(index);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCollectionItems(address) {
            this.loading = true;
            this.collectionItems = [];

            try {
                const nftContract = new ethers.Contract(address, GenericNFT.abi, signer);

                // TODO handle infinite scroll pagination
                let totalSupply = await nftContract.totalSupply();
                totalSupply = parseInt(totalSupply.toString(), 10);
                const max = totalSupply > 10 ? 9 : totalSupply;

                console.log('total', totalSupply);

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
                });
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
