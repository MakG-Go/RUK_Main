
<script>
import { mapGetters } from "vuex";
export default {
    name: "PageNavigation",
    props: {
        threshhold: { type: Number, default: 20 },
        observe: { type: Number, default: 0.25 },
    },
    data() {
        return {
            activatedSection: [],
            currentSection: "",
            check: "",
        };
    },
    methods: {
        createObserver() {
            const options = {
                // root: document.querySelector(".wrapper-course"),
                root: null,
                threshold: this.createThreshold,
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    this.check = entry.intersectionRect.y;
                    if (entry.intersectionRatio > this.observe) {
                        this.checkActive(entry.target.id);
                        this.currentSection = entry.target.id;
                    }
                });
            }, options);

            document.querySelectorAll(".js-observer").forEach((section) => {
                observer.observe(section);
            });
        },

        checkActive(section) {
            if (!this.activatedSection.includes(section)) {
                this.activatedSection.push(section);
                return;
            }
        },
    },

    computed: {
        ...mapGetters("header", ["menu", "menuState"]),
        ...mapGetters("status", ["visit"]),

        getNavigationData() {
            const subArray = this.menu.filter(
                (item) => item.pageRoute === this.$route.name
            );
            return subArray[0];
        },

        getLastBoolit() {
            return (ndx) => {
                return ndx + 1 < this.getNavigationData.scrollPage.length;
            };
        },

        getActivatedSection() {
            return (section) => {
                return {
                    disable: !this.activatedSection.includes(
                        section.split("").slice(1).join("")
                    ),
                };
            };
        },

        getCurentSection() {
            return (section) => {
                return {
                    active:
                        section.split("").slice(1).join("") ===
                        this.currentSection,
                };
            };
        },

        createThreshold() {
            let thresh = [];
            for (let i = 0; i <= this.threshhold; i++) {
                thresh.push(i / this.threshhold);
            }
            return thresh;
        },
    },
    mounted() {
        console.log(this.visit);
        this.createObserver();
    },
};
</script>

<template>
    <aside>
        <ul class="page-navigation">
            <!-- <p>{{check}}</p> -->
            <li
                v-for="(section, sectionKey) in getNavigationData.scrollPage"
                class=""
                :key="section.name"
            >
                <router-link
                    :class="[
                        'cursor-default',
                        getActivatedSection(section.hash),
                    ]"
                    :to="{
                        name: section.pageRoute,
                        hash: section.hash,
                    }"
                    ><div
                        class="page-navigation__item"
                        :class="[
                            getActivatedSection(section.hash),
                            getCurentSection(section.hash),
                        ]"
                    >
                        <span class="page-navigation__text">{{
                            section.name
                        }}</span>
                    </div>
                    <div
                        class="page-navigation__line"
                        :class="getActivatedSection(section.hash)"
                        v-if="getLastBoolit(sectionKey)"
                    ></div>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<style >
</style>