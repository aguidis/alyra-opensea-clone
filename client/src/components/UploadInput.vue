<script setup>
import { ref } from 'vue';

const emit = defineEmits(['nftFile']);

const preview = ref();

const previewImage = (event) => {
    const input = event.target;
    if (input.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.value = e.target.result;
        };

        const selectedFile = input.files[0];

        reader.readAsDataURL(selectedFile);

        emit('nftFile', selectedFile);
    }
};
</script>
<template>
    <div class="form-group">
        <label for="name" class="block mb-2 font-bold text-gray-900">Image</label>
        <input
            type="file"
            accept="image/*"
            class="block mt-2 mb-5 text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
            @change="previewImage"
        />

        <div class="border-dotted border-2 rounded-lg p-5 sm:w-1/2">
            <img v-if="preview" :src="preview" class="img-fluid" alt="preview" />
            <p v-else>Preview</p>
        </div>
    </div>
</template>
