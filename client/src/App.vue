<script setup>
import { storeToRefs } from 'pinia';
import AOS from 'aos';

import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMarketplaceStore } from './stores/marketplace-store';
import Loader from './components/Loader.vue';
import ErrorToast from './components/ErrorToast.vue';

const { loading, error } = storeToRefs(useMarketplaceStore());

AOS.init({
    once: true,
    disable: 'phone',
    duration: 700,
    easing: 'ease-out-cubic'
});

const route = useRoute();
watch(
    route,
    () => {
        document.querySelector('html').style.scrollBehavior = 'auto';
        window.scroll({ top: 0 });
        document.querySelector('html').style.scrollBehavior = '';
    },
    { flush: 'pre', immediate: true, deep: true }
);

const displayToast = ref(false);

watch(error, () => {
    displayToast.value = true;

    setTimeout(() => {
        displayToast.value = false;
    }, 3000);
});
</script>

<template>
    <ErrorToast :display-toast="displayToast" :error="error" />

    <Loader v-if="loading" />
    <router-view></router-view>
</template>
