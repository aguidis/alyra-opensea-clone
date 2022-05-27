<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow"></main>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';

export default {
    components: { Header }
};
</script>
