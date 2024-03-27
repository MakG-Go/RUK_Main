<script>
import { mapGetters, mapActions } from "vuex";
import SvgIcon from "../ui/SvgIcon.vue";
export default {
    name: "Glossary",
    components: { SvgIcon },
    data() {
        return {
            typeData: null,
            literData: null,
            currentLiter: null,
            currentType: null,
            inputData: null,
            allLiter: true,
            allTypes: true,
            selectType: "",

            sideBarAcept: false,
        };
    },

    methods: {
        ...mapActions("header", ["togleSidebar"]),

        createSlice(arr) {
            let simbols = [];
            let glossaryData = [];
            simbols = arr.map((item) => item.title.slice(0, 1));
            simbols = simbols
                .filter((item, key) => simbols.indexOf(item) === key)
                .sort();

            simbols.forEach((simbol, key) => {
                let glosObject = new Object();

                glosObject.liter = simbol;

                glosObject.description = [];

                arr.forEach((item, ndx) => {
                    let firstLiter = item.title.slice(0, 1);

                    if (firstLiter === simbol) {
                        glosObject.description.push(item);
                    }
                });

                glossaryData.push(glosObject);
            });

            return glossaryData;
        },

        getAllLiter() {
            this.allLiter = true;
            this.literData = null;
            this.currentLiter = null;
        },

        getAllTypes() {
            this.allTypes = true;
            this.currentType = null;
            this.typeData = null;
            this.selectType = "";
            if (this.currentLiter != null) {
                this.filterLiter(this.currentLiter);
            }
        },

        getDescriptions(arr) {
            return arr
                .map((item) => item.description)
                .reduce((a, b) => {
                    return [...a, ...b];
                });
        },

        /** Поиск */

        filterText($event) {
            let curentValue = $event.target.value.toLowerCase();

            if (curentValue.length === 0) {
                return (this.inputData = null);
            }

            let checkData = this.getDescriptions(this.getCurrentData);
            let strtInputData = checkData.filter(
                (item) => item.title.toLowerCase().includes(curentValue)
                // ||
                // item.text.toLowerCase().includes(curentValue)
            );

            this.inputData = this.createSlice(strtInputData);
        },

        /** Фильтрация по буквам */

        filterLiter(liter) {
            this.allLiter = false;
            this.currentLiter = liter;
            let literArr = JSON.parse(JSON.stringify(this.getLiterData));
            this.literData = literArr.filter((item) => item.liter === liter);
        },

        /** Создание data после выбора фильтра */

        filterType(event, type) {

            this.allTypes = false;
            this.currentType = type;
            const descr = this.getAllDescriptions.filter(
                (item) => item.type.toUpperCase() === type.toUpperCase()
            );
            this.typeData = this.createSlice(descr);

            this.sideBarAcept = event.target.checked

            // if (this.currentLiter != null) {
            //     this.filterLiter(this.currentLiter);
            // }
        },

        showSidebar() {
            this.togleSidebar();
        },

        scrollTo(key) {
            let container = this.$refs.scroll.$el;
            let elem = this.$refs.liter[key];
            let tl_1 = this.$gsap.timeline({
                defaults: {
                    ease: "Sine.easeOut",
                },
            });

            tl_1.to(container, {
                scrollTop: elem.offsetTop,
                duration: 1,
            });
        },
    },

    computed: {
        ...mapGetters("header", ["glossary", "sideBarState"]),

        getGlossaryProps() {
            return this.glossary.glossaryProps;
        },

        getInputPlaceholder() {
            return this.glossary.glossaryProps?.placeholder;
        },

        createGlossData() {
            return this.createSlice(this.glossary.glossaryData);
        },

        getCompliteData() {
            if (this.inputData !== null) {
                return this.inputData;
            }
            return this.getCurrentData;
        },

        getStartData() {
            return JSON.parse(JSON.stringify(this.createGlossData));
        },

        getCurrentData() {
            if (!this.allTypes && this.allLiter) {
                return this.typeData;
            }
            // if (!this.allTypes && !this.allLiter) {
            //     return this.literData;
            // }
            // if (this.allTypes && !this.allLiter) {
            //     return this.literData;
            // }
            return this.getStartData;
        },

        getLiterData() {
            if (!this.allTypes) {
                return this.typeData;
            }
            return this.getStartData;
        },

        getAllDescriptions() {
            return this.getDescriptions(this.getStartData);
        },

        getDataType() {
            const dataType = this.getAllDescriptions.map(
                (item, key) => item.type
            );

            let trueType = dataType.filter(
                (item, key) => dataType.indexOf(item) === key
            );

            let compliteType = trueType.map((item) => {
                return item.charAt(0).toUpperCase() + item.slice(1);
            });

            return compliteType;
        },

        getLinkActiveClass() {
            return (liter) => {
                return {
                    active:
                        liter === this.currentLiter &&
                        this.currentLiter != null,
                    all: liter === undefined && this.currentLiter === null,
                };
            };
        },

        getTypeActiveClass() {
            return (type) => {
                return {
                    active:
                        type === this.currentType && this.currentType != null,
                    all: type === undefined && this.currentType === null,
                };
            };
        },

        getFilterActive() {
            return {
                active: this.selectType.length > 0,
            };
        },

        getINput404() {
            if (this.inputData === null) return;
            return this.inputData.length === 0;
        },

        getAcept() {

            return this.sideBarAcept && this.typeData != null


        }
    },

    mounted() {
        this.$nextTick(() => {
            const topPos = Math.round(
                Math.abs(
                    this.$refs.scroll.ps.element.getBoundingClientRect().top
                )
            );

            this.$refs.scroll.ps.element.style.height =
                "calc(100dvh - " + topPos + "px - 3rem)";
        });
    },
};
</script>

<template>
    <div class="glossary__container">
        <!-- Фильтрация по буквам -->

        <!-- <div class="glossary__link_container">
            <button
                :class="['glossary__link', getLinkActiveClass()]"
                @click="getAllLiter"
            >
                <span>Все</span>
            </button>
            <div
                v-for="(glosData, key) in getCurrentData"
                :key="glosData.description + key + Date.now()"
                @click="filterLiter(glosData.liter)"
                :class="['glossary__link', getLinkActiveClass(glosData.liter)]"
            >
                <span>{{ glosData.liter }}</span>
            </div>
        </div> -->

        <div class="glossary__type_container">
            <div class="glossary__search">
                <SvgIcon name="search" class="glossary__icon" />
                <input class="glossary__input" @keyup="filterText($event)" type="text"
                    :placeholder="getInputPlaceholder" />
            </div>

            <button :class="['glossary__filters', getFilterActive]" @click="togleSidebar">
                <SvgIcon name="setting"></SvgIcon>
                <span class="glossary__filters_text" v-html="getGlossaryProps.showAllFiltersText"></span>
            </button>
        </div>

        <perfect-scrollbar class="glossary__scroll" ref="scroll">
            <div v-for="(glosData, key) in getCompliteData" :key="key + Date.now()">
                <ul class="glossary__contant" ref="liter">
                    <li class="glossary__card" v-for="literData in glosData.description"
                        :key="literData.title + Date.now()">
                        <div class="glossary__description">
                            <h3 class="glossary__title">
                                <span>{{ literData.title }}</span>
                            </h3>
                            <p class="glossary__text">
                                {{ literData.text }}
                            </p>
                        </div>
                        <div class="glossary__image">
                            <img :src="literData.img" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="getINput404">
                <h3 class="text-white" v-html="getGlossaryProps.emptyText"></h3>
            </div>
        </perfect-scrollbar>

        <transition name="sidebar-open" mode="out-in">
            <div class="glossary__sidebar" v-if="sideBarState">
                <div class="glossary__sidebar_header">
                    <h3 v-html="getGlossaryProps.sidebarTitle"></h3>
                    <button class="glossary__sidebar_close" @click="togleSidebar">
                        <SvgIcon name="close"></SvgIcon>
                    </button>
                </div>
                <hr class="hr hr-gray" />
                <div class="glossary__sidebar_subtitle">
                    <p class="text-l--fix text-medium" v-html="getGlossaryProps.sidebarSubTitle"></p>
                    <button class="text-m glossary__sidebar_clear" @click="getAllTypes"
                        v-html="getGlossaryProps.showAllBtnText"></button>
                </div>

                <div class="radio" v-for="(type, typeKey) in getDataType" :key="type + typeKey + Date.now()">
                    <input :id="type + typeKey + Date.now()" type="radio" :value="type" v-model="selectType"
                        @change="filterType($event, type)" />
                    <label :for="type + typeKey + Date.now()" v-html="type"></label>
                </div>

                <transition name="sidebar-acept">
                    <button v-if="getAcept" class="glossary__sidebar_acept btn" @click="togleSidebar"
                        v-html="getGlossaryProps.aceptBtnText">
                    </button>
                </transition>

            </div>
        </transition>

        <transition name="sidebar-dark" mode="out-in">
            <div class="glossary__sidebar_dark" v-if="sideBarState"></div>
        </transition>

    </div>
</template>

<style lang="scss"></style>
