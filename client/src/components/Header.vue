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

const submenu = ref(false);
const toggleSubmenu = () => (submenu.value = !submenu.value);
</script>

<template>
    <header
        class="bg-white fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out"
        :class="`${(!top || forceShadow) && 'bg-white backdrop-blur-sm shadow-lg'}`"
    >
        <div class="max-w-6xl mx-auto px-5 sm:px-6">
            <div class="flex items-center justify-between h-16">
                <nav class="flex flex-grow">
                    <ul class="flex flex-grow justify-start flex-wrap items-center">
                        <li>
                            <router-link :to="{ name: 'home' }" class="block pr-5" aria-label="Cruip">
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
                                class="font-bold text-gray-600 hover:text-gray-900 px-5 flex items-center transition duration-150 ease-in-out"
                            >
                                Explore
                            </router-link>
                        </li>
                        <li v-if="state.isConnected">
                            <router-link
                                :to="{ name: 'create_token' }"
                                class="font-bold text-gray-600 hover:text-gray-900 px-5 flex items-center transition duration-150 ease-in-out"
                            >
                                Create
                            </router-link>
                        </li>
                        <li
                            v-if="state.isConnected"
                            class="relative font-bold text-gray-600 hover:text-gray-900 px-5 flex items-center transition duration-150 ease-in-out cursor-pointer"
                            @click="toggleSubmenu"
                        >
                            Account
                            <!-- Dropdown menu -->
                            <div v-show="submenu" class="absolute top-11 w-44 bg-white rounded divide-y divide-gray-100 shadow-md">
                                <ul class="text-sm text-gray-800">
                                    <li class="border-b">
                                        <router-link :to="{ name: 'account' }" class="block py-3 px-4 hover:bg-gray-100 hover:rounded font-bold">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                            </svg>
                                            My NFTs
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'collections' }" class="block py-3 px-4 hover:bg-gray-100 hover:rounded font-bold">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                                />
                                            </svg>
                                            My Collections
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
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
