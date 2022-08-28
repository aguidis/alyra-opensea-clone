<script setup>
import { storeToRefs } from 'pinia';
import { useCollectionFactoryStore } from '../stores/collection-factory-store';
import Header from '../components/Header.vue';
import { useWalletStore } from '../stores/wallet-store';
import { watch } from 'vue';
import CollectionPreview from '../components/CollectionPreview.vue';
import Footer from '../components/Footer.vue';

const { address } = storeToRefs(useWalletStore());

const { loading, accountCollections } = storeToRefs(useCollectionFactoryStore());
const { fetchAccountCollections } = useCollectionFactoryStore();

watch(address, (value) => {
    fetchAccountCollections(value);
});
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <Header />

        <main class="bg-gray-100 grow">
            <section class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2 mb-3">My collections</h1>

                        <h2 class="h4 font-medium mb-5">Create, curate, and manage collections of unique NFTs to share and sell.</h2>

                        <router-link :to="{ name: 'create_collection' }" class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                            Create collection
                        </router-link>
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
                        v-if="accountCollections.length > 0"
                        class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none"
                    >
                        <CollectionPreview v-for="item in accountCollections" :key="item.index.toString()" :item="item" />
                    </section>
                    <section v-else-if="loading === false" class="max-w-sm">
                        <p class="mb-5">You don’t have any collection yet.</p>
                    </section>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>
