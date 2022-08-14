<script setup>
import { computed } from 'vue';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { useWalletStore } from '../stores/wallet-store';
import { shortenAddress } from '../helpers/address';
import Identicon from './Identicon.vue';

const wallet = useWalletStore();

let onWalletConnectClick = async () => {
    if (wallet.state.isConnected && wallet.state.providerChainID !== DEFAULT_NETWORK) {
        await wallet.checkWrongNetwork();
    } else if (wallet.state.isConnected) {
        wallet.disconnect();
    } else {
        await wallet.connect();
    }
};

const wrongNetwork = computed(() => {
    return wallet.state.isConnected && wallet.state.providerChainID !== DEFAULT_NETWORK;
});

const buttonText = computed(() => {
    if (wallet.state.isConnected && wallet.state.providerChainID !== DEFAULT_NETWORK) {
        return 'Wrong Network';
    } else if (wallet.state.isConnected) {
        return 'Disconnect';
    } else {
        return 'Connect';
    }
});
</script>
<template>
    <div v-if="wallet.state.isConnected" class="p-1 inline-flex items-center bg-black rounded-full font-medium text-center text-white">
        <p class="px-2 text-sm">{{ wallet.state.balance }} ETH</p>

        <div class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-full focus:ring-4 focus:ring-gray-300">
            <span>{{ shortenAddress(wallet.state.address) }}</span>
            <span class="ml-2">
                <Identicon :account="wallet.state.address" :diameter="16" />
            </span>
        </div>
    </div>
    <button
        class="btn-sm text-blue-600 bg-white border-blue-600 ml-3"
        :class="{ 'text-rose-600 border-rose-500': wrongNetwork }"
        @click.stop="onWalletConnectClick"
    >
        <span>{{ buttonText }}</span>
    </button>
</template>
