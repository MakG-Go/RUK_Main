<script >
import Main from "@/components/land/Main_3d.vue";
import description from "@/components/land/Description.vue";
import {
    LAERS_SWITCH_PROPS,
    MODELS_SWITCH_PROPS,
} from "&/courseData/mainData.js";
export default {
    components: {
        Main,
        description,
    },
    data() {
        return {
            panoram: false,
            show: false,
            loaded: false,
            switchLaer: false,
            models: [
                {
                    model: "models/mine.glb",
                    scale: 1,
                    position: { x: 0, y: 0, z: 0 },
                    name: "Mine",
                    startDiscription: "Слой 1",
                },
            ],
            selected: null,
            descriptionData: null,
        };
    },
    methods: {
        switchLaers() {
            this.switchLaer = !this.switchLaer;
            this.selected = null;
            this.show = false;
        },

        switchSelect(e) {
            this.show = true;
            this.selected = e.target.value;
            this.descriptionData =
                MODELS_SWITCH_PROPS[this.selected].description;
        },

        modelLoaded(state) {
            this.loaded = state;
        },

        closeDescripton() {
            this.show = false;
            this.selected = null;
        },
        showPanoram() {
            this.panoram = !this.panoram;
        },
    },
    computed: {
        getCurrentLaer() {
            if (!this.switchLaer) {
                return LAERS_SWITCH_PROPS.top;
            }
            return LAERS_SWITCH_PROPS.bottom;
        },

        getSelectibleObject() {
            if (!this.switchLaer) {
                return LAERS_SWITCH_PROPS.top.models;
            }
            return LAERS_SWITCH_PROPS.bottom.models;
        },
        getModelName() {
            return (name) => {
                return MODELS_SWITCH_PROPS[name].description.title;
            };
        },
        getSelectAnimate() {
            if (this.show) {
                return "active";
            }

            return;
        },
    },
    beforeUnmount() {
        this.show = false;
        this.loaded = false;
        this.switchLaer = false;
        this.selected = null;
        this.descriptionData = null;
    },
};
</script>

<template>
    <div>
        <Main
            :models-data="models"
            :descripton="show"
            :current-laer="getCurrentLaer"
            :selected="selected"
            :panoram="panoram"
            @model-loaded="modelLoaded"
        >
        </Main>

        <Transition name="sidebar" mode="out-in">
            <description
                v-if="show"
                class="discriotion"
                :description-data="descriptionData"
            >
                <template v-slot:close>
                    <button
                        class="btn btn-primary discriotion__close"
                        @click="closeDescripton"
                    >
                        Закрыть
                    </button>
                </template>
            </description>
        </Transition>

        <Transition name="controllers">
            <div class="controller__wrapper" v-if="loaded">
                <div class="controller__container">
                    <Transition name="controllers">
                        <div class="controller__header" v-if="!show">
                            <div class="switch-panoram__container">
                                <input
                                    @change="showPanoram"
                                    id="switch-panoram-shadow"
                                    class="switch switch-panoram__shadow"
                                    type="checkbox"
                                    :checked="panoram"
                                />

                                <label for="switch-panoram-shadow"></label>
                            </div>
                        </div>
                    </Transition>

                    <Transition name="controllers">
                        <div class="controller__footer" v-if="!panoram">
                            <Transition name="controllers">
                                <div class="switch__container" v-if="!show">
                                    <input
                                        @change="switchLaers"
                                        id="switch-shadow"
                                        class="switch switch__shadow"
                                        type="checkbox"
                                        :checked="switchLaer"
                                    />
                                    <label for="switch-shadow"></label>
                                </div>
                            </Transition>

                            <Transition name="selecters" mode="out-in">
                                <div
                                    class="controller__select_container"
                                    :class="getSelectAnimate"
                                    :key="getSelectibleObject"
                                >
                                    <select
                                        class="controller__select"
                                        size="1"
                                        @change="switchSelect($event)"
                                    >
                                        <option
                                            disabled
                                            :selected="selected == null"
                                        >
                                            Выберите выроботку
                                        </option>
                                        <option
                                            v-for="(
                                                name, key
                                            ) in getSelectibleObject"
                                            :key="key + name"
                                            :value="name"
                                        >
                                            {{ getModelName(name) }}
                                        </option>
                                    </select>
                                </div>
                            </Transition>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </div>
</template>


<style scoped>
</style>

