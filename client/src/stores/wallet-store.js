import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { markRaw } from 'vue';
import { defineStore } from 'pinia';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';
import { switchNetwork } from '../helpers/switch-network';

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    [DEFAULT_NETWORK]: getNetworkParams().rpcUrls[0]
                }
            }
        }
    }
});

export const useWalletStore = defineStore({
    id: 'wallet',
    state: () => ({
        provider: markRaw(new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0])),
        address: null,
        balance: 0,
        isConnected: false,
        providerChainID: DEFAULT_NETWORK
    }),
    actions: {
        changeNetwork(otherChainID) {
            this.providerChainID = Number(otherChainID);
        },
        _initListeners(rawProvider) {
            if (!rawProvider.on) {
                return;
            }

            rawProvider.on('accountsChanged', () => setTimeout(() => window.location.reload(), 1));

            rawProvider.on('chainChanged', async (chain) => {
                this.changeNetwork(chain);
            });

            rawProvider.on('network', (_newNetwork, oldNetwork) => {
                if (!oldNetwork) return;
                window.location.reload();
            });
        },
        async connect() {
            const rawProvider = await web3Modal.connect();

            this._initListeners(rawProvider);

            const connectedProvider = new Web3Provider(rawProvider, 'any');

            const chainId = await connectedProvider.getNetwork().then((network) => Number(network.chainId));

            this.address = await connectedProvider.getSigner().getAddress();

            const balance = await connectedProvider.getSigner().getBalance();

            const balanceEth = ethers.utils.formatEther(balance);
            this.balance = Math.round(balanceEth * 1e4) / 1e4;

            this.providerChainID = chainId;

            if (chainId === DEFAULT_NETWORK) {
                this.provider = markRaw(connectedProvider);
            }

            this.isConnected = true;
        },
        async checkWrongNetwork() {
            if (this.providerChainID !== DEFAULT_NETWORK) {
                const shouldSwitch = window.confirm('Switch to Ethereum network?');
                if (shouldSwitch) {
                    await switchNetwork();
                }
                return true;
            }

            return false;
        },
        disconnect() {
            this.provider = markRaw(new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]));
            this.isConnected = false;
            this.address = null;
            this.balance = 0;
            this.providerChainID = DEFAULT_NETWORK;
        },
        hasCachedProvider() {
            if (!web3Modal) return false;
            if (!web3Modal.cachedProvider) return false;
            return true;
        }
    }
});
