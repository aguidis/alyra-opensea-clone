<template>
    <article class="bg-white rounded-lg shadow-lg hover:shadow-xl group relative overflow-hidden">
        <div class="overflow-hidden">
            <img
                class="rounded-t-lg w-full hover:scale-110 transition-all"
                :src="item.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                :alt="item.name"
            />
        </div>

        <div class="p-3">
            <h2 class="font-semibold text-sm mb-3">
                {{ item.name }}
            </h2>
            <p class="font-semibold text-xs">Price</p>
            <p class="price flex justify-start items-center mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#8C8C8C">
                    <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                </svg>
                <span class="text-base font-semibold">0.5</span>
            </p>
        </div>

        <div class="absolute inset-x-0 -bottom-41 group-hover:bottom-0">
            <button class="px-4 py-2 font-semibold text-sm bg-[#2081E2] text-white rounded-b border-2 border-solid border-[#2081E2] w-full">Buy</button>
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>
