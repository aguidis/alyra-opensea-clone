import { useWalletStore } from './wallet-store';
import NFTMinter from '../contracts/NFTMinter.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';

const minterNetwork = NFTMinter.networks[DEFAULT_NETWORK];

export const useCollectionFactoryStore = defineStore({
    id: 'collection-factory',
    state: () => ({
        minterAddress: minterNetwork.address,
        token: null,
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

                const minterContract = new ethers.Contract(minterNetwork.address, NFTMinter.abi, signer);

                const tx = await minterContract.safeMint(wallet.address, metadataUri);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
