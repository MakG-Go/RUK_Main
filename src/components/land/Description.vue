<script>
export default {
    props: {
        descriptionData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },

    computed: {
        getData() {
            if (this.descriptionData === null || this.descriptionData === {}) {
                return {
                    title: "",
                    text: "",
                };
            }
            return this.descriptionData;
        },

        getComponent() {
            if (!this.descriptionData?.component) return;
            return this.descriptionData.component;
        },

        getComponentData() {
            if (!this.descriptionData?.data) return;
            return this.descriptionData.data;
        },
    },

    mounted() {
        console.log(this.descriptionData);
    },
};
</script>


<template>
    <div>
        <h1 class="discriotion__title">
            {{ getData.title }}
        </h1>

        <h3 class="discriotion__text">
            {{ getData.text }}
        </h3>

        <slot name="close"></slot>

        <component
            :is="getComponent"
            :question-storage="getComponentData"
        ></component>
    </div>
</template>



<style>
</style>
