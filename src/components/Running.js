import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import runningMan from "../assets/models/low-poly_racoon_run_animation.glb";
import * as THREE from 'three';

const loadRunningMan = () => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            runningMan,
            (gltf) => {
                gltf.scene.scale.set(3, 3, 3);
                gltf.scene.position.set(0, 0, 0);
                gltf.scene.rotation.set(0, 1, 0);
                const animationMixer = new THREE.AnimationMixer(gltf.scene);
                const action = animationMixer.clipAction(gltf.animations[0]);

                action.setLoop(THREE.LoopRepeat);  // Sonsuz döngüye ayarla
                action.play();
                resolve({ scene: gltf.scene, animationMixer ,action});

            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
};

export default loadRunningMan;
