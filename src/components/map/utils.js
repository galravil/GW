import * as THREE from 'three';

const uef_color = '#4F8DEC'
const aeon_color = '#18c91b'
const seraphim_color = '#d2cb20'
const cybran_color = '#d24420'


export const getSystemNameColor = (faction) =>{
  switch(faction) {
      case 'uef': return uef_color
      case 'cybran': return cybran_color
      case 'aeon': return aeon_color
      case 'seraphim': return seraphim_color
  }
}


// export function rand(min, max) {
//   if (max === undefined) {
//     max = min;
//     min = 0;
//   }
//   return min + (max - min) * Math.random();
// }

// export function randomColor() {
//   return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
// }


export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max + 1))
}

export function getRandomInt2(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}


export function createSun({radius, coordinates, textureURL}) {
  console.log('createSun')
  let [x, y] = coordinates

  const geometry = new THREE.SphereGeometry(radius, 32, 32)
  const texture	= new THREE.TextureLoader().load(textureURL)
  const material = new THREE.MeshPhongMaterial({
    map	: texture,
    // bumpMap	: texture,
    // bumpScale: 0.05,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = x
  mesh.position.z = y

  return mesh
}


export function createOrbit({ orbit, coordinates }) {
  // console.log('createOrbit')

  let [x, y] = coordinates

  const segments = 64
  const material = new THREE.LineBasicMaterial( { color: 0x3D4215 } )
  const geometry = new THREE.CircleGeometry( orbit, segments );

  // Remove center vertex
  geometry.vertices.shift();
  const circle = new THREE.LineLoop( geometry, material )
  circle.position.x = x
  circle.position.z = y

  circle.rotation.x = Math.PI / 2;
  return circle
}


export function createPlanet({ 
  radius, coordinates, orbit, 
  // textureURL 
}) {
  // console.log('createPlanet')

  let [x, y] = coordinates

  // will depend from a `ground` type [SOIL, ...]
  const randNumber = getRandomInt2(1, 34)

  const geometry	= new THREE.SphereGeometry(radius, 32, 32)
  const material	= new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(require(`../../assets/texture/planets/${randNumber}.png`)),
      // bumpMap		: new THREE.TextureLoader().load(require('./assets/sun.jpg')),
      // bumpMap		: new THREE.TextureLoader().load(require('./assets/earthbump1k.jpg')),
      // bumpScale	: 0.05,
      // specularMap	: new THREE.TextureLoader().load(require('./assets/earthspec1k.jpg')),
      // specular	: new THREE.Color('grey'),
  })

  const mesh = new THREE.Mesh(geometry, material)
  
  const angle = getRandomInt2(0, 360)
  
  mesh.position.x = x + orbit*Math.cos(angle);
  mesh.position.y = 0;
  mesh.position.z = y + orbit*Math.sin(angle);

  // mesh.updateMatrix();
  // mesh.matrixAutoUpdate = false;
  return mesh
}



