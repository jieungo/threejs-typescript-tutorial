// import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// const scene = new THREE.Scene();
// const scene2 = new THREE.Scene();

// scene.background = new THREE.Color(0x4488ff);

// const camera1 = new THREE.PerspectiveCamera(
//     75,
//     // window.innerWidth / window.innerHeight,
//     1, // 200/200 == 1
//     .1,
//     10
// )
// const camera2 = new THREE.OrthographicCamera(-1,1,1,-1, .1, 10)
// const camera3 = new THREE.OrthographicCamera(-1,1,1,-1, .1, 10)
// const camera4 = new THREE.OrthographicCamera(-1,1,1,-1, .1, 10)

// camera1.position.z = 2
// camera2.position.y = 1
// camera2.lookAt(new THREE.Vector3()) //위에서 아래로. 디폴트는 0 0 0
// camera3.position.z = 1
// camera3.lookAt(new THREE.Vector3(0,0,0)) //오른쪽부터
// camera4.position.x = 1
// camera4.lookAt(new THREE.Vector3(0,0,0)) //앞부터

// const canvas1 = document.getElementById('c1') as HTMLCanvasElement
// const canvas2 = document.getElementById('c2') as HTMLCanvasElement
// const canvas3 = document.getElementById('c3') as HTMLCanvasElement
// const canvas4 = document.getElementById('c4') as HTMLCanvasElement

// const renderer1 = new THREE.WebGLRenderer({canvas:canvas1})
// renderer1.setSize(200,200)
// const renderer2 = new THREE.WebGLRenderer({canvas:canvas2})
// renderer2.setSize(200,200)
// const renderer3 = new THREE.WebGLRenderer({canvas:canvas3})
// renderer3.setSize(200,200)
// const renderer4 = new THREE.WebGLRenderer({canvas:canvas4})
// renderer4.setSize(200,200)

// // const renderer = new THREE.WebGLRenderer() //다양한 renderer가 존재하지만 webgl이 가장 빠르며 대부분 서포트 해준다 (가장 기본)
// // renderer.setSize(window.innerWidth, window.innerHeight) // innerWidth대신 200으로 바꾼다면? camera와 밑의 resize에서도 변경해줘야 200의 크기가 제대로 유지된다
// // document.body.appendChild(renderer.domElement) //html에 다이나믹하게 캔버스를 자동으로 그려준다

// new OrbitControls(camera1, renderer1.domElement)

// const geometry = new THREE.TorusKnotGeometry() //THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })

// const cube = new THREE.Mesh(geometry, material)
// cube.scale.x = .5
// cube.scale.y = .5
// cube.scale.z = .5
// scene.add(cube)

// const cube2 = new THREE.Mesh(geometry, material)
// scene2.add(cube2)

// // window.addEventListener('resize', onWindowResize, false)
// // function onWindowResize() {
// //     camera.aspect = window.innerWidth / window.innerHeight
// //     camera.updateProjectionMatrix()
// //     renderer.setSize(window.innerWidth, window.innerHeight)
// //     render()
// // }

// function animate() {
//     requestAnimationFrame(animate)

//     cube.rotation.x += 0.01
//     cube.rotation.y += 0.01
    
//     cube2.rotation.y += 0.01
//     render()
// }

// function render() {
//     renderer1.render(scene, camera1)
//     renderer2.render(scene, camera2)
//     renderer3.render(scene, camera3)
//     renderer4.render(scene, camera4)
// }

// animate()


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.x = -2
camera.position.y = 4
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const boxGeometry = new THREE.BoxGeometry()
// const sphereGeometry = new THREE.SphereGeometry()
// const icosahedronGeometry = new THREE.IcosahedronGeometry()

//console.log(boxGeometry)

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(boxGeometry, material)
//cube.position.x = 5
scene.add(cube)

// const sphere = new THREE.Mesh(sphereGeometry, material)
// sphere.position.x = -5
// scene.add(sphere)

// const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
// scene.add(icosahedron)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01)
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10)
cubePositionFolder.add(cube.position, 'y', -10, 10)
cubePositionFolder.add(cube.position, 'z', -10, 10)
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5, 0.1) //.onFinishChange(() => console.dir(cube.geometry))
cubeScaleFolder.add(cube.scale, 'y', -5, 5, 0.1)
cubeScaleFolder.add(cube.scale, 'z', -5, 5, 0.1)
cubeFolder.add(cube, 'visible', true)
cubeFolder.open()

// const cubeData = {
//     width: 1,
//     height: 1,
//     depth: 1,
//     widthSegments: 1,
//     heightSegments: 1,
//     depthSegments: 1,
// }
// const cubePropertiesFolder = cubeFolder.addFolder('Properties')
// cubePropertiesFolder
//     .add(cubeData, 'width', 1, 30)
//     .onChange(regenerateBoxGeometry)
//     .onFinishChange(() => console.dir(cube.geometry))
// cubePropertiesFolder.add(cubeData, 'height', 1, 30).onChange(regenerateBoxGeometry)
// cubePropertiesFolder.add(cubeData, 'depth', 1, 30).onChange(regenerateBoxGeometry)
// cubePropertiesFolder.add(cubeData, 'widthSegments', 1, 30).onChange(regenerateBoxGeometry)
// cubePropertiesFolder.add(cubeData, 'heightSegments', 1, 30).onChange(regenerateBoxGeometry)
// cubePropertiesFolder.add(cubeData, 'depthSegments', 1, 30).onChange(regenerateBoxGeometry)

// function regenerateBoxGeometry() {
//     const newGeometry = new THREE.BoxGeometry(
//         cubeData.width,
//         cubeData.height,
//         cubeData.depth,
//         cubeData.widthSegments,
//         cubeData.heightSegments,
//         cubeData.depthSegments
//     )
//     cube.geometry.dispose()
//     cube.geometry = newGeometry
// }

// const sphereData = {
//     radius: 1,
//     widthSegments: 8,
//     heightSegments: 6,
//     phiStart: 0,
//     phiLength: Math.PI * 2,
//     thetaStart: 0,
//     thetaLength: Math.PI,
// }
// const sphereFolder = gui.addFolder('Sphere')
// const spherePropertiesFolder = sphereFolder.addFolder('Properties')
// spherePropertiesFolder.add(sphereData, 'radius', 0.1, 30).onChange(regenerateSphereGeometry)
// spherePropertiesFolder.add(sphereData, 'widthSegments', 1, 32).onChange(regenerateSphereGeometry)
// spherePropertiesFolder.add(sphereData, 'heightSegments', 1, 16).onChange(regenerateSphereGeometry)
// spherePropertiesFolder
//     .add(sphereData, 'phiStart', 0, Math.PI * 2)
//     .onChange(regenerateSphereGeometry)
// spherePropertiesFolder
//     .add(sphereData, 'phiLength', 0, Math.PI * 2)
//     .onChange(regenerateSphereGeometry)
// spherePropertiesFolder.add(sphereData, 'thetaStart', 0, Math.PI).onChange(regenerateSphereGeometry)
// spherePropertiesFolder.add(sphereData, 'thetaLength', 0, Math.PI).onChange(regenerateSphereGeometry)

// function regenerateSphereGeometry() {
//     const newGeometry = new THREE.SphereGeometry(
//         sphereData.radius,
//         sphereData.widthSegments,
//         sphereData.heightSegments,
//         sphereData.phiStart,
//         sphereData.phiLength,
//         sphereData.thetaStart,
//         sphereData.thetaLength
//     )
//     sphere.geometry.dispose()
//     sphere.geometry = newGeometry
// }

// const icosahedronData = {
//     radius: 1,
//     detail: 0,
// }
// const icosahedronFolder = gui.addFolder('Icosahedron')
// const icosahedronPropertiesFolder = icosahedronFolder.addFolder('Properties')
// icosahedronPropertiesFolder
//     .add(icosahedronData, 'radius', 0.1, 10)
//     .onChange(regenerateIcosahedronGeometry)
// icosahedronPropertiesFolder
//     .add(icosahedronData, 'detail', 0, 5)
//     .step(1)
//     .onChange(regenerateIcosahedronGeometry)

// function regenerateIcosahedronGeometry() {
//     const newGeometry = new THREE.IcosahedronGeometry(
//         icosahedronData.radius,
//         icosahedronData.detail
//     )
//     icosahedron.geometry.dispose()
//     icosahedron.geometry = newGeometry
// }

//const debug = document.getElementById('debug1') as HTMLDivElement

function animate() {
    requestAnimationFrame(animate)

    render()

    //debug.innerText = 'Matrix\n' + cube.matrix.elements.toString().replace(/,/g, '\n')

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()