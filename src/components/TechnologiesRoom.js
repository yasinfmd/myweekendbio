import * as THREE from 'three';
import flutter from '../assets/techs/flutter.png'
import nodejs from '../assets/techs/node.jpg'
import js from '../assets/techs/js.png'
import vue from '../assets/techs/vue.jpg'
import react from '../assets/techs/react.png'
import reactnative from '../assets/techs/reactnative.png'
import electron from '../assets/techs/electronjs.png'
import svelte from '../assets/techs/svelte.jpg'
import spring from '../assets/techs/spring.jpg'
import aoPlaneMap from "../assets/plane/wood_0018_ao_4k.jpg";
import colorPlaneMap from "../assets/plane/wood_0018_color_4k.jpg";
import heightPlaneMap from "../assets/plane/wood_0018_height_4k.png";
import normalPlaneMap from "../assets/plane/wood_0018_normal_opengl_4k.png";
import roughnessPlaneMap from "../assets/plane/wood_0018_roughness_4k.jpg";
import { loadTexture } from "./LoadTexture.js";



const createPicture = (pos,id,image) => {
    const pictureGeometry = new THREE.PlaneGeometry(1.8, 0.8);

    const pictureMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(image),
        side: THREE.DoubleSide
    });


    pictureMaterial.map.wrapS = THREE.RepeatWrapping;
    pictureMaterial.map.repeat.x = -1

    const picture = new THREE.Mesh(pictureGeometry, pictureMaterial);
    picture.position.set(pos.x,pos.y,pos.z);
    picture.rotation.y = Math.PI;
    return picture;
}

const createFloor = () => {
    const aoMap = loadTexture(aoPlaneMap);
    const colorMap = loadTexture(colorPlaneMap);
    const heightMap = loadTexture(heightPlaneMap);
    const normalMapOpenGL = loadTexture(normalPlaneMap);
    const roughnessMap = loadTexture(roughnessPlaneMap);
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: colorMap,
        aoMap: aoMap,
        displacementMap: heightMap,
        normalMap: normalMapOpenGL,
        roughnessMap: roughnessMap,
        roughness: 1,
        metalness: 0
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotateX(Math.PI / 2);
    floor.position.set(0, 0.5, 0);
    return floor;
}


const technologiesRoom = () => {
    const roomGroup = new THREE.Group();
    const floor = createFloor();
    roomGroup.add(floor);

    const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
    const wallMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0xF0F0F0,
    });

    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(0, 2.5, -5);
    roomGroup.add(frontWall);

    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 2.5, 5);
    roomGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 10), wallMaterial);
    leftWall.position.set(-5, 2.5, 0);
    roomGroup.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 10), wallMaterial);
    rightWall.position.set(5, 2.5, 0);
    roomGroup.add(rightWall);


    const reactPicture = createPicture({
        x:-3, y:1.8, z:0.1,
    },'https://www.youtube.com/@webciyasin',react);
    const reactNativePicture = createPicture({
        x:-3, y:0.6, z:0.1,
    },'https://github.com/yasinfmd/',reactnative);
    const springPicture = createPicture({
        x:-3, y:-0.6, z:0.1,
    },'https://www.linkedin.com/in/yasin-dalk%C4%B1l%C4%B1%C3%A7-251b7b151/',spring);
    const nodePicture = createPicture({
        x:-1, y:1.8, z:0.1,
    },'',nodejs);

    const jsPicture = createPicture({
        x:-1, y:0.6, z:0.1,
    },'',js);
    const vuePicture = createPicture({
        x:-1, y:-0.6, z:0.1,
    },'',vue);

    const flutterPicture = createPicture({
        x:1, y:1.8, z:0.1,
    },'',flutter);
    const sveltePicture = createPicture({
        x:1, y:0.6, z:0.1,
    },'',svelte);

    const electronPicture = createPicture({
        x:1, y:-0.6, z:0.1,
    },'',electron);
    frontWall.add(reactPicture);
    frontWall.add(springPicture);
    frontWall.add(nodePicture);
    frontWall.add(reactNativePicture);
    frontWall.add(jsPicture);
    frontWall.add(vuePicture);
    frontWall.add(flutterPicture);
    frontWall.add(sveltePicture);
    frontWall.add(electronPicture);










    return roomGroup;
}

export { technologiesRoom };
