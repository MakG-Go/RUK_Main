<template>
    <div>
        <perfect-scrollbar class="menu__scroll">
            <ul class="menu__nav-content">
                <li v-for="(page, titleKey) in menu" :key="page.getRoutParams">
                    <router-link
                        :class="getActivePages(page.pageRoute)"
                        @click="toggleMenu"
                        :to="{ name: page.pageRoute }"
                    >
                        <article
                            class="menu__nav-card"
                            :class="[
                                getActivTitleClass(titleKey),
                                getActivePages(page.pageRoute),
                            ]"
                            :style="getLinksAnimate(titleKey)"
                        >
                            <div class="menu__nav-card_image">
                                <img :src="page.image" alt="" />
                                <SvgIcon
                                    name="eye"
                                    class="menu__nav-card_icon"
                                    v-if="!getActiveted(page.pageRoute)"
                                ></SvgIcon>
                            </div>
                            <p class="text-m">{{ page.name }}</p>
                        </article>
                    </router-link>
                </li>
            </ul>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import SvgIcon from "../ui/SvgIcon.vue";

export default {
    name: "Menu",
    components: { SvgIcon },
    methods: {
        ...mapActions("header", ["toggleMenu"]),
    },
    computed: {
        ...mapGetters("header", ["menu", "menuState"]),
        ...mapGetters("status", ["visit"]),

        getActiveted() {
            return (page) => this.visit.map((item) => item.name).includes(page);
        },

        getActivTitleClass() {
            return (key) => {
                return {
                    active: this.menu[key].pageRoute === this.$route.name,
                };
            };
        },

        getActivePages() {
            return (page) => {
                return {
                    disable: !this.getActiveted(page),
                };
            };
        },

        getLinksAnimate() {
            return (id) => {
                if (this.menuState) {
                    let p1 = new Promise(function (resolve, reject) {
                        resolve(0.15 + Number(id * 0.1));
                    }).then((result) => result);
                    return {
                        opacity: "1",
                        transform: "translateY(0)",
                        "transition-delay": 0.15 + Number(id * 0.1) + "s",
                    };
                }
            };
        },
    },
};
</script>

<style lang="scss" scoped></style>

