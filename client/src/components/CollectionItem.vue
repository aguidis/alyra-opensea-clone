<template>
    <article class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden">
        <div class="overflow-hidden">
            <router-link :to="{ name: 'token', params: { address: address, index: tokenIndex } }">
                <img
                    class="rounded-t-lg w-full hover:scale-110 transition-all"
                    :src="item.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                    :alt="item.name"
                />
            </router-link>
        </div>

        <div class="p-3">
            <h2 class="font-semibold text-sm mb-3">
                {{ item.name }}
            </h2>
            <p class="font-semibold text-xs">Price</p>
            <p v-if="item.listing.price" class="price flex justify-start items-center mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                    <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                </svg>
                <span class="text-base font-semibold">
                    {{ item.listing.price }}
                </span>
            </p>
            <p v-else class="price flex justify-start items-center mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                </svg>
                <span class="text-sm font-semibold">Not listed</span>
            </p>
        </div>

        <div class="absolute inset-x-0 -bottom-41 group-hover:bottom-0">
            <router-link
                :to="{ name: 'token', params: { address: address, index: tokenIndex } }"
                class="px-4 py-2 font-semibold text-sm bg-[#2081E2] text-white rounded-b border-2 border-solid border-[#2081E2] block w-full text-center"
            >
                {{ item.listing.price > 0 ? 'Buy' : 'See' }}
            </router-link>
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    tokenIndex: {
        type: [Number, String],
        required: true
    },
    item: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
</script>
