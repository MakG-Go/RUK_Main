<template>
    <div>
        <!-- Сплеш -->
        <!-- 
        <transition name="splash">
            <Splash v-if="!start"></Splash>
        </transition> -->

        <!-- <Header> </Header> -->

        <router-view></router-view>

        <!-- <router-view v-slot="{ Component }">
            <transition
                mode="out-in"
                :name="$route.meta.transition || 'navigation'"
            >
                <component :is="Component" :key="$route.path"></component>
            </transition>
        </router-view> -->

        <!-- <div class="wrapper-course" :class="getMainWrapper">
            <Header> </Header>

            <perfect-scrollbar
                v-if="start"
                ref="globalScroll"
                @ps-scroll-y="onGlobalScroll"
                class="js-global-scroll"
            >
                <div class="container" :class="getMainContainer">
                    <router-view v-slot="{ Component }">
                        <transition
                            appear
                            mode="out-in"
                            appear-active-class="animate__animated animate__fadeIn"
                            name="navigation"
                        >
                            <component
                                :is="Component"
                                :key="$route.path"
                            ></component>
                        </transition>
                    </router-view>

                    <transition appear mode="out-in" name="navigation">
                        <NavigationButton :key="$route.path">
                        </NavigationButton>
                    </transition>
                </div>
            </perfect-scrollbar>
        </div> -->
    </div>
</template>

<script>
import Header from "@/components/menu/TheHeader.vue";
import NavigationButton from "@/components/menu/TheNavigationButton.vue";
import Splash from "@/components/splash/TheSplash.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    components: { Header, NavigationButton, Splash },

    methods: {
        ...mapActions("status", [
            "addVisitPage",
            "setLocation",
            "saveState",
            "checkTotalVisit",
        ]),

        /** Блокируем скролл при открытии меню */

        // onGlobalScroll(event) {
        //     if (this.menuState) {
        //         let scrollContainer = this.$refs.globalScroll;
        //         scrollContainer.$el.scrollTop =
        //             scrollContainer.ps.lastScrollTop;
        //     }
        // },
    },

    computed: {
        ...mapGetters("header", ["curentPage", "menu", "menuState"]),

        ...mapGetters("status", [
            "start",
            "lastPage",
            "objectivs",
            "restorAPIobjectivs",
        ]),

        // getMainWrapper() {
        //     return {
        //         main__wrapper: this.$route.name === "Page_2",
        //     };
        // },
        // getMainContainer() {
        //     return {
        //         container__main: this.$route.name === "Page_2",
        //     };
        // },
    },

    mounted() {},

    watch: {
        $route() {
            console.log("route");
            if (this.start) {
                console.log("2");
                this.addVisitPage(this.$route.name);
                this.setLocation(this.$route.path);
                this.saveState();
                this.checkTotalVisit();
            }
        },
    },

    // watch: {
    //     start() {
    //         if (this.start) {
    //             this.addVisitPage(this.$route.name);
    //             if (this.lastPage !== undefined && this.lastPage !== null) {
    //                 console.log(this.lastPage, "8888");

    //                 this.$router.push({ path: this.lastPage });
    //             }
    //             this.restorAPIobjectivs;
    //         }
    //     },
    //     $route() {
    //         console.log("1");
    //         if (this.start) {
    //             console.log("2");
    //             this.addVisitPage(this.$route.name);
    //             this.setLocation(this.$route.path);
    //             this.saveState();
    //             this.checkTotalVisit();
    //         }
    //     },
    // },
};
</script>

<style lang="scss"></style>