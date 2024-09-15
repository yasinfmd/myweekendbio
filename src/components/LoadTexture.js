import * as THREE from "three";

const loadTexture = (textureItem) => {
    const texture = new THREE.TextureLoader().load(textureItem);
    return texture;
}
export { loadTexture };