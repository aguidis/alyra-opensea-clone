<script setup>
import { ref } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import ConnectButton from './ConnectButton.vue';

const props = defineProps({
    forceShadow: {
        type: Boolean,
        default: false
    }
});

const top = ref(true);
const scrollHandler = () => {
    top.value = window.pageYOffset <= 10;
};
window.addEventListener('scroll', scrollHandler);

const { state, connect, hasCachedProvider } = useWalletStore();

if (hasCachedProvider()) {
    try {
        connect();
    } catch (error) {
        console.log(`Wallet connect error: ${error}`);
    }
}
</script>

<template>
    <header
        class="bg-white fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out"
        :class="`${(!top || forceShadow) && 'bg-white backdrop-blur-sm shadow-lg'}`"
    >
        <div class="max-w-6xl mx-auto px-5 sm:px-6">
            <div class="flex items-center justify-between h-16 md:h-20">
                <nav class="flex flex-grow">
                    <ul class="flex flex-grow justify-start flex-wrap items-center">
                        <li>
                            <router-link :to="{ name: 'home' }" class="block pr-5 py-3" aria-label="Cruip">
                                <svg class="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <radialGradient id="header-logo" cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%">
                                            <stop stop-color="#4FD1C5" offset="0%" />
                                            <stop stop-color="#81E6D9" offset="25.871%" />
                                            <stop stop-color="#338CF5" offset="100%" />
                                        </radialGradient>
                                    </defs>
                                    <rect width="32" height="32" rx="16" fill="url(#header-logo)" fill-rule="nonzero" />
                                </svg>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{ name: 'explore' }"
                                class="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Explore
                            </router-link>
                        </li>
                        <li v-if="state.isConnected">
                            <router-link
                                :to="{ name: 'create_token' }"
                                class="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Create
                            </router-link>
                        </li>
                        <li v-if="state.isConnected">
                            <router-link
                                :to="{ name: 'account' }"
                                class="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                            >
                                Account
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <div class="flex-shrink-0 mr-4">
                    <ConnectButton />
                </div>
            </div>
        </div>
    </header>
</template>
