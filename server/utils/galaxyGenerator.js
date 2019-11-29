const uuid = require('uuid/v4')


const width = 200  // 1000
const height = 200  // 1000
const totalSolarSystems = 30  // 300
const averagePlanetsPerSolarSystem = 4 // 5
const planetCountMaxDeviation = 1

const minDistanceBetweenSystems = 30
const minNumberOfLinks = 3


class SolarSystem {
    constructor(x, y) {
        this.id = uuid()
        this.type = 'solarSystem'
        this.attributes = {
            x: x, 
            y: y, 
            z : 0,
            name: null,
            currentOwner: null
        }
        // this.x = x
        // this.y = y
        // this.z = 0
        this.connectedSystems = new Set()
        this.planets = []
    }

    getX() { return this.attributes.x }

    getY() { return this.attributes.y }

    getCoordinates() {
        return [this.attributes.x, this.attributes.y]
    }

    getConnectedSystems() {
        return this.connectedSystems
    }

    setConnectedSystem(system) {
        this.connectedSystems.add(system)
    }

    getFaction() {
        return this.faction
    }

    setPlanet(planet) {
        this.planets.push(planet)
    }
}


class Planet {
    constructor() {
        this.id = uuid()
        this.type = 'planet'
        this.attributes = {
            currentOwner: null,
            ground: null,
            name: null,
            orbitLevel: null,
            size: null
        }
        this.repaltionship
        this.map    
    }
}


class GalaxyGenerator {
    constructor() {
        this.solarSystems = Array()
        // this.connections = new Set()
        this.connections = new Set()

    }

    generate() {
        this.createSolarSystems()
        this.setUpLinks()
        this.createConnections()
        this.populateFactions()
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }

    getRandomInt2(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

    /**
    * @param {SolarSystem} systemA 
    * @param {SolarSystem} systemB 
    * @return {number}
    */
    getDistance(systemA, systemB) {
        // console.log(systemA, systemB)
        let x = systemA.getX() - systemB.getX()
        let y = systemA.getY() - systemB.getY()
        return Math.sqrt(x * x + y * y)
    }


    /**
     * @param {SolarSystem} origin 
     * @return {SolarSystem[]} sorted by getDistance()
     */
    getNeighborsSortedByDistance(origin) {
        let new_arr = Array()
        new_arr = this.solarSystems.filter(system => system != origin)
        new_arr.sort( (a, b) => {

            // console.log(this.getDistance(origin, a))
            // console.log(this.getDistance(origin, b))
            return this.getDistance(origin, a) - this.getDistance(origin, b)
        })
        return new_arr
    }


    /**
    * @param {SolarSystem} origin 
    * @return {null|SolarSystem}
    */
    getNearestNeighbor(origin) {
        let neighborsSortedByDistance = this.getNeighborsSortedByDistance(origin)
        if (neighborsSortedByDistance.length == 0) {
            return null
        }
        return neighborsSortedByDistance[0]
    }


    createSolarSystems() {
        let first = true

        for (let i = 0; i < totalSolarSystems; i++) {

            let x = this.getRandomInt(width)
            let y = this.getRandomInt(height)
        
            let system = new SolarSystem(x, y)

            const systemNames = [
                'Andromedae', 'Antilae', 'Orionis', 'Phoenicis', 'Kepler', 'Octanis', 'Volantis', 'Sigma'
            ]
            system.attributes.name = this.getRandomItem(systemNames)
            // TODO
            // system.id = i
        
            if (first === true) {
                this.solarSystems.push(system)
                first = false
            } else {
                let ok = true
                
                this.solarSystems.forEach( (element) => {
                    let distance = this.getDistance(system, element)
                    
                    if (distance <= minDistanceBetweenSystems ) {
                        // console.log('False')
                        ok = false 
                    }
                })
        
                if (ok === true) {
                    this.solarSystems.push(system)
                    // console.log(system.getCoordinates())
                }
            }

            

            // add planets
            let numberOfPlanets = this.getRandomInt2(
                averagePlanetsPerSolarSystem - planetCountMaxDeviation,
                averagePlanetsPerSolarSystem + planetCountMaxDeviation
            )
            
            for (let j = 0; j < numberOfPlanets; j++) {

                let planet = new Planet()
                planet.attributes.orbitLevel = this.getRandomInt2(10, 20)
                planet.attributes.size = this.getRandomInt2(1, 3)

                const groundTypes = ['water', 'soil', 'lava', 'desert', 'frost']
                planet.attributes.ground = this.getRandomItem(groundTypes)
                
                const planetNames = [
                    "Andromedae", 'Laplace', 'Phoenicis', "SSDS", "Tyson", "pi", "Omega"
                ]
                planet.attributes.name = this.getRandomItem(planetNames)
            
                // add to Solar system
                system.setPlanet(planet)
            }
        }
    }

    /**
    * @param {SolarSystem} system
    * @return {null}
    */
    setUpLinks() {
        for (const system of this.solarSystems) {
            this.createLinks(system)
        }
    }

    /**
     * @param {SolarSystem} origin 
     * @return {null}
     */
    createLinks(origin) {
        const neighbors = this.getNeighborsSortedByDistance(origin).slice(0, minNumberOfLinks)
        // console.log(neighbors)
      

        for (const neighbor of neighbors) {
            // console.log(neighbor)
            // origin.setConnectedSystem(neighbor.id)
            // neighbor.setConnectedSystem(origin.id)
            origin.setConnectedSystem(neighbor)
            neighbor.setConnectedSystem(origin)
        }
    }


    populateFactions() {
        const UEF = {x:[0, width/2], y:[0, height/2]} // bottom left
        const SERAPHIM = {x:[0, width/2], y:[height/2, height]}  // upper left
        const AEON = {x:[width/2, width], y:[height/2, height]} // upper right
        const CYBRAN = {x:[width/2, width], y:[0, height/2]}  // bottom right

        const uef = 'uef'
        const seraphim = 'seraphim'
        const aeon = 'aeon'
        const cybran = 'cybran'

        for (const system of this.solarSystems) {
            
            // [ 43, 54 ]
            let coor = system.getCoordinates()

            // x -> aeon or cybran
            if (coor[0] > width/2) {
                if (coor[1] > height/2) {
                    system.attributes.currentOwner = aeon
                } else {
                    system.attributes.currentOwner = cybran
                }
            // uef or seraphim
            } else {
                if (coor[1] >  width/2) {
                    system.attributes.currentOwner = seraphim
                } else {
                    system.attributes.currentOwner = uef
                }
            }
        }

        
    }


    createConnections(){
        // Use Set to prevent duplicates
        // { [[x1,y1],[x2,y2]], ....}

        for (const system of this.solarSystems) {
            // console.log(system)
            const originCoordinates = system.getCoordinates()
            // console.log(originCoordinates)
            const connectedSystems = system.getConnectedSystems()
            // console.log(connectedSystems)

            for (const connected of connectedSystems) {
                const connectedCoordinates = connected.getCoordinates()
                
                // console.log(originCoordinates, connectedCoordinates)
                this.connections.add(
                    [
                        {'x': originCoordinates[0], 'y': originCoordinates[1]}, 
                        {'x': connectedCoordinates[0], 'y': connectedCoordinates[1]}
                    ])
            }
        }

    }
}

// galaxy = new GalaxyGenerator()
// galaxy.generate()

// for (const system of galaxy.solarSystems) {
//     console.log('id: ', system.id)
//     console.log(system.getCoordinates())
//     console.log(system.getConnectedSystems())
//     console.log(system.faction)
//     console.log('---------------')
// }

// galaxy.getLinks()
// console.log(galaxy.connections)


// export { 
//     SolarSystem, 
//     GalaxyGenerator
// }

module.exports = GalaxyGenerator;
