<script>
import { _GET_DEVICE_TYPE } from "@/globals/Methods.js"
console.log(_GET_DEVICE_TYPE())

import Menu from "./TheMenu.vue";
import Glossary from "./TheGlossary.vue";
import Materials from "./TheMaterials.vue";
import SvgIcon from "../ui/SvgIcon.vue";

import { shallowRef } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Header",
    components: { Menu, Glossary, Materials, SvgIcon },
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
                    component: shallowRef(Materials),
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

            if (typeof num === "number") {
                this.activeComponent = this.navButtons[num].component;
            }
            if (typeof num === "object") {
                num.active = true;
                this.activeComponent = num.component;
                return;
            }
        },
        closeMenu() {
            this.toggleMenu();
            this.activeComponent = shallowRef(Menu);
        },
    },

    computed: {
        ...mapGetters("status", ["visitTotal", "visit", "objectivs"]),
        ...mapGetters("header", ["menuState"]),

        getDeviceType() {
            return _GET_DEVICE_TYPE() === "desktop"
        },

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
        getGlossary() {
            return this.navButtons.filter(
                (item) => item.name === "Глоссарий"
            )[0];
        },
        addHeaderButtonClass() {
            return (key) => {
                if (typeof key === "number") {
                    return {
                        "header-btn__open":
                            this.navButtons[key].active && this.menuState,
                    };
                }
                if (typeof key === "object") {
                    return {
                        "header-btn__open": key.active && this.menuState,
                    };
                }
            };
        },
        getBurgerActive() {
            return { active: this.menuState }

        }
    },
};
</script>

<template>
    <div>
        <div class="header" :class="getHeaderClass">
            <div class="header__container">
                <SvgIcon name="logo" class="header__logo"></SvgIcon>

                <div class="header__navigation" v-if="getDeviceType">
                    <button v-for="(navBtn, ndx) in navButtons" :key="navBtn.name" class="header-btn"
                        :class="addHeaderButtonClass(ndx)" @click="showNavfromHeader(ndx)">
                        <span class="header__navigation_text text-m" v-if="navBtn.name != 'Глоссарий'">
                            {{ navBtn.name }}
                        </span>
                    </button>
                </div>

                <div class="flex">

                    <button class="header-btn header-btn__gloss" :class="addHeaderButtonClass(getGlossary)"
                        @click="showNavfromHeader(getGlossary)">
                        <SvgIcon name="gloss" class="header__icon"></SvgIcon>

                        <span class="header__navigation_text text-m" v-if="getDeviceType">
                            {{ getGlossary.name }}
                        </span>
                    </button>

                    <button class="header__burger" :class="getBurgerActive" @click="closeMenu" v-if="!getDeviceType">
                        <span class="header__burger_line"></span>
                        <span class="header__burger_line"></span>
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
                <button class="menu__close" @click="closeMenu" v-if="getDeviceType">
                    <SvgIcon name="close"></SvgIcon>
                </button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
