<script setup>
import { storeToRefs } from 'pinia';
import { useCollectionStore } from '../stores/collection-store';
import Header from '../components/Header.vue';

const { collections } = storeToRefs(useCollectionStore());
const { fetchCollections } = useCollectionStore();

fetchCollections();

const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow">
            <section class="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">Explore Collections</h1>
                    </div>

                    <section class="max-w-sm mx-auto grid gap-6 md:grid-cols-3 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
                        <article
                            v-for="item in collections"
                            :key="item.index.toString()"
                            class="bg-white border border-gray-100 rounded-lg text-center hover:shadow-lg align-center"
                        >
                            <router-link :to="`/collection/${item.index}-${toKebabCase(item.name)}`">
                                <img src="https://picsum.photos/500/300" class="rounded-t-lg" alt="#" />
                            </router-link>
                            <a href="">
                                <div class="flex justify-center">
                                    <img
                                        src="https://picsum.photos/50/50"
                                        class="rounded-full object-center border-4 border-white -mt-6 shadow-lg align-center"
                                        alt="#"
                                    />
                                </div>

                                <p class="font-bold pt-3">{{ item.name }}</p>
                            </a>

                            <p class="font-semibold p-2 text-sm text-gray-500">
                                by <a href="#" class="text-blue-500 hover:text-blue-700">{{ item.authorName }}</a>
                            </p>

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
