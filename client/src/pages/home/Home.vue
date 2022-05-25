<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow">
            <HeroHome />
        </main>
    </div>
</template>

<script>
import Header from "../../components/Header.vue";
import HeroHome from "../../components/HeroHome.vue";

export default {
    components: {HeroHome, Header}
}
</script>
