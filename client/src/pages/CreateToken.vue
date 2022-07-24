<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useMinterStore } from '../stores/minter-store';
import { ref, watch, computed } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import Header from '../components/Header.vue';

const router = useRouter();

const { state: wallet } = storeToRefs(useWalletStore());

const { token } = storeToRefs(useMinterStore());
const { mint } = useMinterStore();

const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

const formValid = computed(() => wallet.value.isConnected);

const onSubmit = () => {
    //mint();
};

watch(
    token,
    (currValue, prevValue) => {
        if (prevValue === null) {
            return;
        }

        router.push({ name: 'my_collection' });
    },
    {
        deep: true
    }
);
</script>

<template>
    <main>
        <Header :force-shadow="true" />

        <main class="flex-grow">
            <div class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="flex flex-row flex-wrap justify-between">
                    <div class="w-full md:basis-1/2">
                        <h1 class="h4 mb-5">List item for sale</h1>
                        <form @submit.prevent="onSubmit">
                            <div class="mb-6">
                                <label class="block mb-2 font-bold text-gray-900">Type</label>
                                <div class="flex w-full" role="group">
                                    <button
                                        type="button"
                                        class="basis-1/2 rounded-l-xl px-6 py-4 border-2 border-gray-200 text-gray-900 font-medium text-lg leading-tight focus:outline-none focus:ring-0 bg-opensea-200 bg-opacity-10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 mb-3 mx-auto"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>Fixed Price</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="basis-1/2 rounded-r-xl px-6 py-2 border-2 border-l-0 border-gray-200 text-gray-900 font-medium text-lg leading-tight focus:outline-none focus:ring-0"
                                        disabled
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 mb-3 mx-auto"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Timed Auction (soon)</span>
                                    </button>
                                </div>
                            </div>
                            <div class="mb-6">
                                <label for="price" class="block mb-2 font-bold text-gray-900">Price</label>
                                <div class="w-full rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                                    <input
                                        id="price"
                                        v-model.number="price"
                                        type="text"
                                        placeholder="Amount"
                                        class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                :disabled="!formValid"
                                class="btn text-white bg-blue-600 hover:bg-blue-700 sm:w-auto sm:mr-4 rounded-lg disabled:opacity-40"
                            >
                                Complete listing
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </main>
</template>
