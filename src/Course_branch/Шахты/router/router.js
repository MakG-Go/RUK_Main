
import store from "@/store/index.js"
import { createRouter, createWebHashHistory } from "vue-router";
import Splash from "@/components/splash/TheSplash.vue"
import LayOut from "@/components/layOut/TheLayOut.vue"
import tutorial from '&/views/Tutorial.vue';
import final from '&/views/Final.vue';
import Page_1 from "&/views/pages/Page_1.vue";
import Page_2 from "&/views/pages/Page_2.vue";
import { gsap } from 'gsap';



const routes = [
    {
        path: '/',
        name: 'Splash',
        component: Splash,
        props: true,
    },

    {
        path: '/course-layout',
        component: LayOut,
        props: true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['status/start']) {
                store.dispatch('status/getStart').then(store.dispatch('status/addVisitPage', to.name)).then(next())
            }
            else {
                next()
            }
        },
        children: [

            {
                path: '',
                name: 'tutorial-page',
                component: tutorial,
                props: true,
                meta: { transition: 'splash' },
            },
            { path: 'final', name: 'final', component: final, props: true },
            { path: 'Page_1', name: 'Page_1', component: Page_1, props: true },
            { path: 'Page_2', name: 'Page_2', component: Page_2, props: true },

        ]
    },

    // { path: '/', name: 'tutorial-page', component: tutorial, props: true },

    // { path: '/final', name: 'final', component: final, props: true },
    // { path: '/Page_1', name: 'Page_1', component: Page_1, props: true },
    // { path: '/Page_2', name: 'Page_2', component: Page_2, props: true },

]

export default createRouter({
    history: createWebHashHistory(),
    routes,
    base: '/',

    /** Для скролла до элемента из меню */

    scrollBehavior(to, from, savedPosition) {

        let checkFrom = from.fullPath.split('#').slice(0, 1).join()
        let checkTo = to.path
        let time, headerHeight

        checkFrom === checkTo ? time = 0 : time = 1050
        window.innerWidth > 1024 ? headerHeight = 100 : headerHeight = 75


        let container = document.querySelector('.js-global-scroll')

        if (container === null) return

        if (to.hash) {
            return new Promise((resolve, reject) => {

                setTimeout(() => {
                    let el = document.getElementById(to.hash.substring(1))
                    resolve(
                        gsap.to(container, {
                            scrollTop: el.offsetTop - headerHeight,
                            duration: 1,
                        })
                    )
                }, time)
            })

        };

        gsap.to(container, {
            scrollTop: 0,
            duration: 0.25,
        });

    },
})

