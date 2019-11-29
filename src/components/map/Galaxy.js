import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useFrame } from 'react-three-fiber'
import axios from 'axios'

import Sun from './Sun'
import Planet from './Planet'
import Link from './Link'

import sunTextureURL from '../../assets/texture/sun.jpg'
import planetTextureURL from '../../assets/texture/planets/1.png'

const Galaxy = () => {
  console.log('Galaxy render')

  const [ suns, setSuns] = useState([])   // eslint-disable-line
  const [ planets, setPlanets] = useState([])   // eslint-disable-line

  useEffect(() => {
    getData()
  }, [setSuns, setPlanets])


  const getData = async () => {
    const res = await axios.get('http://localhost:5000/api/galaxy')
    const data = res.data.data
 
    let sunsArr = Array()
    let planetsArr = Array()

    data.forEach(obj => {
      sunsArr.push([
        obj.attributes.x,
        obj.attributes.y,
        obj.attributes.z
      ])
      // console.log(obj.planets)
      obj.planets.forEach( planet => {
        planetsArr.push([
          [obj.attributes.x,
            obj.attributes.y,
            obj.attributes.z],
          planet.attributes.orbitLevel
        ])
      })
 
    })

    // console.log(planetsArr)
    setSuns(sunsArr)
    setPlanets(planetsArr)
  }

  const refSun1 = useRef()
  const refPlanet = useRef()
  const linkRef = useRef()
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

  return (
    <Fragment>

    <Link position={[1, 1, 1]} setRef={linkRef}/>

    {/* <mesh
      // ref={setRef}
      position={[0, 0, 0]}
      // onClick={() => getData()}
    >
      <sphereGeometry attach='geometry' args={[5, 32, 32]} />
      <meshPhongMaterial 
        attach='material'
        color={ "red" }
      />
    </mesh> */}

      {suns.map( (pos, i) => {
        const idx = i
        return (
          <Sun key={idx} size={4} position={[pos[0], pos[1], pos[2]]} textureURL={sunTextureURL} setRef={refSun1}/>
        )
      })}

      {planets.map( (pos, i) => {
        const idx = i
        return (
          <Planet key={idx} size={2} centerOfSystem={[pos[0][0], pos[0][1], pos[0][2]]} orbit={pos[1]} textureURL={planetTextureURL} setRef={refPlanet}/>
        )
      })}

      {/* <Planet size={1.5} centerOfSystem={[0, 0, 0]} orbit={8} textureURL={planetTextureURL} setRef={refPlanet}/>
      <Planet size={2} centerOfSystem={[0, 0, 0]} orbit={10} textureURL={planetTextureURL} setRef={refPlanet}/>
      <Planet size={3} centerOfSystem={[0, 0, 0]} orbit={12} textureURL={planetTextureURL} setRef={refPlanet}/> */}

    </Fragment>
  )
}


export default Galaxy
