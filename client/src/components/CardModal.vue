<script setup>
import { watch } from 'vue';

const props = defineProps({
    showing: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['cardModalClose']);

const close = () => {
    emit('cardModalClose');
};

// Prevent the background to scroll while modal is opened
watch(
    () => props.showing,
    (newValue) => {
        if (newValue) {
            return document.querySelector('body').classList.add('overflow-hidden');
        }
        document.querySelector('body').classList.remove('overflow-hidden');
    }
);
</script>

<template>
    <Transition name="fade">
        <div v-if="showing" class="fixed inset-0 w-full h-screen flex items-center justify-center bg-gray-700/75" @click.self="close">
            <div class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
                <button aria-label="close" class="absolute top-3 right-1 text-xl text-gray-500 my-2 mx-4" @click.prevent="close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <slot />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
