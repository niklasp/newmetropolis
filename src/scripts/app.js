import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from './jsm/controls/PointerLockControls.js';

import metropolisModel from '../static/new/untitled.glb';
import metropolisBin from '../static/scene.bin';
import '../static/bg.png';

let camera, scene, renderer;

init();
render();

function init() {

  const container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
  camera.position.set( - 1.8, 0.6, 200.7 );

  scene = new THREE.Scene();

  // model
  const loader = new GLTFLoader();
  loader.load( metropolisModel, function ( gltf ) {
    console.log( gltf );
    scene.add( gltf.scene );
    render();
  } );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild( renderer.domElement );

  const pmremGenerator = new THREE.PMREMGenerator( renderer );
  pmremGenerator.compileEquirectangularShader();

  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.addEventListener( 'change', render ); // use if there is no animation loop
  // controls.minDistance = 2;
  // controls.maxDistance = 10;
  // controls.target.set( 0, 0, - 0.2 );
  // controls.update();

  controls = new PointerLockControls( camera, document.body );

  const blocker = document.getElementById( 'blocker' );
  const instructions = document.getElementById( 'instructions' );

  instructions.addEventListener( 'click', function () {

    controls.lock();

  } );

  controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

  } );

  controls.addEventListener( 'unlock', function () {

    blocker.style.display = 'block';
    instructions.style.display = '';

  } );

  this.scene.add( controls.getObject() );

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

//

function render() {

  renderer.render( scene, camera );

}