import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const controller = (cameraRef,ref) => {
    let controls;
    controls = new OrbitControls(cameraRef.current, ref.current)
 //   controls.maxDistance = 25
  //  controls.minDistance = 10
  //  controls.maxPolarAngle = Math.PI * 0.495;
  //  controls.minPolarAngle = Math.PI * 0.1;

    controls.addEventListener('change', () => {
      /*  if(cameraRef.current.position.y<0.20){
            cameraRef.current.position.set(-3,3,12)
            controls.target.set(0,0,0)
            controls.update();
            cameraRef.current.updateProjectionMatrix();
        }*/
    });
    controls.update()
    return controls;
}
export {controller}