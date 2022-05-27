<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main class="flex-grow">
            <HeroHome />
            <ExploreHome />
            <FeaturesHome />
            <Testimonials />
            <Footer />
        </main>
    </div>
</template>

<script>
import Header from "../../components/Header.vue";
import HeroHome from "../../components/HeroHome.vue";
import ExploreHome from "../../components/ExploreHome.vue";
import FeaturesHome from "../../components/FeaturesHome.vue";
import Testimonials from "../../components/Testimonials.vue";
import Footer from "../../components/Footer.vue";

export default {
    components: {Footer, Testimonials, FeaturesHome, ExploreHome, HeroHome, Header}
}
</script>
