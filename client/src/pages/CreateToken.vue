<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia/dist/pinia.esm-browser';
import { useMinterStore } from '../stores/minter-store';
import { ref, watch, computed } from 'vue';
import { useWalletStore } from '../stores/wallet-store';
import Header from '../components/Header.vue';
import UploadInput from '../components/UploadInput.vue';
import { File, NFTStorage } from 'nft.storage';

const router = useRouter();

const { state: wallet } = storeToRefs(useWalletStore());

const { minterAddress, token } = storeToRefs(useMinterStore());
const { mint } = useMinterStore();

/*
 * 1: Mint token
 * 2: Mint is complete
 */
const step = ref(1);

const name = ref();
const description = ref();
const selectedImage = ref();

const formValid = computed(() => wallet.value.isConnected);

const onFileSelected = (file) => {
    console.log('omg', file);

    selectedImage.value = file;
};

const onSubmit = async () => {
    /*
    // Store metadata on IPFS
    const apiKey = import.meta.env.VITE_NFT_STORAGE_API_KEY;
    const client = new NFTStorage({ token: apiKey });
    const metadata = await client.store({
        name: name.value,
        description: description.value,
        attributes: [],
        image: selectedImage.value
    });
    */
    // Dev use: ipfs://bafyreid3qxqimzmsssewid7kfv5fcxexopircnrvcdhq4cg3kzrtwblys4/metadata.json

    const metadataUrl = 'ipfs://bafyreid3qxqimzmsssewid7kfv5fcxexopircnrvcdhq4cg3kzrtwblys4/metadata.json';

    mint(metadataUrl);
};

watch(
    token,
    (currValue, prevValue) => {
        if (prevValue === null) {
            return;
        }

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
                <h1 class="h2 mb-5 font-bold">You created {{ token.name }}!</h1>

                <img
                    class="block border w-2/4 mx-auto hover:scale-110 transition-all rounded-xl"
                    :src="token.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                    :alt="token.name"
                />

                <p class="mt-10 mb-5">
                    Your are now the proud owner of
                    <router-link class="font-medium text-opensea-400" :to="{ name: 'token', params: { address: minterAddress, index: token.id } }">{{
                        token.name
                    }}</router-link
                    >.
                </p>
            </div>
        </main>
    </main>
</template>
