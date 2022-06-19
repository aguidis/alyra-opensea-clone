import { createRouter } from 'vue-router';
import Homepage from './home/Home.vue';
import Explore from './explore/Explore.vue';

const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/explore',
        component: Explore
    }
];

export default function (history) {
    return createRouter({
        history,
        routes
    });
}
