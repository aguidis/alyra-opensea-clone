<script setup>
import { computed } from 'vue';

import { DEFAULT_NETWORK } from '../constants/blockchain';
import { useWalletStore } from '../stores/wallet-store';
import { shortenAddress } from '../helpers/address';
import Identicon from './Identicon.vue';
import { storeToRefs } from 'pinia';

const { isConnected, balance, address, providerChainID } = storeToRefs(useWalletStore());
const { checkWrongNetwork, disconnect, connect } = useWalletStore();

let onWalletConnectClick = async () => {
    if (isConnected.value && providerChainID.value !== DEFAULT_NETWORK) {
        await checkWrongNetwork();
    } else if (isConnected.value) {
        disconnect();
    } else {
        await connect();
    }
};

const wrongNetwork = computed(() => {
    return isConnected.value && providerChainID.value !== DEFAULT_NETWORK;
});

const buttonText = computed(() => {
    if (isConnected.value && providerChainID.value !== DEFAULT_NETWORK) {
        return 'Wrong Network';
    } else if (isConnected.value) {
        return 'Disconnect';
    } else {
        return 'Connect';
    }
});
</script>
<template>
    <div v-if="isConnected" class="p-1 inline-flex items-center bg-black rounded-full font-medium text-center text-white">
        <p class="px-2 text-sm hidden sm:block">{{ balance }} ETH</p>

        <div class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-full focus:ring-4 focus:ring-gray-300">
            <span>{{ shortenAddress(address) }}</span>
            <span class="ml-2">
                <Identicon :account="address" :diameter="16" />
            </span>
        </div>
    </div>
    <button
        class="hidden sm:inline btn-sm text-blue-600 bg-white border-blue-600 ml-3"
        :class="{ 'text-rose-600 border-rose-500': wrongNetwork }"
        @click.stop="onWalletConnectClick"
    >
        <span>{{ buttonText }}</span>
    </button>
</template>
