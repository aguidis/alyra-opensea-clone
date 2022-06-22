import { StaticJsonRpcProvider } from '@ethersproject/providers';
import MarketplaceNFT from '../contracts/MarketplaceNFT.json';
//import IERC721 from '../contracts/IERC721.json';
import { ethers } from 'ethers';

import { markRaw, reactive } from 'vue';
import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';

export const useCollectionStore = defineStore('collection', () => {
    const state = reactive({
        provider: markRaw(new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0])),
        contract: null,
        collections: [],
        loading: false,
        providerChainID: DEFAULT_NETWORK
    });

    async function getCollections() {
        state.loading = true;
        try {
            const marketplaceContractNetwork = MarketplaceNFT.networks[state.providerChainID];
            const marketplaceSigner = state.provider.getSigner();

            state.contract = markRaw(new ethers.Contract(marketplaceContractNetwork.address, MarketplaceNFT.abi, marketplaceSigner));

            const collectionCount = await state.contract.getCollectionCount();

            console.log('getCollections', collectionCount.toString());

            state.loading = false;
        } catch (e) {
            state.loading = false;
            console.log('e', e);
        }
    }

    return {
        state,
        getCollections
    };
});
