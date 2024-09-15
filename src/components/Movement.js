import {gsap} from "gsap";

const movement = (cameraRef,controlsRef,positionCopy,target,cb) => {
    gsap.to(cameraRef.current.position, {
        duration: 2,
        x: target.x,
        y: target.y + 2,
        z: target.z + 4,
        ease: "power2.inOut",
        onUpdate: function () {
            cameraRef.current.updateProjectionMatrix();
            controlsRef.current.target.copy(positionCopy);
        },
        onComplete: function () {
            if(cb){
                cb()
            }
        },
    });

};
export {movement}