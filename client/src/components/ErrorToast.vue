<template>
    <div
        class="fixed top-24 right-10 flex items-center justify-between max-w-xs p-4 bg-gray-800 rounded-lg shadow-lg shadow-gray-600 transition-opacity duration-400 ease-in opacity-0"
        :class="{ 'opacity-100': displayToast }"
    >
        <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
            </svg>
            <p class="ml-3 text-md font-bold text-white">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    displayToast: {
        type: Boolean,
        required: true
    },
    error: {
        type: [Object, null],
        required: true,
        default: null
    }
});
</script>
