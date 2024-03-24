
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    name: "Media",
    methods: {
        onSwiper() {
            console.log("on swiper");
        },
        onSlideChange() {
            console.log("on SlideChange");
        },
    },
};
</script>

<template>
    <swiper
        :slides-per-view="3"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        ...
    </swiper>
</template>

<style>
</style>