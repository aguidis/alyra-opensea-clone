<script setup>
import { toKebabCase } from '../helpers/string';

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <article class="bg-white border border-gray-100 rounded-lg text-center shadow-lg hover:shadow-xl align-center h-full">
        <router-link :to="{ name: 'collection', params: { id: item.index, slug: toKebabCase(item.name) } }">
            <img
                v-if="'coverImage' in item"
                class="rounded-t-lg w-full"
                :src="item.coverImage.replace('ipfs://', 'https://nftstorage.link/ipfs/')"
                :alt="item.name"
            />
            <img v-else class="rounded-t-lg w-full" src="/images/collection-placeholder.jpg" :alt="item.name" />
        </router-link>

        <p class="font-bold pt-3">{{ item.name }}</p>

        <p class="font-semibold p-2 text-sm text-gray-500">by {{ item.authorName }}</p>

        <p class="px-10 py-2 mb-5 text-gray-600">
            {{ item.description }}
        </p>
    </article>
</template>
