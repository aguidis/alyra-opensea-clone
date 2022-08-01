import { useWalletStore } from './wallet-store';
import NFTMinter from '../contracts/NFTMinter.json';
import { ethers } from 'ethers';

import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';

const minterNetwork = NFTMinter.networks[DEFAULT_NETWORK];

export const useMinterStore = defineStore({
    id: 'minter',
    state: () => ({
        minterAddress: minterNetwork.address,
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

                const tx = await minterContract.safeMint(wallet.address, metadataUri);

                // Wait for the transaction to be confirmed, then get the token ID out of the emitted Transfer event.
                const receipt = await tx.wait();

                console.log('receipt', receipt);
                console.log('receipt', receipt.events);

                let tokenId = null;
                for (const event of receipt.events) {
                    if (event.event !== 'Transfer') {
                        continue;
                    }
                    tokenId = event.args.tokenId.toString();
                    break;
                }

                if (tokenId === null) {
                    throw 'Mint failed';
                }

                const metadataUrl = metadataUri.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                const tokenMetadata = await fetch(metadataUrl);

                const token = await tokenMetadata.json();

                console.log('token', {
                    id: tokenId,
                    ...token,
                    tokenMetadata: metadataUrl
                });

                this.token = {
                    id: tokenId,
                    ...token,
                    tokenMetadata: metadataUrl
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
