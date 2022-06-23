import { createRouter } from 'vue-router';
import Homepage from './Home.vue';
import Explore from './Explore.vue';

const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/explore-collections',
        component: Explore
    }
];

export default function (history) {
    return createRouter({
        history,
        routes
    });
}
