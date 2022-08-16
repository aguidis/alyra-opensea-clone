<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useMarketplaceStore } from '../stores/marketplace-store';
import Header from '../components/Header.vue';
import { computed, watch } from 'vue';
import { useWalletStore } from '../stores/wallet-store';

const route = useRoute();
const router = useRouter();
const address = route.params.address;
const tokenIndex = route.params.index;

const { state: wallet } = storeToRefs(useWalletStore());

const { collection, token } = storeToRefs(useMarketplaceStore());
const { fetchCollection, fetchToken, cancelListing, test } = useMarketplaceStore();

fetchCollection(address);
fetchToken(address, tokenIndex);

const isForSale = computed(() => token?.value?.listing.price > 0);
const isOwner = computed(() => wallet.value.address === token?.value?.owner);

const canCancelListing = computed(() => wallet.value.isConnected && isForSale.value && isOwner.value);

const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

const onSubmit = () => {
    cancelListing(address, tokenIndex);
};

watch(
    token,
    (currValue, prevValue) => {
        if (prevValue === null) {
            return;
        }

        router.push({ name: 'token', params: { address: address, index: tokenIndex } });
    },
    {
        deep: true
    }
);
</script>

<template>
    <div v-if="token" class="flex flex-col min-h-screen overflow-hidden">
        <Header :force-shadow="true" />

        <section class="bg-white w-full pt-20 bg-blue-100 bg-opacity-20 mb-10 border-b">
            <div class="max-w-6xl mx-auto px-5 sm:px-6">
                <div class="flex items-center justify-start h-16 md:h-20">
                    <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </router-link>
                    <div class="flex items-center">
                        <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                            <img class="w-12 rounded-md" :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')" :alt="token.name" />
                        </router-link>
                        <div class="ml-3">
                            <p v-if="collection" class="font-medium text-gray-400 text-sm">
                                <router-link :to="{ name: 'collection', params: { id: collection.index, slug: toKebabCase(collection.name) } }">
                                    {{ collection.name }}
                                </router-link>
                            </p>
                            <p class="font-bold">
                                <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                                    {{ token.name }}
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <main class="flex-grow">
            <div class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="flex flex-row flex-wrap justify-between">
                    <div class="w-full md:basis-1/2">
                        <h1 class="h4 mb-5">Are you sure to cancel the listing ?</h1>
                        <form @submit.prevent="onSubmit">
                            <button
                                type="submit"
                                :disabled="!canCancelListing"
                                class="btn text-white bg-red-600 hover:bg-blue-700 sm:w-auto sm:mr-4 rounded-lg disabled:opacity-40"
                            >
                                Cancel listing
                            </button>
                        </form>
                    </div>
                    <div class="w-full md:basis-1/3">
                        <h2 class="font-bold mb-5">Preview</h2>

                        <article class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden rounded-lg border">
                            <div class="overflow-hidden">
                                <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                                    <img
                                        class="border-b w-full hover:scale-110 transition-all"
                                        :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                                        :alt="token.name"
                                    />
                                </router-link>
                            </div>

                            <div class="p-3">
                                <h2 class="font-semibold text-sm mb-3">
                                    {{ token.name }}
                                </h2>
                                <p class="font-semibold text-xs">Price</p>
                                <p class="price flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                                        <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                        <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                                    </svg>
                                    <span class="text-base font-semibold">{{ token.listing.price }}</span>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
