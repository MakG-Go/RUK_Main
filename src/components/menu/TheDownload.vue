<template>
    <div>
        <perfect-scrollbar class="download__scroll">
            <ul>
                <li
                    v-for="(file, key) in downloads"
                    :key="file.name + key"
                    class="download__item"
                    @click="downloadMaterial(e, file.link)"
                >
                    <p class="download__item-title mb-pink">
                        <span>{{ file.name }}</span>
                    </p>
                    <p class="download__item-size">
                        <span>{{ file.size }}</span>
                    </p>
                </li>
            </ul>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters("header", ["downloads"]),
    },
    methods: {
        downloadMaterial: function (e, material) {
            console.log(material);
            window.open(material, "newwindow", "width=1000,height=700");
        },
    },
};
</script>

<style lang="scss" >
</style>

