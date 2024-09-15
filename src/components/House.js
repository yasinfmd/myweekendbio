import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import winterHouse from "../assets/models/winter_cabin.glb";
import * as THREE from 'three';

const loadWinterHouse = () => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            winterHouse,
            (gltf) => {
                gltf.scene.scale.set(0.01, 0.01, 0.01);
                gltf.scene.traverse((child) => {
                    if (child.isMesh && child.name.includes('moon')) {
                        child.visible = false;
                    }
                });
                const animationMixer = new THREE.AnimationMixer(gltf.scene);
                const action = animationMixer.clipAction(gltf.animations[0]);
                action.play();
                resolve({ scene: gltf.scene, animationMixer });
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
};

export default loadWinterHouse;
