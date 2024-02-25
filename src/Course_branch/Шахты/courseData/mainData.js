import { shallowRef, ref } from "vue";

import Testing from "@/components/Testing.vue";
import { testing_1 } from "&/courseData/testingData.js"

export const GLOBAL_CAMERA_DURATION = 1

export const PANORAM_PARAMS = {

    distant: {
        max: 8,
        min: 5
    },
    azimuthAngle: {
        min: -Infinity,
        max: Infinity,
    },

    polarAngle: {
        min: 0,
        max: Math.PI,
    },

    cameraPosition: {
        x: 2.5,
        y: 8,
        z: 5,
    },

    cameraTarget: {
        x: 0.15,
        y: -1.33,
        z: 0.14,
    },
}

export const START_CONTROL_PARAMS = {
    demping: true,
    mindist: 2,
    maxdist: 5,

    minPolarAngle: Math.PI * 0.2,
    maxPolarAngle: Math.PI * 0.4,
    azimuthAngle: -Infinity,
    azimuthAngle: Infinity,

    rotateSpeed: 0.15,
    autoRotateSpeed: 0.5,
    zoomSpeed: 0.5,
    cameraPosition: {
        x: 2.5,
        y: 2,
        z: 3.5,
    },

    cameraTarget: {
        x: 0,
        y: 0,
        z: 0,
    },
}

export const LAERS_SWITCH_PROPS = {
    top: {
        cameraPosition: {
            x: 2.5,
            y: 2,
            z: 3.5,
        },

        cameraTarget: {
            x: 0,
            y: 0,
            z: 0,
        },

        azimuthAngle: {
            min: -Infinity,
            max: Infinity,
        },

        polarAngle: {
            min: Math.PI * 0.2,
            max: Math.PI * 0.4,
        },
        distant: {
            max: 5,
            min: 3
        },
        models: ['stvol_1', 'stvol_2']

    },

    bottom: {
        cameraPosition: {
            x: 2.5,
            y: -0.5,
            z: 3.5,
        },

        cameraTarget: {
            x: 1.79,
            y: -0.765,
            z: 1.04,
        },

        azimuthAngle: {
            min: 0,
            max: Math.PI * 0.8,
        },

        polarAngle: {
            min: Math.PI * 0.41,
            max: Math.PI * 0.45,
        },

        distant: {
            max: 2.5,
            min: 1.8
        },
        models: ['lava']

    },



}

export const MODELS_SWITCH_PROPS = {

    lava: {
        position: {
            x: 2.251,
            y: -0.65,
            z: 1.83,
        },
        distant: {
            max: 1.5,
            min: 0.2
        },
        description: {
            title: 'ЛАВА',
            text: 'Лававая лава',
            component: shallowRef(Testing),
            data: testing_1.date
        }
    },

    stvol_1: {
        position: {
            x: 0.56,
            y: 0.03,
            z: 0.006,
        },
        distant: {
            max: 1.5,
            min: 0.2
        },
        description: {
            title: 'СТВОЛ 1',
            text: 'СТВОЛ СТВОЛУШКА ПЕРВЫЙ'
        }
    },

    stvol_2: {
        position: {
            x: 0.834,
            y: 0.031,
            z: -0.0031,
        },
        distant: {
            max: 1.5,
            min: 0.2
        },
        description: {
            title: 'СТВОЛ 2',
            text: 'СТВОЛ СТВОЛУШКА ВТОРОЙ'
        }
    }
}


