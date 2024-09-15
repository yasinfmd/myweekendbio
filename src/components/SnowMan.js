import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import snowManModel from "../assets/models/snowman.glb";

const loadSnowMan = () => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            snowManModel,
            (gltf) => {
                gltf.scene.rotateY(4);
                gltf.scene.position.set(3, -0.5, 3);
                gltf.scene.scale.set(2, 2, 2);

                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
};

export {loadSnowMan};
