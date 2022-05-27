<template>
    <p>coucou</p>
</template>

<script>
import { useCatalog } from '../stores/catalog';

export default {
    setup() {
        const { collections, fetching } = useCatalog();

        return { collections, fetching };
    },
    methods: {
        fetchCollections() {
            this.store.fetchCollections();
            console.log('New Count:', this.collections);
        }
    }
};
</script>
