<script>
import { mapActions, mapGetters } from "vuex";
import SvgIcon from "@/components/ui/SvgIcon.vue";
export default {
    name: "Splash",
    components: {
        SvgIcon,
    },
    computed: {
        ...mapGetters("status", ["start"]),
    },
    methods: {
        ...mapActions("status", ["getStart"]),
    },
};
</script>

<template>
    <div class="splash">
        <div class="container-full">
            <div class="col-lg-12 col-xs-12">
                <img class="mb-green center" src="/images/splash.jpg" alt="" />
            </div>
            <div class="row splash-container h-100">
                <div class="col-lg-6 col-xs-12 mb-xs-15">
                    <div class="flex flex__col h-100">
                        <div class="bottom">
                            <h1 class="text-white text-uppercase splash-title">
                                Электронный курс
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <div class="flex flex__col jf-end h-100">
                        <!-- <button @click="getStart" class="btn splash-btn">
                            <span>Начать</span
                            ><SvgIcon
                                name="next"
                                w="50"
                                h="20"
                                color="white"
                            ></SvgIcon>
                        </button> -->
                        <router-link
                            :to="{ name: 'tutorial-page' }"
                            class="btn splash-btn"
                        >
                            <span>Начать</span
                            ><SvgIcon
                                name="next"
                                w="50"
                                h="20"
                                color="white"
                            ></SvgIcon>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>