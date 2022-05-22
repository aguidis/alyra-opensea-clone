import { defineStore } from 'pinia'

export const useCatalog = defineStore('catalog-store', {
    state: () => {
        return {
            collections: [],
            fetching: false
        }
    },

    getters: {
        results(state) {
            return state.collections;
        },

        isFetching(state) {
            return state.fetching;
        }
    },

    actions: {
        async fetchCollections() {
            this.fetching = true;
            const response = await fetch('/data/new-arrivals.json');
            try {
                const result = await response.json();
                this.collections = result.books;
            } catch (err) {
                this.collections = [];
                console.error('Error loading new arrivals:', err);
                return err;
            }

            this.fetching = false;
        }
    }
})
