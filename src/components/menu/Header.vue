<template>
    <div>
        <div class="header" :class="getHeaderClass">
            <div class="header__container">

                <SvgIcon name="logo" class="header__logo"></SvgIcon>

                <div class="header__navigation">
                    <button v-for="(navBtn, ndx) in navButtons" :key="navBtn.name" class="header-btn"
                        :class="addHeaderButtonClass(ndx)" @click="showNavfromHeader(ndx)">
                        <p class="header__navigation_text text-m">{{ navBtn.name }}</p>
                    </button>
                </div>


            </div>
        </div>

        <div class="menu__nav" :class="getMenuClass">
            <div class="menu__contant" :class="gatMenuContant">
                <div class="menu__container">
                    <transition mode="out-in" name="menu">
                        <component :is="activeComponent" v-if="activeComponent" />
                    </transition>
                </div>
                <button class="menu__close" @click="closeMenu">
                    <SvgIcon name="close"></SvgIcon>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from "./Menu.vue";
import Glossary from "./Glossary.vue";
import Download from "./Download.vue";
import SvgIcon from "../ui/SvgIcon.vue";

import { shallowRef } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
    components: { Menu, Glossary, Download, SvgIcon },
    data() {
        return {
            navButtons: [
                {

                    name: "Содержание",
                    active: false,
                    component: shallowRef(Menu),
                },
                {

                    name: "Полезные материалы",
                    active: false,
                    component: shallowRef(Download),
                },
                {

                    name: "Глоссарий",
                    active: false,
                    component: shallowRef(Glossary),
                },
            ],

            activeComponent: shallowRef(Menu),
        };
    },
    methods: {
        ...mapActions("header", ["toggleMenu"]),

        showNavfromHeader(num) {

            if (!this.menuState) {
                this.toggleMenu();
            }


            this.navButtons.forEach((item, ndx) => {
                num === ndx ? (item.active = true) : (item.active = false);
            });
            this.activeComponent = this.navButtons[num].component;
        },
        closeMenu(){
            this.toggleMenu();
            this.activeComponent = shallowRef(Menu)

        }

    },

    computed: {
        ...mapGetters("status", ["visitTotal", "visit", "objectivs"]),
        ...mapGetters("header", ["menuState"]),

        getMenuClass() {
            return {
                "menu__nav-open": this.menuState,
            };
        },
        getHeaderClass() {
            return {
                header__open: this.menuState,
            };
        },
        getBurgerClass() {
            return {
                header__button_open: this.menuState,
            };
        },
        gatMenuContant() {
            return {
                menu__contant_open: this.menuState,
            };
        },
        addHeaderButtonClass() {
            return (key) => {
                return {
                    "header-btn--open": this.navButtons[key].active && this.menuState,
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>

