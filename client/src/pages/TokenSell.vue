<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useCollectionStore } from '../stores/collection-store';
import Header from '../components/Header.vue';
import { computed, ref, watch } from 'vue';
import { useWalletStore } from '../stores/wallet-store';

const route = useRoute();
const router = useRouter();
const address = route.params.address;
const tokenIndex = route.params.index;

const { state: wallet } = storeToRefs(useWalletStore());

const { collection, token } = storeToRefs(useCollectionStore());
const { fetchCollection, fetchToken, listItem, test } = useCollectionStore();

fetchCollection(address);
fetchToken(address, tokenIndex);

const price = ref(0);
const canSell = computed(() => wallet.value.isConnected && price.value > 0);

const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

const onSubmit = () => {
    listItem(address, tokenIndex, price.value);
};

watch(
    token,
    (currValue, prevValue) => {
        if (prevValue === null) {
            return;
        }

        router.push({ name: 'token', params: { address: address, index: tokenIndex } });
    },
    {
        deep: true
    }
);
</script>

<template>
    <div v-if="token" class="flex flex-col min-h-screen overflow-hidden">
        <Header :force-shadow="true" />

        <section class="bg-white w-full pt-20 bg-blue-100 bg-opacity-20 mb-10 border-b">
            <div class="max-w-6xl mx-auto px-5 sm:px-6">
                <div class="flex items-center justify-start h-16 md:h-20">
                    <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </router-link>
                    <div class="flex items-center">
                        <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                            <img class="w-12 rounded-md" :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')" :alt="token.name" />
                        </router-link>
                        <div class="ml-3">
                            <p v-if="collection" class="font-medium text-gray-400 text-sm">
                                <router-link :to="{ name: 'collection', params: { id: collection.index, slug: toKebabCase(collection.name) } }">
                                    {{ collection.name }}
                                </router-link>
                            </p>
                            <p class="font-bold">
                                <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                                    {{ token.name }}
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <main class="flex-grow">
            <div class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="flex flex-row flex-wrap justify-between">
                    <div class="w-full md:basis-1/2">
                        <h1 class="h4 mb-5">List item for sale</h1>
                        <form @submit.prevent="onSubmit">
                            <div class="mb-6">
                                <label class="block mb-2 font-bold text-gray-900">Type</label>
                                <div class="flex w-full" role="group">
                                    <button
                                        type="button"
                                        class="basis-1/2 rounded-l-xl px-6 py-4 border-2 border-gray-200 text-gray-900 font-medium text-lg leading-tight focus:outline-none focus:ring-0 bg-opensea-200 bg-opacity-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 mb-3 mx-auto"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>Fixed Price</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="basis-1/2 rounded-r-xl px-6 py-2 border-2 border-l-0 border-gray-200 text-gray-900 font-medium text-lg leading-tight focus:outline-none focus:ring-0"
                                        disabled
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 mb-3 mx-auto"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Timed Auction (soon)</span>
                                    </button>
                                </div>
                            </div>
                            <div class="mb-6">
                                <label for="price" class="block mb-2 font-bold text-gray-900">Price</label>
                                <div class="w-full rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                                    <input
                                        id="price"
                                        v-model.number="price"
                                        type="text"
                                        placeholder="Amount"
                                        class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                :disabled="!canSell"
                                class="btn text-white bg-blue-600 hover:bg-blue-700 sm:w-auto sm:mr-4 rounded-lg disabled:opacity-40"
                            >
                                Complete listing
                            </button>
                        </form>
                    </div>
                    <div class="w-full md:basis-1/3">
                        <h2 class="font-bold mb-5">Preview</h2>

                        <article class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden rounded-lg border">
                            <div class="overflow-hidden">
                                <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                                    <img
                                        class="border-b w-full hover:scale-110 transition-all"
                                        :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                                        :alt="token.name"
                                    />
                                </router-link>
                            </div>

                            <div class="p-3">
                                <h2 class="font-semibold text-sm mb-3">
                                    {{ token.name }}
                                </h2>
                                <p class="font-semibold text-xs">Price</p>
                                <p class="price flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                                        <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                        <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                                    </svg>
                                    <span class="text-base font-semibold">{{ price }}</span>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
