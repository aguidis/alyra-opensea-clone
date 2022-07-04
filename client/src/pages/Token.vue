<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useCollectionStore } from '../stores/collection-store';
import Header from '../components/Header.vue';

const route = useRoute();
const address = route.params.address;
const tokenIndex = route.params.index;

const { collection, token, loading } = storeToRefs(useCollectionStore());
const { fetchCollection, fetchToken } = useCollectionStore();

fetchCollection(address);
fetchToken(address, tokenIndex);
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow bg-gray-100">
            <div v-if="collection && token" class="max-w-6xl mx-auto px-4 sm:px-6 pt-32">
                <div class="flex flex-row flex-wrap py-4">
                    <aside class="w-full sm:w-1/3 md:w-2/5 px-2">
                        <img class="rounded w-full" :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')" :alt="token.name" />

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
                            <div class="p-5">
                                {{ token.description }}
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
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                    />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">Properties</h3>
                            </header>
                            <div class="p-5">
                                <ul class="flex flex-wrap">
                                    <li
                                        v-for="(attribute, index) in token.attributes"
                                        :key="index"
                                        class="rounded-md border border-opensea-200 w-24 text-center py-2 px-5 mr-3 mb-3 bg-opensea-200 bg-opacity-10"
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
                            <div class="p-5">
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
                            <div class="p-5">
                                {{ token.description }}
                            </div>
                        </article>
                    </aside>
                    <section class="w-full sm:w-2/3 md:w-3/5 pt-1 px-2">
                        <h2 class="h4">{{ collection.authorName }}</h2>
                        <h1 class="h2">{{ token.name }}</h1>

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
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 class="font-semibold inline ml-2 text-lg">No sales</h3>
                            </header>
                            <div class="p-5">
                                <button>Make an offer</button>
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
                            <div class="p-5">
                                <button>No listings yet</button>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </main>
    </div>
</template>
