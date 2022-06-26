<script setup>
import { ref, onMounted } from 'vue';

import Jazzicon from '@metamask/jazzicon';

const props = defineProps({
    account: {
        type: String,
        required: true
    },
    seed: {
        type: Number,
        default: Math.round(Math.random() * 10000000)
    },
    diameter: {
        type: Number,
        default: 100
    },
    address: {
        type: String,
        default: null
    },
    shapeCount: {
        type: Number,
        default: 4
    },
    colors: {
        type: Array,
        default: () => [
            '#01888C', // teal
            '#FC7500', // bright orange
            '#034F5D', // dark teal
            '#F73F01', // orangered
            '#FC1960', // magenta
            '#C7144C', // raspberry
            '#F3C100', // goldenrod
            '#1598F2', // lightning blue
            '#2465E1', // sail blue
            '#F19E02' // gold
        ]
    }
});

const jazzicon = ref(null);

onMounted(() => {
    jazzicon.value.appendChild(Jazzicon(16, parseInt(props.account.slice(2, 10), 16)));
});
</script>
<template>
    <div ref="jazzicon" style="height: 16px" />
</template>
