<template>
    <router-view></router-view>
</template>

<script>
import AOS from 'aos';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
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
    }
};
</script>
