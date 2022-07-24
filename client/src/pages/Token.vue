<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useCollectionStore } from '../stores/marketplace-store';
import Header from '../components/Header.vue';
import { shortenAddress } from '../helpers/address';
import { computed } from 'vue';
import { useWalletStore } from '../stores/wallet-store';

const route = useRoute();
const address = route.params.address;
const tokenIndex = route.params.index;

const { state: wallet } = storeToRefs(useWalletStore());

const { collection, token } = storeToRefs(useCollectionStore());
const { fetchCollection, fetchToken } = useCollectionStore();

fetchCollection(address);
fetchToken(address, tokenIndex);

const isForSale = computed(() => token.value?.listing.price > 0);
const isOwner = computed(() => wallet.value.address === token.value?.owner);

const canBuy = computed(() => wallet.value.isConnected && isForSale.value && !isOwner.value);
const createListing = computed(() => wallet.value.isConnected && !isForSale.value && isOwner.value);
const canUpdateListing = computed(() => wallet.value.isConnected && isForSale.value && isOwner.value);

const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow">
            <div v-if="collection && token" class="max-w-6xl mx-auto px-4 sm:px-6 pt-32">
                <div class="flex flex-row flex-wrap py-4">
                    <aside class="w-full sm:w-1/3 md:w-2/5 px-2">
                        <article class="rounded-lg border overflow-hidden">
                            <header class="py-3 px-5 border-b">
                                <router-link
                                    v-if="canBuy"
                                    :to="{ name: 'buy_token', params: { address: address, index: tokenIndex } }"
                                    class="font-bold text-opensea-400"
                                >
                                    Buy now
                                    <svg fill="gray" class="h-6 w-5 inline" viewBox="-38.39985 -104.22675 332.7987 625.3605">
                                        <path d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"></path>
                                        <path d="M127.962 287.959V0L0 212.32z"></path>
                                        <path d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"></path>
                                        <path d="M0 236.585l127.962 180.32v-104.72z"></path>
                                        <path d="M127.961 154.159v133.799l127.96-75.637z"></path>
                                        <path d="M127.96 154.159L0 212.32l127.96 75.637z"></path>
                                    </svg>
                                </router-link>
                                <div v-else class="flex items-center">
                                    <span>{{ token.listing.price > 0 ? token.listing.price : 'No listing.' }}</span>
                                    <svg v-if="token.listing.price > 0" fill="gray" class="h-6 w-5" viewBox="-38.39985 -104.22675 332.7987 625.3605">
                                        <path d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"></path>
                                        <path d="M127.962 287.959V0L0 212.32z"></path>
                                        <path d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"></path>
                                        <path d="M0 236.585l127.962 180.32v-104.72z"></path>
                                        <path d="M127.961 154.159v133.799l127.96-75.637z"></path>
                                        <path d="M127.96 154.159L0 212.32l127.96 75.637z"></path>
                                    </svg>
                                </div>
                            </header>
                            <img class="w-full" :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')" :alt="token.name" />
                        </article>

                        <article class="rounded-lg border my-5">
                            <header class="p-5 border-b">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">Description</h3>
                            </header>
                            <div class="p-5 bg-gray-100">
                                {{ token.description }}
                            </div>
                        </article>

                        <article v-if="token.attributes.length > 0" class="rounded-lg border my-5">
                            <header class="p-5 border-b">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                    />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">Properties</h3>
                            </header>
                            <div class="p-5 bg-gray-100">
                                <ul class="flex flex-wrap">
                                    <li
                                        v-for="(attribute, index) in token.attributes"
                                        :key="index"
                                        class="rounded-md border border-opensea-200 min-w-fit text-center py-2 px-5 mr-3 mb-3 bg-opensea-200 bg-opacity-10"
                                    >
                                        <span class="uppercase font-medium text-xs text-opensea-200">{{ attribute.trait_type }}</span>
                                        <p class="font-medium text-slate-700">{{ attribute.value }}</p>
                                    </li>
                                </ul>
                            </div>
                        </article>

                        <article class="rounded-lg border my-5">
                            <header class="p-5 border-b">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">About {{ collection.name }}</h3>
                            </header>
                            <div class="p-5 bg-gray-100">
                                <p>{{ collection.description }}</p>
                            </div>
                        </article>

                        <article class="rounded-lg border my-5">
                            <header class="p-5 border-b">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">Details</h3>
                            </header>
                            <div class="p-5 bg-gray-100">
                                <ul>
                                    <li class="flex justify-between mb-2">
                                        Author <span class="font-medium">{{ collection.authorName }}</span>
                                    </li>
                                    <li class="flex justify-between mb-2">
                                        Contract Address
                                        <a :href="`https://rinkeby.etherscan.io/address/${address}`" class="text-opensea-400 font-medium" target="_blank">
                                            {{ shortenAddress(address) }}
                                        </a>
                                    </li>
                                    <li class="flex justify-between mb-2">
                                        Token ID
                                        <a :href="token.tokenMetadata" class="text-opensea-400 font-medium" target="_blank">{{ tokenIndex }}</a>
                                    </li>
                                    <li class="flex justify-between mb-2">Token Standard <span class="font-medium">ERC-721</span></li>
                                    <li class="flex justify-between">Blockchain <span class="font-medium">Ethereum</span></li>
                                </ul>
                            </div>
                        </article>
                    </aside>
                    <section class="w-full sm:w-2/3 md:w-3/5 px-2">
                        <div class="flex justify-between">
                            <div>
                                <h3 class="mb-2">
                                    <router-link
                                        :to="{ name: 'collection', params: { id: collection.index, slug: toKebabCase(collection.name) } }"
                                        class="font-medium text-opensea-400"
                                    >
                                        {{ collection.name }}
                                    </router-link>
                                    <svg aria-label="verified-icon" class="w-6 h-6 inline ml-1" fill="none" viewBox="0 0 30 30">
                                        <path
                                            fill="#2081E2"
                                            d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"
                                        ></path>
                                        <path
                                            d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                                            fill="white"
                                            stroke="white"
                                        ></path>
                                    </svg>
                                </h3>
                                <h1 class="h2">{{ token.name }}</h1>
                            </div>

                            <div class="flex flex-col">
                                <router-link
                                    v-if="createListing"
                                    :to="{ name: 'token_create_listing', params: { address: address, index: tokenIndex } }"
                                    class="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-full rounded-lg self-start"
                                >
                                    Sell
                                </router-link>
                                <router-link
                                    v-if="canUpdateListing"
                                    :to="{ name: 'token_update_listing', params: { address: address, index: tokenIndex } }"
                                    class="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-full rounded-lg self-start mb-3"
                                >
                                    Update sale
                                </router-link>
                                <router-link
                                    v-if="canUpdateListing"
                                    :to="{ name: 'token_cancel_listing', params: { address: address, index: tokenIndex } }"
                                    class="btn text-white bg-red-600 hover:bg-blue-700 w-full sm:w-full rounded-lg self-start"
                                >
                                    Cancel listing
                                </router-link>
                            </div>
                        </div>

                        <article class="rounded-lg border my-5">
                            <header class="p-5 border-b">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">{{ token.listing.price > 0 ? 'Active sale' : 'No sales' }}</h3>
                            </header>
                            <div v-if="token.listing.price > 0" class="p-5 bg-gray-100">
                                <p class="font-medium text-gray-600 mb-2">Current price</p>
                                <div class="flex items-center">
                                    <img alt="ETH" class="h-6 mr-3" src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" />
                                    <p class="h3">{{ token.listing.price }}</p>
                                </div>
                                <router-link
                                    v-if="canBuy"
                                    :to="{ name: 'buy_token', params: { address: address, index: tokenIndex } }"
                                    class="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto sm:mr-4 rounded-lg mt-5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-6 w-6 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                    Buy now
                                </router-link>
                            </div>
                            <div v-else class="p-5 bg-gray-100">
                                <p class="font-medium">This token is not for sale yet.</p>
                            </div>
                        </article>

                        <article class="rounded-lg border my-5">
                            <header class="p-5 border-b">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                    />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg ml-2 text-lg">Listings</h3>
                            </header>
                            <div class="p-5 bg-gray-100">
                                <table v-if="token?.listing?.history.length > 0" class="w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" class="py-3 px-6">Price</th>
                                            <th scope="col" class="py-3 px-6">Seller</th>
                                            <th scope="col" class="py-3 px-6">Transaction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(event, index) in token.listing.history" :key="index" class="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                {{ event.price }}
                                            </th>
                                            <td class="py-4 px-6">
                                                {{ shortenAddress(event.seller) }}
                                            </td>
                                            <td class="py-4 px-6">
                                                <a
                                                    :href="`https://rinkeby.etherscan.io/tx/${event.transactionHash}`"
                                                    class="text-opensea-400 font-medium hover:underline"
                                                    target="_blank"
                                                >
                                                    See
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p v-else>No listing yet.</p>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </main>
    </div>
</template>
