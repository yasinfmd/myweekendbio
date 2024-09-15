import * as THREE from "three";

const camera = () => {
  return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
}
export {camera}