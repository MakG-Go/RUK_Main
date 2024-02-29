<template>
    <div>
        <perfect-scrollbar class="menu__scroll">
            <ul class="menu__nav-content">
                <li v-for="(page, titleKey) in menu" :key="page.getRoutParams">
                    <router-link @click="toggleMenu" :to="{ name: page.pageRoute }">
                        <article class="menu__nav-card" :class="getActivTitleClass(titleKey)" :style="getLinksAnimate(titleKey)">
                            <div class="menu__nav-card_image">
                                <img :src="page.image" alt="">
                            </div>
                            <p class="text-m">{{ page.name }}</p>
                        </article>
                    </router-link>
                    <!--                     
                    <div v-if="page.scrollPage">
                        <ul class="menu__nav-submenu">
                            <li
                                v-for="(
                                    subScroll, subTitleKey
                                ) in page.scrollPage"
                                class="menu__nav-subtitle"
                                :class="
                                    getActivSubtitleClass(titleKey, subTitleKey)
                                "
                                :key="subScroll.name"
                            >
                                <router-link
                                    @click="toggleMenu"
                                    :to="{
                                        name: page.pageRoute,
                                        hash: subScroll.hash,
                                    }"
                                    ><span>{{ subScroll.name }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div> -->
                </li>
            </ul>
        </perfect-scrollbar>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from "vuex";

export default {
    name: "Menu",
    methods: {
        ...mapActions("header", ["toggleMenu"]),
    },
    computed: {
        ...mapGetters("header", ["menu", "menuState"]),

        getLinksAnimate() {
            return (id) => {
                if (this.menuState) {
                    let p1 = new Promise(function (resolve, reject) {
                        resolve(0.15 + Number(id * 0.1));
                    }).then((result) => result);
                    return {
                        opacity: "1",
                        // transform: "translateY(0)",
                        // "transition-delay": 0.15 + Number(id * 0.1) + "s",
                    };
                }
            };
        },
        getActivTitleClass() {
            return (key) => {
                return {
                    active: this.menu[key].pageRoute === this.$route.name,
                };
            };
        },
        getActivSubtitleClass() {
            return (key, ndx) => {
                return {
                    active:
                        this.menu[key].scrollPage[ndx].hash ===
                        this.$route.hash,
                };
            };
        },
    },
    mounted(){

        console.log(this.menu[0].image)
    }
};
</script>

<style lang="scss" scoped></style>

