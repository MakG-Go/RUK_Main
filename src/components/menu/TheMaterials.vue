<template>
    <div>
        <perfect-scrollbar class="materials__scroll">
            <ul class="materials__container">
                <li v-for="(file, key) in materials" :key="file.name + key" @click="downloadMaterial(e, file.link)"
                    :class="getClass(file)">

                    <p class="materials__title">
                        <span v-html="file.title"></span>
                    </p>

                    <div class="materials__img">
                        <img :src="file.img" alt="">
                    </div>

                    <div class="materials__description">
                        <p class="materials__description_text"  v-html="file.name"></p>
                        <SvgIcon :name="file.icon" />
                    </div>

                </li>
            </ul>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SvgIcon from "../ui/SvgIcon.vue";
export default {
    name: 'Materials',
    components: { SvgIcon },
    computed: {
        ...mapGetters("header", ["materials"]),

        getClass() {
            return (ndx) => {
                return {
                    'materials__item': ndx.icon === "download",
                    'materials__link': ndx.icon === "link"

                }
            }
        }
    },
    methods: {
        downloadMaterial: function (e, material) {
            console.log(material);
            window.open(material, "newwindow", "width=1000,height=700");
        },
    },
};
</script>

<style lang="scss"></style>
