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

        <main class="flex-grow bg-gray-100">
            <section v-if="collection" class="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">{{ collection.name }}</h1>
                    </div>

                    <section class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
                        <article
                            v-for="(item, index) in collectionItems"
                            :key="index"
                            class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden"
                        >
                            <div class="overflow-hidden">
                                <img
                                    class="rounded-t-lg w-full hover:scale-110 transition-all"
                                    :src="item.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                                    :alt="item.name"
                                />
                            </div>

                            <div class="p-3">
                                <h2 class="font-semibold text-sm my-3">
                                    {{ item.name }}
                                </h2>
                                <p class="font-semibold text-xs">Price</p>
                                <p class="price flex justify-start items-center mb-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                                        <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                        <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                                    </svg>
                                    <span class="text-base font-semibold">0.5</span>
                                </p>
                            </div>

                            <div class="absolute inset-x-0 -bottom-41 group-hover:bottom-0">
                                <button class="px-4 py-2 font-semibold text-sm bg-[#2081E2] text-white rounded-b border-2 border-solid border-[#2081E2] w-full">
                                    Buy
                                </button>
                            </div>
                        </article>
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>
