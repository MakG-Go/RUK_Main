<template>
    <div>
        <h1 class="mb-20 mb-xs-15">Final</h1>
        <h2 class="mb-20 mb-xs-15">
            Вы просмотрели {{ getTotalWhatch }}% страниц
        </h2>

        <div>
            <button @click="closeCource" class="btn">Закрыть</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters("status", ["visitTotal", "visit"]),
        getTotalWhatch() {
            return Math.floor((this.visit.length * 100) / this.visitTotal);
        },
    },
    methods: {
        closeCource() {
            window.close();
        },
    },
};
</script>

<style>
</style>