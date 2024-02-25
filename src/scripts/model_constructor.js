
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { MeshBVH } from 'three-mesh-bvh'
import * as THREE from 'three'

export class CreateModel {

    constructor(params) {
        this.Init(params);
    }

    Init(params) {
        this.params = params;
        this.LoadModels(this.params);
    }

    LoadModels(params) {

        this.params = params;

        new GLTFLoader(this.params.preloader).load(this.params.model, (gltf) => {

            this.model = gltf.scene;
            this.model.updateMatrixWorld(true);
            this.params.meshStore.push(gltf.scene);

            this.model.traverse((child) => {

                if (child.isMesh) {

                    child.material.wireframe = false
                    child.material.envMap = this.params.material;
                    child.material.envMapIntensity = 4;
                    child.material.needsUpdate = true;

                    child.castShadow = true
                    child.receiveShadow = true

                    this.model.userData[child.name] = child.material;

                    child.userData.parentName = this.params.name;
                    child.userData.originalColor = child.material.color.clone();
                    this.params.materialColor.set(child, child.material.color.clone());


                    if (child.name.includes('under') || child.name.includes('land')) {
                        child.castShadow = false
                        child.receiveShadow = false
                        return
                    }


                }



            })

            this.model.name = this.params.name;

            if (this.params.scale) {
                this.model.scale.set(this.params.scale.x, this.params.scale.y, this.params.scale.z);
            }

            this.params.scene.add(this.model);
        });
    }
}