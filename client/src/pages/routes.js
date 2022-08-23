import { createRouter } from 'vue-router';
import Homepage from './Home.vue';
import Explore from './Explore.vue';
import Collection from './Collection.vue';
import Token from './Token.vue';
import CreateListing from './CreateListing.vue';
import UpdateListing from './UpdateListing.vue';
import CancelListing from './CancelListing.vue';
import BuyToken from './BuyToken.vue';
import CreateToken from './CreateToken.vue';
import Account from './Account.vue';
import Collections from './Collections.vue';
import CreateCollection from './CreateCollection.vue';
import CreatedTokensAccount from './CreatedTokensAccount.vue';

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
        path: '/assets/ethereum/:address/:index/create-listing',
        name: 'token_create_listing',
        component: CreateListing
    },
    {
        path: '/assets/ethereum/:address/:index/update-listing',
        name: 'token_update_listing',
        component: UpdateListing
    },
    {
        path: '/assets/ethereum/:address/:index/cancel-listing',
        name: 'token_cancel_listing',
        component: CancelListing
    },
    {
        path: '/assets/ethereum/:address/:index/buy',
        name: 'buy_token',
        component: BuyToken
    },
    {
        path: '/assets/create',
        name: 'create_token',
        component: CreateToken
    },
    {
        path: '/assets/create',
        name: 'create_token',
        component: CreateToken
    },
    {
        path: '/account',
        name: 'account',
        component: Account
    },
    {
        path: '/account/created-tokens',
        name: 'account_created_tokens',
        component: CreatedTokensAccount
    },
    {
        path: '/collections',
        name: 'collections',
        component: Collections
    },
    {
        path: '/collection/create',
        name: 'create_collection',
        component: CreateCollection
    }
];

export default function (history) {
    return createRouter({
        history,
        routes
    });
}
