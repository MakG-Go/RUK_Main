
<script>


import { DepthTexture } from 'three';
import { mapGetters } from 'vuex';
export default {
    name: "PageNavigation",
    data() {
        return {
            activatedSection: [],
            currentSection: '',
        }
    },
    methods: {

        createObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        this.checkActive(entry.target.id)
                        this.currentSection = entry.target.id
                    }
                })
            });
            document.querySelectorAll('.js-observer').forEach((section) => {
                observer.observe(section)
            })
        },

        checkActive(section) {

            if (!this.activatedSection.includes(section)) {
                this.activatedSection.push(section);
                return
            }
        },

    },

    computed: {
        ...mapGetters("header", ["menu", "menuState"]),

        getNavigationData() {
            const subArray = this.menu.filter(item => item.pageRoute === this.$route.name)
            return subArray[0]

        },

        getLastBoolit() {
            return (ndx) => {
                return ndx + 1 < this.getNavigationData.scrollPage.length
            }
        },

        getActivatedSection() {

            return (section) => {
                return {
                    active: this.activatedSection.includes(section.split('').slice(1).join(''))
                }
            }

        }
    },
    mounted() {

        this.createObserver()

    }

}
</script>

<template lang="">
    <aside>
        <!-- {{getNavigationData}} -->
        <ul class="page-navigation">
            <li
                v-for="(
                    subScroll, subTitleKey
                ) in getNavigationData.scrollPage"
                class=""
                :key="subScroll.name"
            >
                <router-link
                    class="cursor-default"
                    :to="{
                        name: subScroll.pageRoute,
                        hash: subScroll.hash,
                    }"
                    ><div class="page-navigation__item" :class="getActivatedSection(subScroll.hash)">
                        <span class="page-navigation__text">{{ subScroll.name }}</span>
                    </div>
                    <div class="page-navigation__line" v-if="getLastBoolit(subTitleKey)"></div>
                </router-link>
            </li>
         </ul>
    </aside>
</template>

<style lang="">
    
</style>