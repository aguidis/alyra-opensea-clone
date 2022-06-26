<script setup>
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useCollectionStore } from '../stores/collection-store';

const route = useRoute();
const id = route.params.id;

const { collection } = storeToRefs(useCollectionStore());
const { fetchCollection, fetchCollectionItems } = useCollectionStore();

fetchCollection(id);

console.log('coucou ta mere', collection.nftAddress);

fetchCollectionItems(collection.nftAddress);
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow">
            <section class="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">Collection</h1>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
