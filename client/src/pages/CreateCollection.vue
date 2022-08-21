<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCollectionFactoryStore } from '../stores/collection-factory-store';
import { ref, watch, computed } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import Header from '../components/Header.vue';

const router = useRouter();

const { isConnected } = storeToRefs(useWalletStore());

const { newCollection } = storeToRefs(useCollectionFactoryStore());
const { create } = useCollectionFactoryStore();

/*
 * 1: Create collection
 * 2: Collection created
 */
const step = ref(1);

const name = ref();
const symbol = ref();
const description = ref();
const authorName = ref();

const formValid = computed(() => isConnected.value && name.value && symbol.value && description.value && authorName.value);

const onSubmit = () => {
    create(name.value, symbol.value, description.value, authorName.value);
};

watch(
    newCollection,
    (currValue, prevValue) => {
        step.value = 2;

        console.log('step', step.value);
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
            <div v-if="step === 1" class="max-w-6xl mx-auto px-4 sm:px-6 pt-32">
                <h1 class="h2 mb-5 font-bold">Create a collection</h1>

                <form @submit.prevent="onSubmit">
                    <div class="mb-6">
                        <label for="name" class="block mb-2 font-bold text-gray-900">Name</label>
                        <div class="w-full rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <input
                                id="name"
                                v-model.number="name"
                                type="text"
                                placeholder="Awesome name"
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="name" class="block mb-2 font-bold text-gray-900">Symbol</label>
                        <div class="w-full rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <input
                                id="name"
                                v-model.number="symbol"
                                type="text"
                                placeholder="APE"
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="description" class="block font-bold text-gray-900">Description</label>
                        <small class="text-gray-700 font-medium">The description will be included on the item's detail page underneath its image.</small>
                        <div class="w-full mt-5 rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <textarea
                                id="description"
                                v-model.number="description"
                                placeholder="Provide a detailed description of your collection."
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="name" class="block mb-2 font-bold text-gray-900">Author name</label>
                        <div class="w-full rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <input
                                id="name"
                                v-model.number="authorName"
                                type="text"
                                placeholder="Give your name for the glory"
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="!formValid"
                        class="btn mb-10 text-white bg-blue-600 hover:bg-blue-700 sm:w-auto rounded-lg disabled:opacity-40"
                    >
                        Create
                    </button>
                </form>
            </div>

            <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 pt-32 text-center">
                <h1 class="h2 mb-5 font-bold">You created the collection {{ newCollection.name }}!</h1>

                <router-link class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" :to="{ name: 'collections' }">
                    See your collections
                </router-link>
            </div>
        </main>
    </main>
</template>
