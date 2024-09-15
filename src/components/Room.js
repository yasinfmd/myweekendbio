import * as THREE from 'three';
import youtube from '../assets/socials/youtube.jpg';
import linkedin from '../assets/socials/linkedin.png'
import udemy from '../assets/socials/udemy.png'
import github from '../assets/socials/github.png'
import aoPlaneMap from "../assets/plane/wood_0018_ao_4k.jpg";
import colorPlaneMap from "../assets/plane/wood_0018_color_4k.jpg";
import heightPlaneMap from "../assets/plane/wood_0018_height_4k.png";
import normalPlaneMap from "../assets/plane/wood_0018_normal_opengl_4k.png";
import roughnessPlaneMap from "../assets/plane/wood_0018_roughness_4k.jpg";
import { loadTexture } from "./LoadTexture.js";
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import {loadComputerModel} from "./Computer.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let camera,scene

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
    picture.userData = { id: id };
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

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (const intersect of intersects) {
        if (intersect.object.userData && intersect.object.userData.id) {
           window.open(intersect.object.userData.id, '_blank');
        }
    }
}

const aboutRoom = (_scene,_camera,orbitControls,renderer) => {
    camera=_camera
    scene=_scene
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

    const youtubePicture = createPicture({
        x:0, y:1.5, z:0.1,
    },'https://www.youtube.com/@webciyasin',youtube);
    const githubPicture = createPicture({
        x:0, y:0.5, z:0.1,
    },'https://github.com/yasinfmd/',github);
    const linkedinPicture = createPicture({
        x:2, y:1, z:0.1,
    },'https://www.linkedin.com/in/yasin-dalk%C4%B1l%C4%B1%C3%A7-251b7b151/',linkedin);
    const udemyPicture = createPicture({
        x:-2, y:1, z:0.1,
    },'',udemy);
    frontWall.add(youtubePicture);
    frontWall.add(linkedinPicture);
    frontWall.add(udemyPicture);
    frontWall.add(githubPicture);

    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    loadComputerModel()
        .then((model) => {
            model.position.set(0.20795361054967998,1.1134457411971554,-3.6961191012729984)
            model.rotateX(0)
            model.rotateY(-1.5406258210031156)
            model.rotateZ(0)
            roomGroup.add(model)
        })
        .catch((error) => {
            console.error('Error loading model:', error);
        });

    transformControls.addEventListener('mouseDown', function () {
        orbitControls.enabled = false; // Orbit controls devre dışı
    });

    transformControls.addEventListener('mouseUp', function () {
        orbitControls.enabled = true; // Orbit controls tekrar aktif
    });

    transformControls.addEventListener('change', () => {



    });
    window.addEventListener('click', onMouseClick);



    window.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'g': // Position mode (pozisyon değiştirme)
                transformControls.setMode('translate');
                break;
            case 'r': // Rotation mode (rotasyon değiştirme)
                transformControls.setMode('rotate');
                break;
            case 's': // Scale mode (ölçek değiştirme)
                transformControls.setMode('scale');
                break;
        }
    });


    return roomGroup;
}

export { aboutRoom };
