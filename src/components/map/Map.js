import React, { useState, useRef, useEffect, Fragment } from 'react'
import * as THREE from 'three';
import axios from 'axios'
// import Stats from "stats.js"
// import * as dat from 'dat.gui';
// import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { createSun, createOrbit, createPlanet, getSystemNameColor } from './utils'

import sunURL from '../../assets/texture/sun.jpg'


const Map = () => {
    const [galaxy, setGalaxy] = useState({
      "data": [],
      "connections": []
    })
   
    const mount = useRef(null)
    
    // const [isAnimating, setAnimating] = useState(true)
    // const controls = useRef(null)
  
    useEffect( () => {
      const getSolarSystems = async () => {
        const res = await axios.get('http://localhost:5000/api/galaxy')
        const data = res.data
        console.log(data.data)
        console.log(data.connections)
        setGalaxy(data)
      }
      getSolarSystems()
    }, [])


    useEffect(() => {
      // used for Raycasting 
      let planetsList = []
      let sunsList = []
      let labels = []

      let width = mount.current.clientWidth
      let height = mount.current.clientHeight
      let frameId
  
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
      camera.position.y = 100
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio( window.devicePixelRatio )
      renderer.setClearColor('#000000')
      renderer.setSize(width, height)
      
      const controls = new OrbitControls( camera, renderer.domElement );
      // TODO: uncommit in the future
      // controls.enableRotate = false // to disable rotation
      // controls.mouseButtons = {
      //     "LEFT": THREE.MOUSE.PAN,
      //     "MIDDLE": THREE.MOUSE.ZOOM,
      //     "RIGHT": THREE.MOUSE.ROTATE
      // }
      controls.minDistance = 10;
      controls.maxDistance = 200;


      // Lights
      var dirLight = new THREE.DirectionalLight( 0xffffff );
      dirLight.position.set( 1, 1, 1 );
      scene.add( dirLight );
  
      var dirLight2 = new THREE.DirectionalLight( 0x002288 );
      dirLight2.position.set( - 1, - 1, - 1 );
      scene.add( dirLight );
  
      var ambLight = new THREE.AmbientLight( 0x222222 );
      scene.add( ambLight );

      const solarSystems = galaxy.data
      solarSystems.forEach( (system, i) => {
        const x = system.attributes.x
        const y = system.attributes.y
        const z = system.attributes.z
        const systemName = system.attributes.name
        const systemOwner = system.attributes.currentOwner
        const id = system.id

        // Suns
        const sun = createSun({ radius:3, coordinates:[x,y,z], textureURL:sunURL })
        sun.userData = {id: id, type:'sun'}
        scene.add(sun)
        sunsList.push(sun)

        // Labels
        const labelContainerElem = document.querySelector('#labels')
        const elem = document.createElement('div')
        elem.textContent = systemName  // solar system
        const systemNameColor = getSystemNameColor(systemOwner) 
        elem.style.color = systemNameColor // use to set faction color
        labelContainerElem.appendChild(elem)
        labels.push(elem)
        
        const planets = system.planets
        planets.map( (planet, j) => {
          const orbit = planet.attributes.orbitLevel
          const radius = planet.attributes.size
          const id = planet.id

          // Orbits
          const planetOrbit = createOrbit({ orbit:orbit, coordinates:[x,y,z] })
          scene.add(planetOrbit)

          // Planets
          const planet_ = createPlanet({ 
            radius:radius, 
            coordinates:[x,y,z], 
            orbit:orbit, 
            // textureURL:planetURL2 
          })
          planet_.userData = { id: id, type:'planet', radius: radius }
          scene.add(planet_)
          planetsList.push(planet_)
        })

      })

      // System Connections
      const connections = galaxy.connections
      connections.forEach( (conn, i) => {
        console.log(conn)
        const x1 = conn[0].x
        const y1 = conn[0].y
        const x2 = conn[1].x
        const y2 = conn[1].y

        let material = new THREE.LineDashedMaterial( {
          color: 0x949494,
          linewidth: 1,
          scale: 3,
          dashSize: 5,
          gapSize: 5,
        });

        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x1, 0, y1) );  // x1, y1
        geometry.vertices.push(new THREE.Vector3( x2, 0, y2) );  // x2, y2
        // geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
        
        let line = new THREE.Line( geometry, material );
        line.computeLineDistances() 
        scene.add( line );
      })

      const tempV = new THREE.Vector3();
      
      const renderScene = () => {
        controls.update()
        // object picker
        pickHelper.pick(pickPosition, scene, camera);

        sunsList.map( (sun, i) => {
          // for Labels
          sun.updateWorldMatrix(true, false);
          sun.getWorldPosition(tempV);
          // get the normalized screen coordinate of that position
          // x and y will be in the -1 to +1 range with x = -1 being
          // on the left and y = -1 being on the bottom
          tempV.project(camera);
  
          // convert the normalized position to CSS coordinates
          const x = (tempV.x * 0.5 + 0.5) * mount.current.clientWidth;
          const y = (tempV.y * -0.5 + 0.5) * mount.current.clientHeight;
          // move the elem to that position
          labels[i].style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
        })
        
        renderer.render(scene, camera)
      }

      const handleResize = () => {
        width = mount.current.clientWidth
        height = mount.current.clientHeight
        renderer.setSize(width, height)
        // to prevent object deformation during page resizing
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderScene()
      }

      const animate = () => {
        renderScene()
        frameId = window.requestAnimationFrame(animate)
      }

      //---------------------------------
      class PickHelper {
        constructor() {
          this.raycaster = new THREE.Raycaster();
          this.pickedObject = null
          this.pickedObjectSavedColor = null
        }

        pick(normalizedPosition, scene, camera) {
          // restore the color if there is a picked object
          if (this.pickedObject) {
            // this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject.material.color.setHex(this.pickedObjectSavedColor);
            this.pickedObject = undefined;
          }
       
          // cast a ray through the frustum
          this.raycaster.setFromCamera(normalizedPosition, camera)
          // get the list of objects the ray intersected
          // const intersectedObjects = this.raycaster.intersectObjects(scene.children);
          const intersectedObjects = this.raycaster.intersectObjects(planetsList)

          if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object;
            // save its color
            // this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
            this.pickedObjectSavedColor = this.pickedObject.material.color.getHex()
            // set its color to green
            this.pickedObject.material.color.set(0x00FFFF)
            // console.log(this.pickedObject.userData)
          }
        }
      }

      const pickPosition = {x: 0, y: 0}
      const pickHelper = new PickHelper()
      clearPickPosition();

      function getCanvasRelativePosition(event) {
        const rect = mount.current.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }

      function setPickPosition(event) {
        const pos = getCanvasRelativePosition(event);
        pickPosition.x = (pos.x / width ) *  2 - 1;
        pickPosition.y = (pos.y / height) * -2 + 1;  // note we flip Y
      }

      function clearPickPosition() {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickPosition.x = -100000;
        pickPosition.y = -100000;
      }

      // --------------------------
  
      const start = () => {
        if (!frameId) {
          frameId = requestAnimationFrame(animate)
        }
      }
  
      const stop = () => {
        cancelAnimationFrame(frameId)
        frameId = null
      }
      
      mount.current.appendChild(renderer.domElement)
      window.addEventListener('resize', handleResize)
      // ----------------------
      window.addEventListener('mousemove', setPickPosition);
      // window.addEventListener('mousedown', setPickPosition);
      window.addEventListener('mouseout', clearPickPosition);
      window.addEventListener('mouseleave', clearPickPosition);

      start()

      return () => {
        stop()
        mount.current.removeChild(renderer.domElement)

        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', setPickPosition)
        window.removeEventListener('mouseout', clearPickPosition)
        window.removeEventListener('mouseleave', clearPickPosition)
        
        // TODO: remove other stuff
        // scene.remove(planetsList)
        // scene.remove(sunsList)
        // scene.remove(labels)
        // geometry.dispose()
        // material.dispose()
      
        const element  = document.getElementById("labels");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }, [galaxy])

    
    return (
      <Fragment>
         <div id="container" style={{position: 'relative'}}>
          <div className="vis"
            style={{ width: '100%', height: 'calc(100vh - 84px)' }}
            ref={mount}
          />
          <div id="labels">
            {/* labels are here */}
          </div>
        </div>
      </Fragment>
    )
  }


export default Map
