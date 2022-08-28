<script setup>
import { ref } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import ConnectButton from './ConnectButton.vue';
import { storeToRefs } from 'pinia';

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

const { isConnected } = storeToRefs(useWalletStore());
const { connect, hasCachedProvider } = useWalletStore();

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
        class="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out"
        :class="`${(!top || forceShadow) && 'bg-white backdrop-blur-sm shadow-lg'}`"
    >
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <router-link :to="{ name: 'home' }" class="flex items-center">
                    <svg class="mr-3 h-6 sm:h-9" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="header-logo" cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%">
                                <stop stop-color="#4FD1C5" offset="0%" />
                                <stop stop-color="#81E6D9" offset="25.871%" />
                                <stop stop-color="#338CF5" offset="100%" />
                            </radialGradient>
                        </defs>
                        <rect width="32" height="32" rx="16" fill="url(#header-logo)" fill-rule="nonzero" />
                    </svg>
                    <span class="self-center text-xl font-semibold whitespace-nowrap text-gray-800">AlyraSea</span>
                </router-link>
                <div class="flex items-center lg:order-2">
                    <ConnectButton />

                    <button
                        type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2"
                        aria-expanded="false"
                        @click="toggleSubmenu"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" :class="{ hidden: !submenu }">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <router-link
                                :to="{ name: 'explore' }"
                                class="block py-2 pr-4 pl-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                            >
                                Explore
                            </router-link>
                        </li>
                        <li v-if="isConnected">
                            <router-link
                                :to="{ name: 'create_token' }"
                                class="block py-2 pr-4 pl-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                            >
                                Create
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{ name: 'account' }"
                                class="block py-2 pr-4 pl-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                            >
                                My NFTs
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{ name: 'collections' }"
                                class="block py-2 pr-4 pl-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                            >
                                My Collections
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
