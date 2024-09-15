import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import computerModel from "../assets/models/gaming_desktop_pc_blend_file.glb";

const loadComputerModel = () => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            computerModel,
            (gltf) => {
                gltf.scene.scale.set(0.3, 0.3, 0.3);
                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                console.error(error);
                reject(error);
            }
        );
    });
};

export { loadComputerModel };
