
<script>
import px from "/environmentMaps/4/px.jpg";
import nx from "/environmentMaps/4/nx.jpg";
import py from "/environmentMaps/4/py.jpg";
import ny from "/environmentMaps/4/ny.jpg";
import pz from "/environmentMaps/4/pz.jpg";
import nz from "/environmentMaps/4/nz.jpg";

import {
    LAERS_SWITCH_PROPS,
    MODELS_SWITCH_PROPS,
    GLOBAL_CAMERA_DURATION,
    START_CONTROL_PARAMS,
    PANORAM_PARAMS,
} from "&/courseData/mainData.js";
import { CreateModel } from "@/scripts/model_constructor.js";

import _ from "lodash";
// import { acceleratedRaycast } from "three-mesh-bvh";
import { gsap } from "gsap";
import * as dat from "lil-gui";
import * as THREE from "three";
import { LoadingManager } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

export default {
    name: "Main",

    props: {
        modelsData: { type: Array, required: true },
        currentLaer: { type: Object, default: () => {} },
        selected: { type: String, default: null },
        descripton: { type: Boolean, default: false },
        panoram: { type: Boolean, default: false },
    },

    data() {
        return {
            meshes: [],
            loadPercetn: 0,
            originalColors: new Map(),

            startTargetCamera: new THREE.Vector3(
                ...Object.values(LAERS_SWITCH_PROPS.top.cameraTarget)
            ),
            startCameraPosition: new THREE.Vector3(
                ...Object.values(LAERS_SWITCH_PROPS.top.cameraPosition)
            ),

            emissiveOff: { r: 0, g: 0, b: 0 },
            emissiveOn: { r: 0.678, g: 0.576, b: 0.482 },
        };
    },

    methods: {
        init() {
            this.scene = new THREE.Scene();

            this.mouse = new THREE.Vector2();

            this.getCameraParams();
            this.getEnvierment();
            this.getRendererParams();

            // this.createTestMesh();
            this.getControlsParams();
            this.createLight();

            this.getModelData.forEach((model) => {
                this.getModel(model);
            });

            // this.createPostProcess();
            // this.createBloom();

            // this.axesHelper = new THREE.AxesHelper(5);
            // this.scene.add(this.axesHelper);

            // this.createGuiParams();
        },
        getCameraParams() {
            this.camera = new THREE.PerspectiveCamera(
                45,
                this.getSizes.width / this.getSizes.height,
                0.01,
                20
            );

            this.camera.position.copy(this.startCameraPosition);
            this.scene.add(this.camera);
        },

        getRendererParams() {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });
            this.canvas.appendChild(this.renderer.domElement);

            this.renderer.setSize(this.getSizes.width, this.getSizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setClearColor(0x000000, 0);
            // this.renderer.shadowMap.enabled = true;

            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
            // this.renderer.toneMapping = THREE.AgXToneMapping;
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1;
        },

        getControlsParams() {
            this.controls = new OrbitControls(this.camera, this.canvas);
            this.controls2 = new TrackballControls(this.camera, this.canvas);

            this.controls.enablePan = false;

            this.controls.mouseButtons = {
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: null,
                RIGHT: null,
            };

            this.controls.enableZoom = false;

            this.controls.enableDamping = START_CONTROL_PARAMS.demping;
            this.controls.dampingFactor = 0.1;

            this.controls.minDistance = START_CONTROL_PARAMS.mindist;
            this.controls.maxDistance = START_CONTROL_PARAMS.maxdist;

            this.controls.minPolarAngle = START_CONTROL_PARAMS.minPolarAngle;
            this.controls.maxPolarAngle = START_CONTROL_PARAMS.maxPolarAngle;

            this.controls.rotateSpeed = START_CONTROL_PARAMS.rotateSpeed;

            this.controls.autoRotateSpeed =
                START_CONTROL_PARAMS.autoRotateSpeed;

            this.controls2.noRotate = true;
            this.controls2.noPan = true;
            this.controls2.zoomSpeed = START_CONTROL_PARAMS.zoomSpeed;

            this.controls2.minZoom = START_CONTROL_PARAMS.mindist;
            this.controls2.maxZoom = START_CONTROL_PARAMS.maxdist;
        },

        getEnvierment() {
            this.cubeTextureLoader = new THREE.CubeTextureLoader();
            this.environmentMap = this.cubeTextureLoader.load([
                px,
                nx,
                py,
                ny,
                pz,
                nz,
            ]);
            // this.environmentMap.colorSpace = THREE.SRGBColorSpace;

            // this.scene.background = this.environmentMap;
            this.scene.environment = this.environmentMap;

            this.environmentMap.minFilter = THREE.NearestFilter;
            this.environmentMap.magFilter = THREE.NearestFilter;
            this.environmentMap.generateMipmaps = false;

            this.envMapIntensity = 7;
        },

        /** POSTPROCESSING */

        createPostProcess() {
            let RenderTargetClass = null;

            RenderTargetClass = THREE.WebGLRenderTarget;

            this.renderTarget = new RenderTargetClass(800, 600, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
            });

            this.effectComposer = new EffectComposer(
                this.renderer,
                this.renderTarget
            );
            this.effectComposer.setPixelRatio(
                Math.min(window.devicePixelRatio, 2)
            );
            this.effectComposer.setSize(
                this.getSizes.width,
                this.getSizes.height
            );

            this.renderPass = new RenderPass(this.scene, this.camera);

            this.effectComposer.addPass(this.renderPass);

            this.renderPass.renderToScreen = true;
        },

        createBloom() {
            const unrealBloomPass = new UnrealBloomPass();
            unrealBloomPass.enabled = true;
            this.effectComposer.addPass(unrealBloomPass);

            unrealBloomPass.strength = 0.3;
            unrealBloomPass.radius = 1;
            unrealBloomPass.threshold = 0.6;
        },

        /**----------------------------- */

        createLight() {
            // this.ambientLight = new THREE.AmbientLight(0xffffff, 15);

            // this.scene.add(this.ambientLight);

            this.directionalLight = new THREE.DirectionalLight(0xffffff, 10);
            this.directionalLight.position.x = 4.4;
            this.directionalLight.position.y = 2;
            this.directionalLight.position.z = -4.2;
            this.directionalSize = 2;

            // this.directionalLight.castShadow = true;
            // this.directionalLight.shadow.mapSize.set(1024, 1024);
            // this.directionalLight.shadow.camera.far = 15;
            // this.directionalLight.shadow.bias = -0.002;
            // this.directionalLight.shadow.normalBias = 0.03;
            // this.directionalLight = new THREE.DirectionalLightHelper(
            //     this.directionalLight,
            //     this.directionalSize
            // );

            this.scene.add(this.directionalLight);
            // this.scene.add(this.pointLightHelper);
        },

        getPreloader() {
            return new LoadingManager(
                () => {
                    gsap.to(this.canvas, {
                        opacity: 1,
                    });
                    this.$emit("model-loaded", true);

                    this.$refs.preloader.classList.remove("active");
                    this.loadPercetn = 0;
                    // console.log("Loaded");
                },
                (itemUrl, itemsLoaded, itemsTotal) => {
                    let loadProc = itemsLoaded / itemsTotal;
                    this.loadPercetn = Math.floor(loadProc * 100);

                    itemsLoaded / itemsTotal !== 1
                        ? (this.canvas.style.opacity = 0)
                        : "";
                }
            );
        },

        getModel({ model, scale, position, name, startDiacription }) {
            let newModel = new CreateModel({
                scene: this.scene,
                scale: new THREE.Vector3(scale, scale, scale),
                material: this.environmentMap,
                meshStore: this.meshes,
                materialColor: this.originalColors,
                preloader: this.getPreloader(),
                intersecStore: this.intersects,
                model: model,
                name: name,
                position: position,
                startDiacription: startDiacription,
            });
            return newModel;
        },

        showPanoram(show) {
            console.log(this.currentLaer);
            let params;
            show ? (params = PANORAM_PARAMS) : (params = this.currentLaer);

            this.controls.minAzimuthAngle = params.azimuthAngle.min;
            this.controls.maxAzimuthAngle = params.azimuthAngle.max;

            /** LAERS CAMERA ZOOM */
            gsap.to(this.controls, {
                maxDistance: params.distant.max,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2, {
                maxZoom: params.distant.max,
                duration: GLOBAL_CAMERA_DURATION,
            });

            gsap.to(this.controls, {
                minDistance: params.distant.min,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2, {
                minZoom: params.distant.min,
                duration: GLOBAL_CAMERA_DURATION,
            });

            /** LAERS CAMERA TARGET */
            gsap.to(this.camera.position, {
                ...params.cameraPosition,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls.target, {
                ...params.cameraTarget,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2.target, {
                ...params.cameraTarget,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls, {
                maxPolarAngle: params.polarAngle.max,
                minPolarAngle: params.polarAngle.min,
            });
        },

        getSelectLaer() {
            console.log(this.currentLaer);

            this.controls.autoRotate = false;

            this.controls.minAzimuthAngle = this.currentLaer.azimuthAngle.min;
            this.controls.maxAzimuthAngle = this.currentLaer.azimuthAngle.max;

            /** LAERS CAMERA ZOOM */
            gsap.to(this.controls, {
                maxDistance: this.currentLaer.distant.max,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2, {
                maxZoom: this.currentLaer.distant.max,
                duration: GLOBAL_CAMERA_DURATION,
            });

            gsap.to(this.controls, {
                minDistance: this.currentLaer.distant.min,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2, {
                minZoom: this.currentLaer.distant.min,
                duration: GLOBAL_CAMERA_DURATION,
            });

            /** LAERS CAMERA TARGET */
            gsap.to(this.camera.position, {
                ...this.currentLaer.cameraPosition,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls.target, {
                ...this.currentLaer.cameraTarget,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2.target, {
                ...this.currentLaer.cameraTarget,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls, {
                minPolarAngle: this.currentLaer.polarAngle.min,
                maxPolarAngle: this.currentLaer.polarAngle.max,
            });
        },

        getSelectedModel(name) {
            if (typeof name != "string") {
                this.removeSelected();
                return;
            }

            this.moveCameraPosition(name);

            this.meshes[0].traverse((child) => {
                if (child.isMesh) {
                    gsap.to(child.material.emissive, {
                        ...this.emissiveOff,
                        duration: 0.3,
                    });
                    child.material.color = { ...child.userData.originalColor };
                }

                if (child.isMesh && !child.name.includes(name)) {
                    child.material.emissiveIntensity = 1;

                    gsap.to(child.material.emissive, {
                        ...this.emissiveOn,
                        duration: 0.3,
                    });

                    return;
                }
            });
        },

        removeSelected() {
            this.meshes[0].traverse((child) => {
                if (child.isMesh) {
                    gsap.to(child.material.emissive, {
                        ...this.emissiveOff,
                        duration: 0.3,
                    });
                    child.material.color = {
                        ...child.userData.originalColor,
                    };
                }
            });
        },

        moveCameraPosition(model) {
            this.controls.autoRotate = true;

            const target = MODELS_SWITCH_PROPS[model].position;
            const camDist = MODELS_SWITCH_PROPS[model].distant;

            this.controls.minAzimuthAngle = -Infinity;
            this.controls.maxAzimuthAngle = Infinity;

            /** MODELS CAMERA ZOOM */
            gsap.to(this.controls, {
                maxDistance: camDist.max,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2, {
                maxZoom: camDist.max,
                duration: GLOBAL_CAMERA_DURATION,
            });

            gsap.to(this.controls, {
                minDistance: camDist.min,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2, {
                minZoom: camDist.min,
                duration: GLOBAL_CAMERA_DURATION,
            });

            /** MODELS CAMERA TARGET */

            gsap.to(this.controls.target, {
                ...target,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.controls2.target, {
                ...target,
                duration: GLOBAL_CAMERA_DURATION,
            });
            gsap.to(this.camera.position, {
                z: target.z + 0.5,
                duration: GLOBAL_CAMERA_DURATION,
            });
        },

        destroyScene() {
            gsap.killTweensOf(this.targetCamera);
            window.removeEventListener("resize", this.resize);

            this.meshes.forEach((mesh) => {
                mesh.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.dispose();
                        child.geometry = null;
                        if (child.material.map) {
                            child.material.map.dispose();
                            child.material.map = null;
                        }
                        child.material.dispose();
                        child.material = null;

                        child.userData.parentName = NaN;
                        child.userData.key = NaN;
                        child.userData.originalColor = NaN;
                        if (child instanceof THREE.Texture) {
                            child.dispose();
                            child = null;
                        }
                    }
                });
            });

            this.meshes = [];
            this.originalColors = [];
            this.environmentMap = null;

            this.renderer.forceContextLoss();
            this.renderer.renderLists.dispose();
            this.renderer.dispose();

            this.canvas.removeChild(this.renderer.domElement);

            this.renderer = null;
            this.camera = null;
            this.scene = null;
        },

        destroyModel() {
            this.scene.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.geometry = null;
                    if (child.material.map) {
                        child.material.map.dispose();
                        child.material.map = null;
                    }
                    child.material.dispose();
                    child.material = null;

                    child.userData.parentName = NaN;
                    child.userData.key = NaN;
                    child.userData.originalColor = NaN;
                    if (child instanceof THREE.Texture) {
                        child.dispose();
                        child = null;
                    }
                }
                if (child.isGroup) {
                    this.scene.remove(child);
                }
            });

            this.meshes = [];
            this.originalColors = new Map();
        },

        stopStartAutoRotate() {
            this.controls.autoRotate = false;
        },

        tick() {
            // Controls
            this.controls.update();
            this.controls2.update();
            // Render
            // this.renderer.clear();
            // this.renderer.clearDepth();
            // this.effectComposer.render();
            this.renderer !== null
                ? this.renderer.render(this.scene, this.camera)
                : "";

            requestAnimationFrame(this.tick);
        },

        resize() {
            window.addEventListener("resize", () => {
                // Update sizes
                this.getSizes.width = window.innerWidth;
                this.getSizes.height = window.innerHeight;

                // Update camera
                this.camera.aspect = this.getSizes.width / this.getSizes.height;
                this.camera.updateProjectionMatrix();

                // Update renderer
                this.renderer.setSize(
                    this.getSizes.width,
                    this.getSizes.height
                );
                this.renderer.setPixelRatio(
                    Math.min(window.devicePixelRatio, 2)
                );
            });
        },

        createGuiParams() {
            // Debug;
            this.gui = new dat.GUI({
                width: 500,
            });
            this.gui
                .add(this.pointLight.position, "x")
                .min(-5)
                .max(5)
                .step(0.001)
                .name("P_Light X");
            this.gui
                .add(this.pointLight.position, "y")
                .min(-5)
                .max(5)
                .step(0.001)
                .name("P_Light Y");
            this.gui
                .add(this.pointLight.position, "z")
                .min(-5)
                .max(5)
                .step(0.001)
                .name("P_Light Z");
            this.gui
                .add(this.pointLight, "intensity")
                .min(-1)
                .max(10000)
                .step(0.001)
                .name("P_Light intensity");
            // this.gui
            //     .add(this.ambientLight, "intensity")
            //     .min(-1)
            //     .max(5)
            //     .step(0.001)
            //     .name("A_Light intensity");

            // this.gui
            //     .add(this.cameraPos, "x")
            //     .min(-5)
            //     .max(5)
            //     .step(0.001)
            //     .name("cam pos x");
            // this.gui
            //     .add(this.cameraPos, "y")
            //     .min(-5)
            //     .max(5)
            //     .step(0.001)
            //     .name("cam pos y");
            // this.gui
            //     .add(this.cameraPos, "z")
            //     .min(-5)
            //     .max(5)
            //     .step(0.001)
            //     .name("cam pos z");

            // this.gui
            //     .add(this.cameraTar, "x")
            //     .min(-5)
            //     .max(5)
            //     .step(0.001)
            //     .name("cam target x");
            // this.gui
            //     .add(this.cameraTar, "y")
            //     .min(-5)
            //     .max(5)
            //     .step(0.001)
            //     .name("cam target y");
            // this.gui
            //     .add(this.cameraTar, "z")
            //     .min(-5)
            //     .max(5)
            //     .step(0.001)
            //     .name("cam target z");
        },
    },

    computed: {
        getSizes() {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        getActiveClass() {
            return {
                active: this.descripton,
            };
        },
        getModelData() {
            return this.modelsData;
        },
    },

    watch: {
        currentLaer() {
            this.controls.autoRotate ? this.stopStartAutoRotate() : "";
            this.getSelectLaer();
        },

        selected() {
            this.controls.autoRotate ? this.stopStartAutoRotate() : "";
            this.getSelectedModel(this.selected);
        },
        descripton() {
            if (!this.descripton) {
                this.removeSelected();
                this.getSelectLaer();
            }
        },
        panoram() {
            this.showPanoram(this.panoram);
        },
    },

    mounted() {
        this.canvas = this.$refs.webGl;
        this.tooltip = this.$refs.tooltip;
        this.init();
        this.resize();
        this.tick();
        this.controls.autoRotate = true;
    },

    beforeUnmount() {
        this.destroyScene();
    },

    unmounted() {
        cancelAnimationFrame(this.animationFrameId);
    },
};
</script>

<template >
    <div @click="stopStartAutoRotate">
        <div ref="preloader" class="lds-roller preloader active">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p class="preloader_percent">{{ loadPercetn }}%</p>
        </div>
        <div ref="webGl" class="main" :class="getActiveClass"></div>
    </div>
</template>

<style scoped>
.tooltip {
    position: absolute;
    pointer-events: none;
    background-color: rgba(145, 152, 215, 0.8);
    color: white;
    padding: 5px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    border-radius: 3px;
    font-weight: 600;
    font-size: 25px;
    z-index: 3;
}
</style>