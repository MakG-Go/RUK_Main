<script>
import { mapGetters } from "vuex";
export default {
    name: "Glossary",
    data() {
        return {
            glossaryData: [],
        };
    },
    methods: {
        createSlice() {
            let simbols = [];
            simbols = this.glossary.map((item) => item.title.slice(0, 1));
            simbols = simbols
                .filter((item, key) => simbols.indexOf(item) === key)
                .sort();

            simbols.forEach((simbol, key) => {
                let glosObject = new Object();

                glosObject.liter = simbol;

                glosObject.description = [];

                this.glossaryData.push(glosObject);

                this.glossary.forEach((item, ndx) => {
                    let firstLiter = item.title.slice(0, 1);
                    firstLiter === simbol
                        ? glosObject.description.push(item)
                        : "";
                });
            });
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
    mounted() {
        this.createSlice();
    },
    computed: {
        ...mapGetters("header", ["glossary"]),
    },
};
</script>

<template>
    <div class="glossary__container">
        <perfect-scrollbar class="glossary__scroll" ref="scroll">
            <div v-for="glosData in glossaryData" :key="glosData.litter">
                <!-- <h2 class="glossary__liter" ref="liter">
                    {{ glosData.liter }}
                </h2> -->
                <ul class="glossary__contant" ref="liter">
                    <li
                        class="mb-pink"
                        v-for="literData in glosData.description"
                        :key="literData.title"
                    >
                        <div class="glossary__title">
                            <span>{{ literData.title }}</span>
                        </div>
                        <p class="glossary__text">
                            {{ literData.text }}
                        </p>
                    </li>
                </ul>
            </div>
        </perfect-scrollbar>
        <div class="glossary__link_container">
            <div
                v-for="(glosData, key) in glossaryData"
                :key="glosData.description"
                @click="scrollTo(key)"
                class="glossary__link"
            >
                <span>{{ glosData.liter }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>>

