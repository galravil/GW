import React, { useRef } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three'


extend({ OrbitControls });

const Controls = () => {
  const controlsRef = useRef()
  const { gl, camera } = useThree()
  // useRender(() => ref.current.update())
  useFrame(() => controlsRef.current && controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}

      enableRotate={true}
      screenSpacePanning={false}
      maxDistance={1000}
      minDistance={10}

      mouseButtons = {{
        "LEFT": THREE.MOUSE.PAN,
        "MIDDLE": THREE.MOUSE.ZOOM,
        "RIGHT": THREE.MOUSE.ROTATE
    }}
    />
  );
}

export default Controls;
