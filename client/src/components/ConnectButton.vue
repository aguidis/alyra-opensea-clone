<script setup>
import { computed } from 'vue';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { useWalletStore } from '../stores/wallet-store';
import { shortenAddress } from '../helpers/address';
import Identicon from './Identicon.vue';

const wallet = useWalletStore();

let onWalletConnectClick = async () => {
    if (
        wallet.state.isConnected &&
        wallet.state.providerChainID !== DEFAULT_NETWORK
    ) {
        await wallet.checkWrongNetwork();
    } else if (wallet.state.isConnected) {
        wallet.disconnect();
    } else {
        await wallet.connect();
    }
};

const buttonText = computed(() => {
    if (
        wallet.state.isConnected &&
        wallet.state.providerChainID !== DEFAULT_NETWORK
    ) {
        return 'Wrong Network';
    } else if (wallet.state.isConnected) {
        return 'Disconnect';
    } else {
        return 'Connect';
    }
});
</script>
<template>
    <div
        v-if="wallet.state.isConnected"
        class="mb-3 p-1 inline-flex items-center bg-black rounded-full font-medium text-center text-white"
    >
        <p class="px-2">{{ wallet.state.balance }} ETH</p>

        <button
            type="button"
            class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-full hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
        >
            {{ shortenAddress(wallet.state.address) }}
            <span class="inline-flex justify-center items-center ml-2">
                <Identicon :account="wallet.state.address" :diameter="30" />
            </span>
        </button>
    </div>
    <button
        class="btn-sm text-blue-600 bg-white border-blue-600 ml-3"
        @click.stop="onWalletConnectClick"
    >
        <span>{{ buttonText }}</span>
        <svg
            class="w-3 h-3 fill-current text-blue-600 flex-shrink-0 ml-2 -mr-1"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                fill-rule="nonzero"
            />
        </svg>
    </button>
</template>
