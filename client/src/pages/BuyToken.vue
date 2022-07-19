<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useCollectionStore } from '../stores/collection-store';
import { ref, watch } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import { shortenAddress } from '../helpers/address';
import Header from '../components/Header.vue';

const route = useRoute();
const router = useRouter();
const address = route.params.address;
const tokenIndex = route.params.index;

const { state: wallet } = storeToRefs(useWalletStore());

const { collection, token, transactionHash } = storeToRefs(useCollectionStore());
const { fetchCollection, fetchToken, buyItem } = useCollectionStore();

fetchCollection(address);
fetchToken(address, tokenIndex);

/**
 * TODO
 * lister les listing sur la page token
 * faire une passe sur les lien (a href sur l'image a gauche dans la page Token)
 */

/*
 * 1: Complete checkout
 * 2: Confirm checkout
 * 3: Purchase is complete
 */
const step = ref(1);

const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

const onSubmit = () => {
    step.value = 2;

    buyItem(address, tokenIndex, token.value.listing.price);
};

watch(
    token,
    (currValue, prevValue) => {
        if (prevValue === null) {
            return;
        }

        step.value = 3;
    },
    {
        deep: true
    }
);
</script>

<template>
    <main v-if="token">
        <Header :force-shadow="true" />

        <section class="bg-white w-full bg-blue-100 bg-opacity-20 mb-10 border-b pt-20">
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

        <div class="max-w-3xl mx-auto px-4 py-10">
            <div v-if="step === 3" class="text-center">
                <h2 class="h3 text-gray-800 leading-tight mb-10">Your purchase is complete!</h2>

                <img
                    class="block border w-2/4 mx-auto hover:scale-110 transition-all rounded-xl"
                    :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                    :alt="token.name"
                />

                <p class="mt-10 mb-5">
                    Your are now the proud owner of
                    <router-link class="font-medium text-opensea-400" :to="{ name: 'token', params: { address: address, index: tokenIndex } }">{{
                        token.name
                    }}</router-link>
                    from the
                    <router-link
                        class="font-medium text-opensea-400"
                        :to="{ name: 'collection', params: { id: collection.index, slug: toKebabCase(collection.name) } }"
                        >{{ collection.name }}</router-link
                    >
                    collection.
                </p>

                <p class="uppercase text-xs font-bold text-gray-800">Transaction ID</p>
                <a v-if="transactionHash" :href="`https://rinkeby.etherscan.io/tx/${transactionHash}`" class="block mb-5" target="_blank">
                    {{ shortenAddress(transactionHash) }}
                </a>
                <div v-else role="status" class="flex justify-center mt-3 mb-5">
                    <svg
                        aria-hidden="true"
                        class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>

                <router-link
                    :to="{ name: 'token_create_listing', params: { address: address, index: tokenIndex } }"
                    class="btn text-blue-600 bg-white border-blue-600 w-full sm:w-auto sm:mr-4 rounded-lg border-2 border-gray-300"
                >
                    List for sale
                </router-link>
                <router-link
                    class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 rounded-lg"
                    :to="{ name: 'token', params: { address: address, index: tokenIndex } }"
                >
                    View item
                </router-link>
            </div>
            <!-- Top Navigation -->
            <div v-else>
                <p class="uppercase tracking-wide text-xs font-bold text-gray-600 mb-1 leading-tight">
                    {{ `Step: ${step} of 3` }}
                </p>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="flex-1">
                        <div v-if="step === 1">
                            <h2 class="h3 text-gray-800 leading-tight">Complete checkout</h2>
                        </div>

                        <div v-if="step === 2">
                            <h2 class="h3 text-gray-800 leading-tight">Checkout in progress</h2>
                        </div>
                    </div>

                    <div class="flex items-center md:w-64">
                        <div class="w-4/5 bg-white rounded-full mr-5 flex-auto">
                            <div
                                class="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
                                :style="'width: ' + parseInt((step / 3) * 100) + '%'"
                            ></div>
                        </div>
                        <p class="text-md w-1/5 font-medium text-gray-800 flex-none">{{ parseInt((step / 3) * 100) }} %</p>
                    </div>
                </div>
                <!-- /Top Navigation -->

                <!-- Step Content -->
                <div class="py-10">
                    <div v-if="step === 1">
                        <h3 class="font-bold">Item</h3>

                        <div class="flex items-center justify-between my-3 py-3 border-t border-b">
                            <div class="flex items-center">
                                <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                                    <img class="w-12 rounded-md" :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')" :alt="token.name" />
                                </router-link>
                                <div class="ml-3">
                                    <p v-if="collection" class="font-medium text-opensea-400 text-sm">
                                        <router-link :to="{ name: 'collection', params: { id: collection.index, slug: toKebabCase(collection.name) } }">
                                            {{ collection.name }}
                                        </router-link>
                                        <svg aria-label="verified-icon" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 30 30">
                                            <path
                                                fill="#2081E2"
                                                d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"
                                            ></path>
                                            <path
                                                d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                                                fill="white"
                                                stroke="white"
                                            ></path>
                                        </svg>
                                    </p>
                                    <p class="font-bold">
                                        <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                                            {{ token.name }}
                                        </router-link>
                                    </p>
                                    <p class="text-gray-400 font-medium text-xs">Creator Fees: 0%</p>
                                </div>
                            </div>
                            <p class="price flex justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                                    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                                </svg>
                                <span class="text-base font-semibold">
                                    {{ token.listing.price }}
                                </span>
                            </p>
                        </div>

                        <div class="flex justify-between">
                            <h3 class="font-bold pb-3">Total</h3>
                            <p class="price flex justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                                    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                                </svg>
                                <span class="text-base font-bold text-opensea-400">
                                    {{ token.listing.price }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div v-if="step === 2">
                        <h3 class="font-bold">Confirm purchase</h3>

                        <p>You'll be asked to approve this purchase from your wallet.</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="step < 3" class="py-5 bg-white">
            <div class="max-w-3xl mx-auto px-4">
                <div class="flex justify-end">
                    <button
                        :disabled="step > 1"
                        class="btn text-white bg-blue-600 hover:bg-blue-700 sm:w-auto sm:mr-4 rounded-lg disabled:opacity-40 disabled:bg-gray-300 disabled:text-gray-800"
                        @click="onSubmit"
                    >
                        {{ step === 1 ? 'Checkout' : 'Waiting from approval...' }}
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
