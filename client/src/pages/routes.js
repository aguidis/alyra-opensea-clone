import { createRouter } from 'vue-router';
import Homepage from './Home.vue';
import Explore from './Explore.vue';
import Collection from './Collection.vue';
import Token from './Token.vue';
import TokenSell from './TokenSell.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Homepage
    },
    {
        path: '/explore-collections',
        name: 'explore',
        component: Explore
    },
    {
        path: '/collection/:id-:slug',
        name: 'collection',
        component: Collection
    },
    {
        path: '/assets/ethereum/:address/:index',
        name: 'token',
        component: Token
    },
    {
        path: '/assets/ethereum/:address/:index/sell',
        name: 'token_sell',
        component: TokenSell
    }
];

export default function (history) {
    return createRouter({
        history,
        routes
    });
}
