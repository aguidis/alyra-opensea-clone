<script setup>
import { storeToRefs } from 'pinia';
import { useMarketplaceStore } from '../stores/marketplace-store';
import Header from '../components/Header.vue';
import CollectionPreview from '../components/CollectionPreview.vue';
import Footer from '../components/Footer.vue';

const { loading, collections } = storeToRefs(useMarketplaceStore());
const { fetchCollections } = useMarketplaceStore();

fetchCollections();
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <Header />

        <main class="bg-gray-100 grow">
            <div class="max-w-6xl mx-auto px-4 md:px-0 my-16">
                <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                    <h1 class="h2">Explore Collections</h1>
                </div>

                <section v-if="loading" class="max-w-sm mx-auto grid gap-6 md:grid-cols-3 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
                    <article v-for="n in 4" :key="n" class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden">
                        <div class="h-64 bg-gray-400 w-full object-cover object-center"></div>
                        <div class="p-6">
                            <h2 class="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
                            <h1 class="w-1/3 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                        </div>
                    </article>
                </section>

                <section v-if="collections.length > 0" class="max-w-sm mx-auto grid gap-6 md:grid-cols-3 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
                    <CollectionPreview v-for="item in collections" :key="item.index.toString()" :item="item" />
                </section>
                <section v-else-if="loading === false" class="max-w-sm">
                    <p class="mb-5">Collections are coming soon...</p>
                </section>
            </div>
        </main>

        <Footer />
    </div>
</template>
