<script setup>
import { storeToRefs } from 'pinia';
import { useMarketplaceStore } from '../stores/marketplace-store';
import Header from '../components/Header.vue';
import CollectionItem from '../components/CollectionItem.vue';
import { useWalletStore } from '../stores/wallet-store';
import { watchEffect } from 'vue';
import Footer from '../components/Footer.vue';

const { loading, accountTokens } = storeToRefs(useMarketplaceStore());
const { fetchCollectedTokens } = useMarketplaceStore();

const { address } = storeToRefs(useWalletStore());

watchEffect(() => {
    fetchCollectedTokens(address.value);
});
</script>

<template>
    <div class="flex flex-col h-screen justify-between">
        <Header />

        <main class="bg-gray-100 grow">
            <section class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">Your collected NFTs</h1>
                    </div>

                    <ul class="flex mb-5">
                        <li class="mr-5">
                            <router-link :to="{ name: 'account' }" class="inline-block rounded bg-opensea-400 text-white py-3 px-5"> Collected </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{ name: 'account_created_tokens' }"
                                class="inline-block border-b-2 border-b-opensea-400 text-opensea-400 py-3 px-5"
                            >
                                Created
                            </router-link>
                        </li>
                    </ul>

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
                        v-if="accountTokens.length > 0"
                        class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none"
                    >
                        <CollectionItem v-for="(item, index) in accountTokens" :key="index" :token-index="item.id" :item="item" :address="item.nftAddress" />
                    </section>
                    <section v-else-if="loading === false" class="max-w-sm">
                        <p class="mb-5">You don’t have any collected tokens yet.</p>
                    </section>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>
