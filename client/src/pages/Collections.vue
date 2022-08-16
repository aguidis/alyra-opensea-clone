<script setup>
import { storeToRefs } from 'pinia';
import { useCollectionFactoryStore } from '../stores/collection-factory-store';
import Header from '../components/Header.vue';
import { useWalletStore } from '../stores/wallet-store';

const wallet = useWalletStore();

const { loading, ownedCollections } = storeToRefs(useCollectionFactoryStore());
const { fetchAccountCollections } = useCollectionFactoryStore();

fetchAccountCollections();
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow bg-gray-100">
            <section class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2 mb-3">My collections</h1>

                        <h2 class="h4 font-medium">Create, curate, and manage collections of unique NFTs to share and sell.</h2>
                    </div>

                    <section v-if="loading" class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
                        <article v-for="n in 4" :key="n" class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden">
                            <div class="h-64 bg-gray-400 w-full object-cover object-center"></div>
                            <div class="p-6">
                                <h2 class="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
                                <h1 class="w-1/3 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                            </div>
                        </article>
                    </section>

                    <section
                        v-if="ownedCollections.length > 0"
                        class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none"
                    >
                        <article
                            v-for="item in ownedCollections"
                            :key="item.index.toString()"
                            class="bg-white border border-gray-100 rounded-lg text-center shadow-lg hover:shadow-xl align-center h-full"
                        >
                            <router-link :to="{ name: 'collection', params: { id: item.index, slug: toKebabCase(item.name) } }">
                                <img class="rounded-t-lg w-full" :src="item.coverImage.replace('ipfs://', 'https://nftstorage.link/ipfs/')" :alt="item.name" />
                            </router-link>

                            <p class="font-bold pt-3">{{ item.name }}</p>

                            <p class="font-semibold p-2 text-sm text-gray-500">by {{ item.authorName }}</p>

                            <p class="px-10 py-2 mb-5 text-gray-600">
                                {{ item.description }}
                            </p>
                        </article>
                    </section>
                    <section v-else class="max-w-sm">
                        <p class="mb-5">You don’t have any collection yet.</p>

                        <router-link :to="{ name: 'create_collection' }" class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                            Create collection
                        </router-link>
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>
