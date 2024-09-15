import {Sky} from "three/addons/objects/Sky.js";
import * as THREE from "three";

const SkyBox=(rendererRef)=>{
    const sky = new Sky();
    sky.scale.setScalar(450000);

    const sun = new THREE.Vector3();
    const effectController = {
        turbidity: 10,
        rayleigh: 0.067,
        mieCoefficient: 0,
        mieDirectionalG: 0.7,
        elevation: 6,
        azimuth: -160,
        exposure: 1
    };
    const uniforms = sky.material.uniforms;
    uniforms['turbidity'].value = effectController.turbidity;
    uniforms['rayleigh'].value = effectController.rayleigh;
    uniforms['mieCoefficient'].value = effectController.mieCoefficient;
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    rendererRef.current.toneMappingExposure = effectController.exposure;
    return sky
}
export {SkyBox}