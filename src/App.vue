<template>
    <div>
        <router-view></router-view>
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
    },

    computed: {
        ...mapGetters("header", ["curentPage", "menu", "menuState"]),

        ...mapGetters("status", [
            "start",
            "lastPage",
            "objectivs",
            "restorAPIobjectivs",
        ]),
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
};
</script>

<style lang="scss"></style>