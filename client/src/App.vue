<script setup>
import { storeToRefs } from 'pinia';
import AOS from 'aos';

import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCollectionStore } from './stores/collection-store';
import Loader from './components/Loader.vue';
import ErrorToast from './components/ErrorToast.vue';

const { loading, error } = storeToRefs(useCollectionStore());

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
        console.log('timeout');
        displayToast.value = false;
    }, 3000);

    console.log('error watch', error);
});
</script>

<template>
    <ErrorToast :display-toast="displayToast" />

    <Loader v-if="loading" />
    <router-view></router-view>
</template>
