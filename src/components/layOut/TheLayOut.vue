
<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/menu/TheHeader.vue";
import NavigationButton from "@/components/menu/TheNavigationButton.vue";

export default {
    name: "LayOut",
    components: {
        Header,
        NavigationButton,
    },

    methods: {
        ...mapActions("status", [
            "addVisitPage",
            "setLocation",
            "saveState",
            "checkTotalVisit",
        ]),
        onGlobalScroll(event) {
            if (this.menuState) {
                let scrollContainer = this.$refs.globalScroll;
                scrollContainer.$el.scrollTop =
                    scrollContainer.ps.lastScrollTop;
            }
        },
    },

    computed: {
        ...mapGetters("header", ["curentPage", "menu", "menuState"]),

        ...mapGetters("status", [
            "start",
            "lastPage",
            "objectivs",
            "restorAPIobjectivs",
        ]),

        getMainWrapper() {
            return {
                main__wrapper: this.$route.name === "Page_2",
            };
        },
        getMainContainer() {
            return {
                container__main: this.$route.name === "Page_2",
            };
        },
    },

    mounted() {
        if (this.start) {
            // this.addVisitPage(this.$route.name);
            // if (this.lastPage !== undefined && this.lastPage !== null) {
            //     console.log(this.lastPage, "8888");

            //     this.$router.push({ path: this.lastPage });
            // }
            this.restorAPIobjectivs;
        }
    },
};
</script>
<template >
    <div class="wrapper-course" :class="getMainWrapper">
        <Header />

        <perfect-scrollbar
            ref="globalScroll"
            @ps-scroll-y="onGlobalScroll"
            class="js-global-scroll"
        >
            <div class="container" :class="getMainContainer">
                <router-view v-slot="{ Component }">
                    <transition mode="out-in" name="navigation">
                        <component
                            :is="Component"
                            :key="$route.path"
                        ></component>
                    </transition>
                </router-view>

                <!-- <router-view></router-view> -->

                <transition appear mode="out-in" name="navigation">
                    <NavigationButton :key="$route.path" />
                </transition>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<style lang="">
</style>