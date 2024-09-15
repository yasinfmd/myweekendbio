import aoGround from "../assets/ground/ice_0001_ao_1k.jpg";
import colorGround from "../assets/ground/ice_0001_color_1k.jpg";
import heightGround from "../assets/ground/ice_0001_height_1k.png";
import normalGround from "../assets/ground/ice_0001_normal_opengl_1k.png";
import roughnesGround from "../assets/ground/ice_0001_roughness_1k.jpg";
import * as THREE from "three";
import {loadTexture} from "./LoadTexture.js";

const ground = () => {
    const aoMap = loadTexture(aoGround)
    const colorMap = loadTexture(colorGround)
    const heightMap = loadTexture(heightGround)
    const normalMapOpenGL = loadTexture(normalGround)
    const roughnessMap = loadTexture(roughnesGround)
    const groundGeometry = new THREE.PlaneGeometry(4500, 4500);
    const groundMaterial = new THREE.MeshStandardMaterial({
        map: colorMap,
        aoMap: aoMap,
        displacementMap: heightMap,
        normalMap: normalMapOpenGL,
        roughnessMap: roughnessMap,
        roughness: 1,
        metalness: 0
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    return ground
};
export {ground}