import { createRouter } from 'vue-router';
import Homepage from './Home.vue';
import Explore from './Explore.vue';
import Collection from './Collection.vue';

const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/explore-collections',
        component: Explore
    },
    {
        path: '/collection/:id-:slug',
        component: Collection
    }
];

export default function (history) {
    return createRouter({
        history,
        routes
    });
}
