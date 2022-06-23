import { StaticJsonRpcProvider } from '@ethersproject/providers';
import MarketplaceNFT from '../contracts/MarketplaceNFT.json';
//import IERC721 from '../contracts/IERC721.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';

export const useCollectionStore = defineStore({
    id: 'post',
    state: () => ({
        collections: [],
        collection: null,
        loading: false,
        error: null
    }),
    actions: {
        async fetchCollections() {
            this.collections = [];
            this.loading = true;
            try {
                const provider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
                const marketplaceSigner = provider.getSigner();

                const contractNetwork = MarketplaceNFT.networks[DEFAULT_NETWORK];
                const contract = new ethers.Contract(contractNetwork.address, MarketplaceNFT.abi, marketplaceSigner);

                const collectionCount = await contract.getCollectionCount();

                for (let i = 0; i < parseInt(collectionCount.toString(), 10); i++) {
                    const collection = await contract.getCollectionAtIndex(i);

                    this.collections.push(collection);
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
