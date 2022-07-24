import { useWalletStore } from './wallet-store';
import NFTMinter from '../contracts/NFTMinter.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';

const minterNetwork = NFTMinter.networks[DEFAULT_NETWORK];

export const useMinterStore = defineStore({
    id: 'minter',
    state: () => ({
        token: null,
        transactionHash: null,
        loading: false,
        error: null
    }),
    actions: {
        async mint(metadataUri) {
            this.loading = true;

            try {
                const { state: wallet } = useWalletStore();
                const signer = wallet.provider.getSigner();

                const minterContract = new ethers.Contract(minterNetwork.address, NFTMinter.abi, signer);
                const tx = await minterContract.safeMint(wallet.state.address, metadataUri);
                // Wait for one block confirmation. The transaction has been mined at this point.
                const receipt = await tx.wait();

                console.log('mint transaction', receipt);

                // TODO
                // fetch token
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
