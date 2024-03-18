<script>
import { mapGetters } from "vuex";
export default {
    name: "Glossary",
    data() {
        return {
            typeData: null,
            literData: null,
            currentLiter: null,
            currentType: null,
            inputText: null,
            allLiter: true,
            allTypes: true,
        };
    },

    methods: {
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

        filterText($event) {
            console.log($event.target.value);
        },

        filterLiter(liter) {
            this.allLiter = false;
            this.currentLiter = liter;
            let literArr = JSON.parse(JSON.stringify(this.getLiterData));
            this.literData = literArr.filter((item) => item.liter === liter);
        },

        filterType(type) {
            this.allTypes = false;
            this.currentType = type;
            const descr = this.getAllDescriptions.filter(
                (item) => item.type.toUpperCase() === type.toUpperCase()
            );
            this.typeData = this.createSlice(descr);

            if (this.currentLiter != null) {
                this.filterLiter(this.currentLiter);
            }
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
        ...mapGetters("header", ["glossary"]),

        getGlossaryHeader() {
            return this.glossary.glossaryProps;
        },

        getInputPlaceholder() {
            return this.glossary.glossaryProps?.placeholder;
        },

        createGlossData() {
            return this.createSlice(this.glossary.glossaryData);
        },

        getStartData() {
            return JSON.parse(JSON.stringify(this.createGlossData));
        },

        getCurrentData() {
            if (!this.allTypes && this.allLiter) {
                return this.typeData;
            }
            if (!this.allTypes && !this.allLiter) {
                return this.literData;
            }
            if (this.allTypes && !this.allLiter) {
                return this.literData;
            }
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
        <div class="glossary__header mb-40 mb-xs-15">
            <h2
                class="text-white text-demi mb-15 mb-xs-15"
                v-html="getGlossaryHeader.title"
            ></h2>
            <p
                class="text-white text-m"
                v-html="getGlossaryHeader.description"
            ></p>
        </div>

        <!-- Фильтрация по буквам -->

        <div class="glossary__link_container">
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
        </div>

        <div class="glossary__type_container">
            <input
                class="glossary__input"
                @keyup="filterText($event)"
                v-model="inputText"
                type="text"
                :placeholder="getInputPlaceholder"
            />

            <button
                :class="['glossary__link', getTypeActiveClass()]"
                @click="getAllTypes"
            >
                <span>Все</span>
            </button>

            <button
                v-for="(type, typeKey) in getDataType"
                :key="type + typeKey + Date.now()"
                @click="filterType(type)"
                :class="['glossary__link', getTypeActiveClass(type)]"
            >
                <span v-html="type"></span>
            </button>
        </div>

        <perfect-scrollbar class="glossary__scroll" ref="scroll">
            <div
                v-for="(glosData, key) in getCurrentData"
                :key="key + Date.now()"
            >
                <ul class="glossary__contant" ref="liter">
                    <li
                        class="glossary__card"
                        v-for="literData in glosData.description"
                        :key="literData.title + Date.now()"
                    >
                        <div class="glossary__title">
                            <span>{{ literData.title }}</span>
                        </div>
                        <p class="glossary__text">
                            {{ literData.text }}
                        </p>
                        <div class="glossary__image">
                            <img :src="literData.img" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="getCurrentData.length == 0">
                <h3 class="text-white">
                    В разделе "{{ currentType }}" нет определение на букву "{{
                        currentLiter
                    }}"
                </h3>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<style lang="scss">
</style>>

