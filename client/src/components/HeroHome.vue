<template>
    <section class="relative">
        <div aria-hidden="true" class="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none">
            <svg height="578" viewBox="0 0 1360 578" width="1360" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="illustration-01" x1="50%" x2="50%" y1="0%" y2="100%">
                        <stop offset="0%" stop-color="#FFF"></stop>
                        <stop offset="77.402%" stop-color="#EAEAEA"></stop>
                        <stop offset="100%" stop-color="#DFDFDF"></stop>
                    </linearGradient>
                </defs>
                <g fill="url(#illustration-01)" fill-rule="evenodd">
                    <circle cx="1232" cy="128" r="128"></circle>
                    <circle cx="155" cy="443" r="64"></circle>
                </g>
            </svg>
        </div>
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="pt-32 pb-12 md:pt-40 md:pb-20">
                <div class="text-center pb-12 md:pb-16">
                    <h1 class="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate" data-aos="zoom-y-out">
                        Discover, collect, and sell
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> extraordinary NFTs </span>
                    </h1>
                    <div class="max-w-3xl mx-auto">
                        <p class="text-xl text-gray-600 mb-8 aos-init aos-animate" data-aos="zoom-y-out" data-aos-delay="150">
                            AlyraSea is the world's second and largest NFT marketplace
                        </p>
                        <div class="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center aos-init aos-animate" data-aos="zoom-y-out" data-aos-delay="300">
                            <div>
                                <router-link :to="{ name: 'explore' }" class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                                    Explore
                                </router-link>
                            </div>
                            <div>
                                <router-link :to="{ name: 'create_token' }" class="btn text-blue-600 bg-white border-blue-600 w-full sm:w-auto sm:ml-4">
                                    Create
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
