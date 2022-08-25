<script setup>
import { watch, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import { storeToRefs } from 'pinia';
import { useMarketplaceStore } from '../stores/marketplace-store';
import CollectionItem from '../components/CollectionItem.vue';

const route = useRoute();
const id = route.params.id;

const { collection, collectionItems, collectionTotalSupply, loading } = storeToRefs(useMarketplaceStore());
const { fetchCollection, fetchCollectionItems } = useMarketplaceStore();

fetchCollection(id);

let page = 1;
const itemsPerPage = 12;
const totalPages = computed(() => Math.ceil(collectionTotalSupply.value / itemsPerPage))
const loadedCollectionAddress = computed(() => collection.value.nftAddress)

function throttle(func, wait) {
    let waiting = false;
    return function () {
        if (waiting) {
            return;
        }

        waiting = true;
        setTimeout(() => {
            func.apply(this, arguments);
            waiting = false;
        }, wait);
    };
}

const onScroll = throttle(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        // you're at the bottom of the page
        if (!loading.value && page <= totalPages.value) {
            page++;
            fetchCollectionItems(loadedCollectionAddress.value, page);
            window.scroll(0, document.body.scrollHeight - window.innerHeight);
        }
    }
});

watch(collection, (loadedCollection) => {
    fetchCollectionItems(loadedCollection.nftAddress, page);
});

onMounted(() => {
    // Handle infinite scroll for big collections
    window.addEventListener('scroll', onScroll);
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow bg-gray-100">
            <section v-if="collection" class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">{{ collection.name }}</h1>
                    </div>

                    <section
                        v-if="collectionItems.length > 0"
                        class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none"
                    >
                        <CollectionItem
                            v-for="(item, index) in collectionItems"
                            :key="index"
                            :token-index="index"
                            :item="item"
                            :address="collection.nftAddress"
                        />
                    </section>

                    <section v-if="loading" class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
                        <article v-for="n in 12" :key="n" class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden">
                            <div class="h-64 bg-gray-400 w-full object-cover object-center"></div>
                            <div class="p-6">
                                <h2 class="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
                                <h1 class="w-1/3 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                            </div>
                        </article>
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>
