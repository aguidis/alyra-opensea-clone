<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMinterStore } from '../stores/minter-store';
import { ref, watch, computed } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import Header from '../components/Header.vue';
import UploadInput from '../components/UploadInput.vue';
import { File, NFTStorage } from 'nft.storage';
import CardModal from '../components/CardModal.vue';
import { useCollectionFactoryStore } from '../stores/collection-factory-store';

const router = useRouter();

const { isConnected } = storeToRefs(useWalletStore());

const { token } = storeToRefs(useMinterStore());
const { mint } = useMinterStore();

const { address: accountAddress } = storeToRefs(useWalletStore());

const { loading, accountCollectionsForMinting } = storeToRefs(useCollectionFactoryStore());
const { fetchAccountCollectionsForMinting } = useCollectionFactoryStore();

watch(accountAddress, (value) => {
    fetchAccountCollectionsForMinting(value);
});

/*
 * 1: Mint token
 * 2: Mint is complete
 */
const step = ref(1);

const modalVisible = ref(false);
const tokenProperties = ref([]);
const formSubmitted = ref(false);

const toggleModal = () => (modalVisible.value = !modalVisible.value);

const addTokenProperty = () => {
    tokenProperties.value.push({
        trait_type: null,
        value: null
    });
};

const deleteTokenProperty = (index) => {
    tokenProperties.value.splice(index, 1);
};

const saveTokenProperties = () => {
    modalVisible.value = !modalVisible.value;
    formSubmitted.value = tokenProperties.value.length > 0;
};

let collectionOptions = ref(new Map());

watch(
    accountCollectionsForMinting,
    (list) => {
        for (const collection of list) {
            collectionOptions.value.set(collection.nftAddress, collection.name);
        }
    },
    {
        deep: true
    }
);

const name = ref(null);
const description = ref(null);
const selectedImage = ref(null);
const selectedCollectionAddress = ref(null);

const formValid = computed(() => isConnected.value && name.value && description.value && selectedImage.value);

const onFileSelected = (file) => {
    selectedImage.value = file;
};

const onSubmit = async () => {
    // Store metadata on IPFS
    const apiKey = import.meta.env.VITE_NFT_STORAGE_API_KEY;
    const client = new NFTStorage({ token: apiKey });
    const metadata = await client.store({
        name: name.value,
        description: description.value,
        attributes: tokenProperties.value,
        image: selectedImage.value
    });

    mint(metadata.url, selectedCollectionAddress.value);
};

watch(
    token,
    () => {
        step.value = 2;
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
                <h1 class="h2 mb-5 font-bold">Create New Item</h1>

                <div class="p-2 mb-10 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Frozen metadata</span>
                    <span class="font-semibold mr-2 text-left flex-auto"
                        >Your metadata will be permanently locked and all of this item's content will be stored in decentralized file storage.</span
                    >
                </div>

                <form @submit.prevent="onSubmit">
                    <div class="mb-6">
                        <UploadInput @nft-file="onFileSelected" />
                    </div>

                    <div class="mb-6">
                        <label for="name" class="block mb-2 font-bold text-gray-900">Name</label>
                        <div class="w-full rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <input
                                id="name"
                                v-model.number="name"
                                type="text"
                                placeholder="Item name"
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <div class="flex justify-between mb-5">
                            <div>
                                <label for="name" class="block mb-2 font-bold text-gray-900">Properties</label>
                                <small class="text-gray-700 font-medium">Textual traits that show up as rectangles.</small>
                            </div>
                            <button class="btn text-opensea-400 font-bold border-2 border-gray-200 rounded-lg" @click.prevent="toggleModal">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <ul v-if="formSubmitted" class="flex flex-wrap">
                            <li
                                v-for="(attribute, index) in tokenProperties"
                                :key="index"
                                class="rounded-md border border-opensea-200 min-w-fit text-center py-2 px-5 mr-3 mb-3 bg-opensea-200 bg-opacity-10"
                            >
                                <span class="uppercase font-medium text-xs text-opensea-200">{{ attribute.trait_type }}</span>
                                <p class="font-medium text-slate-700">{{ attribute.value }}</p>
                            </li>
                        </ul>
                    </div>

                    <div class="mb-6">
                        <label for="description" class="block font-bold text-gray-900">Description</label>
                        <small class="text-gray-700 font-medium">The description will be included on the item's detail page underneath its image.</small>
                        <div class="w-full mt-5 rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <textarea
                                id="description"
                                v-model.number="description"
                                placeholder="Provide a detailed description of your item."
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="description" class="block font-bold text-gray-900">Collection</label>
                        <small class="text-gray-700 font-medium">This is the collection where your item will appear.</small>
                        <div class="w-full mt-5 rounded-xl bg-white px-4 ring-2 ring-gray-200 focus-within:ring-gray-400">
                            <select
                                id="description"
                                v-model="selectedCollectionAddress"
                                class="my-2 w-full border-none bg-transparent outline-none focus:outline-none focus:ring-transparent"
                            >
                                <option :value="null" selected>Select collection</option>
                                <option
                                    v-for="[address, label] of collectionOptions"
                                    :key="address"
                                    :value="address"
                                    :selected="address === selectedCollectionAddress"
                                >
                                    {{ label }}
                                </option>
                            </select>
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

                <CardModal :showing="modalVisible" @card-modal-close="toggleModal">
                    <h3 class="h4 mb-5 font-bold text-center">Add Properties</h3>
                    <p class="text-sm text-gray-600 font-medium mb-5">Properties show up underneath your item, it gives your awesome token unique traits.</p>

                    <div v-for="(tokenProperty, index) in tokenProperties" :key="index" class="flex flex-wrap items-stretch w-full relative mb-5">
                        <div class="flex -mr-px">
                            <button
                                class="flex items-center leading-normal bg-gray-200 rounded rounded-r-none border-2 border-r-0 px-3 whitespace-no-wrap text-grey-dark text-sm"
                                @click="deleteTokenProperty(index)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <input
                            v-model="tokenProperty.trait_type"
                            type="text"
                            class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-2 border-gray-200 h-10 px-3 relative focus:border-blue focus:shadow"
                            placeholder="Name"
                        />
                        <input
                            v-model="tokenProperty.value"
                            type="text"
                            class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-2 border-gray-200 h-10 rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
                            placeholder="Value"
                        />
                    </div>

                    <button class="btn text-opensea-400 font-bold border-2 border-gray-200 rounded-lg mb-10" @click="addTokenProperty">Add more</button>

                    <button class="btn text-white bg-blue-600 hover:bg-blue-700 w-full rounded-lg" @click="saveTokenProperties">Save</button>
                </CardModal>
            </div>

            <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 pt-32 text-center">
                <h1 class="h2 mb-5 font-bold">You created {{ token.name }}!</h1>

                <img
                    class="block border w-2/4 mx-auto hover:scale-110 transition-all rounded-xl"
                    :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                    :alt="token.name"
                />

                <p class="mt-10 mb-5">
                    Your are now the proud owner of
                    <router-link class="font-medium text-opensea-400" :to="{ name: 'token', params: { address: token.address, index: token.id } }">{{
                        token.name
                    }}</router-link
                    >.
                </p>
            </div>
        </main>
    </main>
</template>
