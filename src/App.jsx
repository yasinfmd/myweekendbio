import {useEffect, useRef, useState} from 'react'
import * as THREE from 'three';
import {gsap} from "gsap";
import {aboutRoom} from "./components/Room.js";
import {ground} from "./components/Ground.js";
import {controller} from "./components/Controller.js";
import {SkyBox} from "./components/Sky.js";
import {loadSnowMan} from "./components/SnowMan.js";
import loadWinterHouse from "./components/House.js";
import {technologiesRoom} from "./components/TechnologiesRoom.js";
import {movement} from "./components/Movement.js";
import {lights} from "./components/Lights.js";
import {camera} from "./components/Camera.js";
import Loading from "./components/Loading.jsx";

let mixer;
const clock = new THREE.Clock();
let snowflakes
let socialRoomGroupRef, technologiesRoomGroupRef;


function App() {
    const ref = useRef()
    let sceneRef = useRef()
    let cameraRef = useRef()
    let rendererRef = useRef()
    let controlsRef = useRef()
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [key, setKey] = useState(0);

    const [activeState,setActiveState]=useState(0)
    const states=3
    const render = () => {
        requestAnimationFrame(render);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        snowflakes.forEach(snowflake => {
            snowflake.position.y -= 0.1;
            if (snowflake.position.y < -50) {
                snowflake.position.y = 50;
            }
        });
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        controlsRef.current.update()
    }
    const moveToInitial=()=>{
        const targetPosition = new THREE.Vector3(-5, 3, 12);
        movement(cameraRef, controlsRef, socialRoomGroupRef.position, targetPosition, () => {
            gsap.to(controlsRef.current.target, {
                duration: 2,
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                ease: "power2.inOut",
                onUpdate: function () {
                },
                onComplete: function () {
                    cameraRef.current.updateProjectionMatrix();
                    cameraRef.current.lookAt(targetPosition);

                },
            });
        })
    }
    const setCamera = () => {
        cameraRef.current = camera()
        cameraRef.current.position.z = 12;
        cameraRef.current.position.y = 3;
        cameraRef.current.position.x = -5;

    }
    const createScene = () => {
        sceneRef.current = new THREE.Scene();
    }
    const moveToSocialsRoom = () => {
        const targetPosition = new THREE.Vector3(-20, 1, -36);
        const controlTargetPosition = new THREE.Vector3(-20, 2, -36);
        movement(cameraRef, controlsRef, socialRoomGroupRef.position, targetPosition, () => {
            gsap.to(controlsRef.current.target, {
                duration: 2,
                x: controlTargetPosition.x,
                y: controlTargetPosition.y + 0.5,
                z: -42,
                ease: "power2.inOut",
                onUpdate: function () {
                },
                onComplete: function () {
                    cameraRef.current.updateProjectionMatrix();

                },
            });
        })


    };

    const moveToTechnologiesRoom = () => {
        const targetPosition = new THREE.Vector3(40, 1, -36);
        const controlTargetPosition = new THREE.Vector3(40, 2, -36);
        movement(cameraRef, controlsRef, technologiesRoomGroupRef.position, targetPosition, () => {
            gsap.to(controlsRef.current.target, {
                duration: 2,
                x: controlTargetPosition.x,
                y: controlTargetPosition.y + 1,
                z: -50,
                ease: "power2.inOut",
                onUpdate: function () {
                },
                onComplete: function () {
                    cameraRef.current.updateProjectionMatrix();

                },
            });
        })
    };

    const createLights = () => {
        sceneRef.current.add(lights());
    }
    const setRendererSize = () => {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
    const setRendererConfig = () => {
    }
    const createRenderer = () => {
        rendererRef.current = new THREE.WebGLRenderer({canvas: ref.current});
        setRendererSize()
    }

    const createSnowMan = () => {
        loadSnowMan()
            .then((snowman) => {
                sceneRef.current.add(snowman);


            })
            .catch((error) => {
                console.error('Error loading snowman model:', error);
            });
    }


    const createHouse = () => {
        loadWinterHouse()
            .then(({scene, animationMixer}) => {
                mixer = animationMixer
                sceneRef.current.add(scene);


            })
            .catch((error) => {
                console.error('Error loading winter house model:', error);
            });
    }
    const createComputer = () => {


    }
    const createSkyDome = () => {
        sceneRef.current.add(SkyBox(rendererRef));
    };

    const createGround = () => {
        const groundPlane = ground()
        sceneRef.current.add(groundPlane);
    };


    const createParticles = () => {
        const snowflakeCount = 500;
        snowflakes = [];
        const snowflakeRadius = 0.2;

        for (let i = 0; i < snowflakeCount; i++) {
            const snowflakeGeometry = new THREE.SphereGeometry(snowflakeRadius, 8, 8);
            const snowflakeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
            const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
            let x, y, z;
            do {
                x = (Math.random() * 2 - 1) * 500;
                y = (Math.random() * 2 - 1) * 500;
                z = (Math.random() * 2 - 1) * 500;
            } while (x * x + y * y + z * z > 500 * 500);
            snowflake.position.set(x, y, z);
            snowflakes.push(snowflake);
            sceneRef.current.add(snowflake);
        }
    }

    const createSocialsRoom = () => {
        socialRoomGroupRef = aboutRoom(sceneRef.current, cameraRef.current, controlsRef.current, rendererRef.current);
        socialRoomGroupRef.position.set(-20, 0, -36)
        sceneRef.current.add(socialRoomGroupRef);



    };

    const createTechnologiesRoom = () => {
        technologiesRoomGroupRef = technologiesRoom(sceneRef.current, cameraRef.current, controlsRef.current, rendererRef.current);
        technologiesRoomGroupRef.position.set(40, 0, -36)
        sceneRef.current.add(technologiesRoomGroupRef);


    };




    const createController = () => {
        controlsRef.current = controller(cameraRef, ref)

    }

    const init = () => {
        createScene()
        createLights()
        setCamera()
        createRenderer()
        setRendererConfig()
        createHouse()


        createSkyDome();
        createGround();
        createParticles()
        createSocialsRoom()
        createTechnologiesRoom()
        createSnowMan()
        createComputer()
        createController()
        render()
        setTimeout(()=>{
            setIsLoadingComplete(true);
        },1000*10)

    }


    useEffect(() => {
        window.addEventListener('resize', () => {
            setRendererSize()
        })
    }, [])

    useEffect(() => {
        if (ref.current) {
            init()
        }
    }, [ref])
    const handleClick=()=>{
        const next=activeState+1
        if(next<states){
            setActiveState(next)
            if(next===1){
                moveToSocialsRoom()
                setKey((prevState)=>prevState+1)
            }
            if(next===2){
                moveToTechnologiesRoom()
                setKey((prevState)=>prevState+1)
            }
        }else{
            setKey((prevState)=>prevState+1)
            setActiveState(0)
            moveToInitial()
        }
    }

    return (
        <>

            {isLoadingComplete===false && <Loading /> }
            <div className='canvas-wrapper'>
                {isLoadingComplete && <div className="container"  key={key}>
                    <div className="typewriter">
                        <p>
                            {activeState===0&&'Hi, My name is Yasin Dalkılıç , If you want to learn about me , go to about my socials '}
                            {activeState===1&&'Now you are in my social section, you can browse the relevant channels by clicking on the pictures on the wall or go to the technologies section.'}
                            {activeState===2&&'Now you are in my tech stack section, you can browse my tech stack or you can go first section.'}

                            <b className='go-text' onClick={handleClick}>click here to go</b></p>
                    </div>
                </div>}

                <canvas ref={ref} width={window.innerWidth} height={window.innerHeight}/>
            </div>
        </>
    )
}

export default App