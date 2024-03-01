
import { createRouter, createWebHashHistory } from "vue-router";
import tutorial from '&/views/Tutorial.vue';
import final from '&/views/Final.vue';
import Page_1 from "&/views/pages/Page_1.vue";
import { gsap } from 'gsap';



const routes = [
    { path: '/', name: 'tutorial-page', component: tutorial, props: true },
    { path: '/final', name: 'final', component: final, props: true },
    { path: '/Page_1', name: 'Page_1', component: Page_1, props: true },

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

        let tl_1 = gsap.timeline({
            defaults: {
                ease: "Sine.easeOut",
            },
        });

        let container = document.querySelector('.js-global-scroll')
        if(container === null) return

        if (to.hash) {
            return new Promise((resolve, reject) => {

                setTimeout(() => {
                    let el = document.getElementById(to.hash.substring(1))
                    resolve(
                        tl_1.to(container, {
                            scrollTop: el.offsetTop - headerHeight,
                            duration: 1,
                        })
                    )
                }, time)
            })

        } else {
            return tl_1.to(container, {
                scrollTop: 0,
                duration: 0.1,
            });;
        };

    },
})

