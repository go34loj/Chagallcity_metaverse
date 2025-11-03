import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/DRACOLoader.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/PointerLockControls.js";


//setting up variables to use later
let objects = []; //an array of objects for raycasting
let landscape; //a variable for our scene
let playState = false; //a variable to check whether we are exploring the space or everything is on pause
let controls; //a variable for PointerLock controls
let introCard = document.getElementById("card"); //Menu 
let button = document.getElementById("button"); //start button in the menu
let loadingText = document.getElementById("loadingText"); //loading text in the menu
const loader = new GLTFLoader(); //initialising GLTFLoader to use later to load the 3d scene
const dracoLoader = new DRACOLoader(); //initialising DRACOLoader to load compressed geometry
dracoLoader.setDecoderPath( 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/js/libs/draco/' ); //setting up the import link for DRACOLoader
loader.setDRACOLoader( dracoLoader ); //"turning on" DRACOLoader
let raycasterNegY = new THREE.Raycaster(); //initialising raycasters to check collision with objects in the objects array
let raycasterPosY = new THREE.Raycaster(); //initialising raycasters to check collision with objects in the objects array
let raycasterNegZ = new THREE.Raycaster(); //initialising raycasters to check collision with objects in the objects array
let raycasterPosZ = new THREE.Raycaster(); //initialising raycasters to check collision with objects in the objects array
let raycasterNegX = new THREE.Raycaster(); //initialising raycasters to check collision with objects in the objects array
let raycasterPosX = new THREE.Raycaster(); //initialising raycasters to check collision with objects in the objects array
let mixer; //a mixer to use in case you have animated objects

//creating scene
const scene = new THREE.Scene(); //creating scene
scene.background = new THREE.Color("#021153"); //setting scene background color
scene.fog = new THREE.FogExp2(scene.background, 0.0125); //setting scene fog color and density
//camera setups
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 1, 5);//initial camera position X, Y, Z (Y is vertical)
const appCanvas = document.getElementById("appCanvas"); //getting the canvas element in HTML

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}; //setting sizes object with the data on the screen size
const renderer = new THREE.WebGLRenderer({
  canvas: appCanvas,
  antialias: true
}); //setting up renderer
renderer.setSize(sizes.width, sizes.height); //setting fullscreen size for the renderer
renderer.physicallyCorrectLights = true //"turning on" physically correct lights
renderer.outputEncoding = THREE.sRGBEncoding; //setting up the encoding
renderer.toneMapping = THREE.NoToneMapping; //setting up the toneMapping


// const bgloader = new THREE.CubeTextureLoader();
// let map = bgloader.load([
//         "https://cdn.glitch.com/fdafc1e7-4911-4e84-9698-d11db5fd214a%2Fdesert2_px.jpg?v=1629787989861",
//         "https://cdn.glitch.com/fdafc1e7-4911-4e84-9698-d11db5fd214a%2Fdesert2_nx.jpg?v=1629787990014",
//         "https://cdn.glitch.com/fdafc1e7-4911-4e84-9698-d11db5fd214a%2Fdesert2_py.jpg?v=1629787989475",
//         "https://cdn.glitch.com/fdafc1e7-4911-4e84-9698-d11db5fd214a%2Fdesert2_ny.jpg?v=1629787990307",
//         "https://cdn.glitch.com/fdafc1e7-4911-4e84-9698-d11db5fd214a%2Fdesert2_pz.jpg?v=1629787989987",
//         "https://cdn.glitch.com/fdafc1e7-4911-4e84-9698-d11db5fd214a%2Fdesert2_nz.jpg?v=1629787989953"
//       ]);

     // scene.environment = map;


//setup first person view controls
controls = new PointerLockControls(camera, document.body);
    
    button.addEventListener("click", () => {
      controls.lock(); //start using controls
      introCard.style.display = "none"; //hiding the Menu
      playState = true; //setting the game mode to true
    });
    controls.addEventListener("unlock", () => {
      introCard.style.display = "flex"; //showing the Menu
      playState = false; //setting the game mode to false
    });

//lights
const skyLight = new THREE.HemisphereLight("#adbcff", "#6369a3", 5); //setting up the ambient light in the scene
scene.add(skyLight); //adding the light to the scene

//point lights
let pointlight = new THREE.PointLight("#f551c9", 550, 500) //setting up the pointlight
pointlight.position.set(70,40,-70) //setting up the pointlight position
scene.add(pointlight) //adding light to the scene

let pointlight1 = new THREE.PointLight("#0000ff", 25, 20) //setting up the pointlight
pointlight1.position.set(0,1,0) //setting up the pointlight position
scene.add(pointlight1) //adding light to the scene

//Update render on resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  
});


//function to load scene
function load(){
loader.load(
    "https://cdn.glitch.global/02b5e774-d3d1-403d-9cdd-bb5c3d9b6304/materials.glb?v=1656875448618", //3d model url, CHANGE THIS URL to load your model
    function(gltf) {
      landscape = gltf.scene;
      
	    // mixer = new THREE.AnimationMixer(landscape); //setting up the mixer
	    // let action = mixer.clipAction( gltf.animations[ 0 ] ); //finding the animation in the imported scene
	    // action.play(); //playing the animation
      
      gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            child.material.roughness = 0.75 
            if(child.name == "shards001"){
              child.material.color = new THREE.Color("blue")
            }
            if(child.name == "Landscape"){
              child.material.color = new THREE.Color("black")
              child.material.roughness = 0.75
            }
            
            
            objects.push(child); //adding objects to the objects array to calculate collisions 
          }
        });
      scene.add(landscape); //adding our 3d scene to the threejs scene
    },

  function ( xhr ) {

		loadingText.innerHTML =  ( Math.round(xhr.loaded / xhr.total * 100) ) + '% loaded' ; //checking the loading progress and showing it in the menu

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' ); //throwing up an error message in case something happens during the loading

	});
}

//loading scene
load();


let speed = 0; //setting up a speed variable for movement
  let velocity = 0; //setting up a velocity variable for jumping
  let gravity = 0.0055; //setting up gravity for jumping
  let jumpState = false; //setting up a state to check if are jumping at the moment or not

let moveRight = false; //setting up a state to check if are moving right at the moment or not
  let moveLeft = false; //setting up a state to check if are moving left at the moment or not
  let moveForward = false; //setting up a state to check if are moving forward at the moment or not
  let moveBack = false; //setting up a state to check if are moving back at the moment or not

//checking if the key is being pressed and changing the movement states
  function handleKeydown(event) { 
    switch (event.code) {
      case "ArrowDown":
      case "KeyS":
        moveBack = true;
        break;

      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case " ":
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  }

//checking if the key is released and changing the movement states
  function handleKeyup(event) {
    switch (event.code) {
      case "ArrowDown":
      case "KeyS":
        moveBack = false;
        break;

      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        speed = 0;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
      case "Space":
        if (!jumpState) {
          velocity = 0.1;
          jumpState = true;
        }
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  }


//setting up movements  
function move(delta) {
    
    raycast();
    if (negYDistance < 1.7 && objectBelowIsVisible) {
      camera.position.y = posNegY + 0.5;
    }

    if (negZDistance > 1) {
      if (moveForward) {
        speed += 0.001;
        if (speed > 0.005) {
          speed = 0.05;
        }
        if (!jumpState) {
          speed = 0.0025;
          controls.moveForward(speed * delta);
        }
        if (jumpState) {
          speed = 0.001;
          controls.moveForward(speed * delta);
        }
      }
    } else {
      speed = 0;
    }

    if (posZDistance > 1) {
      if (moveBack) {
        speed = 0.0025;
        controls.moveForward(-speed * delta);
      }
    } else {
      speed = 0;
    }

    if (posXDistance > 1) {
      if (moveRight) {
        speed = 0.0025;
        controls.moveRight(speed * delta);
      }
    } else {
      speed = 0;
    }

    if (negXDistance > 1) {
      if (moveLeft) {
        speed = 0.0025;
        controls.moveRight(-speed * delta);
      }
    } else {
      speed = 0;
    }

    velocity -= gravity;
    if (velocity < -0.1 || (posYDistance < 0.25 && objectAboveIsVisible)) {
      velocity = -0.1;
      jumpState = false;
    }
    camera.position.y += velocity * 3;
  }
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

  let posX = 0,
    posNegY = 0,
    posPosY = 0,
    posZ = 0;


//setting up variables for raycasting to check collisions
  let objectBelowIsVisible = true;
  let objectAboveIsVisible = true;
  let negYVector = new THREE.Vector3(0, -1, 0);
  let posYVector = new THREE.Vector3(0, 1, 0);
  let negZVector = new THREE.Vector3(0, 0, -1);
  let posZVector = new THREE.Vector3(0, 0, 1);
  let negXVector = new THREE.Vector3(-1, 0, 0);
  let posXVector = new THREE.Vector3(1, 0, 0);
  let negYDistance;
  let posYDistance;
  let negZDistance;
  let posZDistance;
  let negXDistance;
  let posXDistance;
  let intersectsNegY;
  let intersectsPosY;
  let intersectsNegZ;
  let intersectsPosZ;
  let intersectsNegX;
  let intersectsPosX;

//a funciton for raycasting 
  function raycast() {
    raycasterNegY.set(
      new THREE.Vector3(
        camera.position.x,
        camera.position.y + 0.5,
        camera.position.z
      ),
      negYVector.normalize()
    );
    intersectsNegY = raycasterNegY.intersectObjects(objects);

    if (intersectsNegY.length > 0) {
      posX = Math.round(intersectsNegY[0].point.x);
      posNegY = Math.round(intersectsNegY[0].point.y) + 0.5;
      posZ = Math.round(intersectsNegY[0].point.z);

      negYDistance = intersectsNegY[0].distance;
      objectBelowIsVisible = intersectsNegY[0].object.visible;
    } else {
      // document.body.style.cursor = "default";
    }

    let currentPosition = new THREE.Vector3(
      camera.position.x,
      camera.position.y + 0.5,
      camera.position.z
    );

    posYVector = new THREE.Vector3(0, 1, 0);
    raycasterPosY.set(currentPosition, posYVector);
    intersectsPosY = raycasterPosY.intersectObjects(objects);
    if (intersectsPosY.length > 0) {
      posYDistance = intersectsPosY[0].distance;
      posPosY = intersectsPosY[0].point.y;

      objectAboveIsVisible = intersectsPosY[0].object.visible;
    } else {
    }

    negZVector = new THREE.Vector3(0, 0, -1);
    negZVector.applyQuaternion(camera.quaternion);
    raycasterNegZ.set(currentPosition, negZVector);
    intersectsNegZ = raycasterNegZ.intersectObjects(objects);
    if (intersectsNegZ.length > 0) {
      negZDistance = intersectsNegZ[0].distance;
    } else {
    }

    posZVector = new THREE.Vector3(0, 0, 1);
    posZVector.applyQuaternion(camera.quaternion);
    raycasterPosZ.set(currentPosition, posZVector);
    intersectsPosZ = raycasterPosZ.intersectObjects(objects);
    if (intersectsPosZ.length > 0) {
      posZDistance = intersectsPosZ[0].distance;
    } else {
    }

    negXVector = new THREE.Vector3(-1, 0, 0);
    negXVector.applyQuaternion(camera.quaternion);
    raycasterNegX.set(currentPosition, negXVector);
    intersectsNegX = raycasterNegX.intersectObjects(objects);
    if (intersectsNegX.length > 0) {
      negXDistance = intersectsNegX[0].distance;
    } else {
    }

    posXVector = new THREE.Vector3(1, 0, 0);
    posXVector.applyQuaternion(camera.quaternion);
    raycasterPosX.set(currentPosition, posXVector);
    intersectsPosX = raycasterPosX.intersectObjects(objects);
    if (intersectsPosX.length > 0) {
      posXDistance = intersectsPosX[0].distance;
    } else {
    }
    
  }


// Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 1500; //number of particles in the scene

  let positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)

  for (
    let i = 0;
    i < count * 3;
    i += 3 // Multiply by 3 for same reason
  ) {
    let num = Math.random();
    positions[i] = Math.cos(num * 360) * 100 * (Math.random()-0.5); // Math.random() - 0.5 to have a random value between -0.5 and +0.5. It's just an expression to setup the random position. It can be different
    positions[i + 1] = num * 20; //It's just an expression to setup the random position. It can be different
    positions[i + 2] = Math.sin(num * 360) * 100 * (Math.random()-0.5); //It's just an expression to setup the random position. It can be different
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  ); // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
  const particlesMaterial = new THREE.PointsMaterial({
    color: "#7f97ff" //color of the particles
  });
  particlesMaterial.size = 0.1; //size of the particles
  particlesMaterial.sizeAttenuation = true; //make particles smaller in the distance
  particlesMaterial.transparent = true; //turn on transparency in the particles material
  particlesMaterial.blending = THREE.AdditiveBlending; //turning blending options, like semi-transparency

  // creating particles and adding to the scene
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particles.position.set(0, 0, 0);
  scene.add(particles);

//function to update particles position to make them move
  function updateParticles() {
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] += Math.sin(positions[i + 1]) * 0.01;
      positions[i + 1] += 0.02;
      positions[i + 2] += Math.cos(positions[i + 1]) * 0.01;

      if (positions[i + 1] > 20) {
        positions[i + 1] = 0;
      }
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }

let delta; //a variable to use for smooth animation
let time = Date.now(); //get current time


function animate() {
  const currentTime = Date.now(); //get current time one more time
  const delta = currentTime - time; //check the difference between two times
  time = currentTime; //reset time variable
  
  //request animation
  requestAnimationFrame(animate);
  
  //mixer.update()

  //if we are in a game mode - move the player and move the particles
  if(playState){  
    move(delta);
    updateParticles();
  }
  
  //render scene
  renderer.render(scene, camera);
}
//run animate function
animate();