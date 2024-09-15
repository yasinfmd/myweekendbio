import * as THREE from "three";

const lights = () => {
    const ambientLight = new THREE.AmbientLight(0x404040, 50);
    return ambientLight;

}
export { lights };