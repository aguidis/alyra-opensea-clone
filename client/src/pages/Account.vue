<script setup>
import { storeToRefs } from 'pinia';
import { useMarketplaceStore } from '../stores/marketplace-store';
import Header from '../components/Header.vue';
import { useWalletStore } from '../stores/wallet-store';
import CollectionItem from '../components/CollectionItem.vue';

const { state: wallet } = storeToRefs(useWalletStore());

const { loading, accountTokens } = storeToRefs(useMarketplaceStore());
const { fetchAccountTokens } = useMarketplaceStore();

fetchAccountTokens();
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow bg-gray-100">
            <section class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <h1 class="h2">You collected NFTs</h1>
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

                    <section class="max-w-sm mx-auto grid gap-6 md:grid-cols-4 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
                        <CollectionItem v-for="(item, index) in accountTokens" :key="index" :token-index="item.id" :item="item" :address="item.nftAddress" />
                    </section>
                </div>
            </section>
        </main>
    </div>
</template>
