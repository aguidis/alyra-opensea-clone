<script setup>
import { storeToRefs } from 'pinia';
import { useMarketplaceStore } from '../stores/marketplace-store';
import Header from '../components/Header.vue';
import CollectionPreview from '../components/CollectionPreview.vue';

const { loading, collections } = storeToRefs(useMarketplaceStore());
const { fetchCollections } = useMarketplaceStore();

fetchCollections();
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow bg-gray-100">
            <section class="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">Explore Collections</h1>
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
                        v-if="collections.length > 0"
                        class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none"
                    >
                        <CollectionPreview v-for="item in collections" :key="item.index.toString()" :item="item" />
                    </section>
                    <section v-else class="max-w-sm">
                        <p class="mb-5">You don’t have any collection yet.</p>
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>
