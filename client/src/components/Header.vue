<template>
    <header class="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out" :class="`${!top && 'bg-white backdrop-blur-sm shadow-lg'}`">
        <div class="max-w-6xl mx-auto px-5 sm:px-6">
            <div class="flex items-center justify-between h-16 md:h-20">

                <div class="flex-shrink-0 mr-4">
                    <router-link to="/" class="block" aria-label="Cruip">
                        <svg class="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                                    <stop stop-color="#4FD1C5" offset="0%" />
                                    <stop stop-color="#81E6D9" offset="25.871%" />
                                    <stop stop-color="#338CF5" offset="100%" />
                                </radialGradient>
                            </defs>
                            <rect width="32" height="32" rx="16" fill="url(#header-logo)" fill-rule="nonzero" />
                        </svg>
                    </router-link>
                </div>

                <nav class="flex flex-grow">
                    <ul class="flex flex-grow justify-end flex-wrap items-center">
                        <li>
                            <router-link to="/explore"  class="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                                Explore
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/sign-in" class="btn-sm text-blue-600 bg-white border-blue-600 ml-3">
                                <span>Sign in</span>
                                <svg class="w-3 h-3 fill-current text-blue-600 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fill-rule="nonzero" />
                                </svg>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const top = ref(true);
        
        const scrollHandler = () => {
            top.value = window.pageYOffset <= 10
        };
        window.addEventListener('scroll', scrollHandler);
        
        return { top }
    },
}
</script>
