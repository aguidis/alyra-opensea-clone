import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

import { defineStore } from 'pinia';
import { markRaw, reactive } from 'vue';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';
import { switchNetwork } from '../helpers/switch-network';

export const useWalletStore = defineStore('wallet', () => {
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

    const state = reactive({
        provider: new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]),
        address: '',
        isConnected: false,
        providerChainID: DEFAULT_NETWORK
    });

    const changeNetwork = async (otherChainID) => {
        state.providerChainID = Number(otherChainID);
    };

    function _initListeners(rawProvider) {
        if (!rawProvider.on) {
            return;
        }

        rawProvider.on('accountsChanged', () =>
            setTimeout(() => window.location.reload(), 1)
        );

        rawProvider.on('chainChanged', async (chain) => {
            changeNetwork(chain);
        });

        rawProvider.on('network', (_newNetwork, oldNetwork) => {
            if (!oldNetwork) return;
            window.location.reload();
        });
    }

    async function connect() {
        const rawProvider = await web3Modal.connect();

        _initListeners(rawProvider);

        const connectedProvider = new Web3Provider(rawProvider, 'any');

        const chainId = await connectedProvider
            .getNetwork()
            .then((network) => Number(network.chainId));

        state.address = await connectedProvider.getSigner().getAddress();
        state.providerChainID = chainId;

        if (chainId === DEFAULT_NETWORK) {
            state.provider = markRaw(connectedProvider);
        }

        state.isConnected = true;
        return connectedProvider;
    }
    const checkWrongNetwork = async () => {
        if (state.providerChainID !== DEFAULT_NETWORK) {
            const shouldSwitch = window.confirm('Switch to Ethereum network?');
            if (shouldSwitch) {
                await switchNetwork();
            }
            return true;
        }

        return false;
    };

    function disconnect() {
        state.isConnected = false;
        state.address = '';
        state.providerChainID = DEFAULT_NETWORK;
        state.provider = new StaticJsonRpcProvider(
            getNetworkParams().rpcUrls[0]
        );
    }

    function hasCachedProvider() {
        if (!web3Modal) return false;
        if (!web3Modal.cachedProvider) return false;
        return true;
    }

    return {
        connect,
        disconnect,
        checkWrongNetwork,
        hasCachedProvider,
        state
    };
});
