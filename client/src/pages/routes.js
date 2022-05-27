import { createRouter } from 'vue-router';
import Homepage from './home/Home.vue';
import SignIn from './sign-in/SignIn.vue';
import Explore from './explore/Explore.vue';

const routes = [
    {
        path: '/',
        component: Homepage
    },
    {
        path: '/explore',
        component: Explore
    },
    {
        path: '/sign-in',
        component: SignIn
    }
];

export default function (history) {
    return createRouter({
        history,
        routes
    });
}
