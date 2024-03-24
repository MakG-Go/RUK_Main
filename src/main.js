import { createApp } from 'vue'
import 'animate.css/animate.min.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import Vue3Lottie from 'vue3-lottie'
import '@/scss/style.scss'
import 'swiper/css/bundle';
import 'virtual:svg-icons-register'
import router from "&/router/router.js"
import store from "@/store/index.js"
import gsapPlugin from "@/customPlugins/globalGsap"
import App from '@/App.vue'

import PerfectScrollbar from 'vue3-perfect-scrollbar'



createApp(App)
    .use(PerfectScrollbar, {
        watchOptions: true,
        options: {
            suppressScrollX: true,
            swipeEasing: true,
            wheelPropagation: false
        }
    })

    .use(gsapPlugin)
    .use(Vue3Lottie)
    .use(store)
    .use(router)
    .mount('#app')

