<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useCollectionStore } from '../stores/collection-store';

const route = useRoute();
const id = route.params.id;

const { collection, collectionItems } = storeToRefs(useCollectionStore());
const { fetchCollection, fetchCollectionItems } = useCollectionStore();

fetchCollection(id);

watch(collection, (value) => {
    fetchCollectionItems(value.nftAddress);
});

/*
attributes: Array(5)
0: {trait_type: 'Type', value: 'Grass'}
1: {trait_type: 'HP', value: 45}
2: {trait_type: 'Attack', value: 49}
3: {trait_type: 'Defense', value: 49}
4: {trait_type: 'Speed', value: 45}
length: 5
[[Prototype]]: Array(0)
description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokemon."
image: "ipfs://bafybeicumcizjwmykcdouhyrrkm7pil3hfpwi3carrplg4rltyegdz3ri4/BulbasaurPhoto.png"
name: "Alyra Bulbasaur"
*/
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow">
            <section v-if="collection" class="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">{{ collection.name }}</h1>
                    </div>

                    <section class="max-w-sm mx-auto grid gap-6 md:grid-cols-3 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
                        <article
                            v-for="(item, index) in collectionItems"
                            :key="index"
                            class="bg-white border border-gray-100 rounded-lg text-center hover:shadow-lg align-center"
                        >
                            <img :src="item.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')" class="rounded-t-lg w-full" :alt="item.name" />
                            <h2 class="h6 font-bold pt-3">{{ item.name }}</h2>
                            <p class="px-10 py-2 mb-5 text-gray-500">
                                {{ item.description }}
                            </p>
                        </article>
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>
