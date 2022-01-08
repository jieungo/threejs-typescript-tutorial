import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4488ff);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer() //다양한 renderer가 존재하지만 webgl이 가장 빠르며 대부분 서포트 해준다 (가장 기본)
renderer.setSize(window.innerWidth, window.innerHeight) // innerWidth대신 200으로 바꾼다면? camera와 밑의 resize에서도 변경해줘야 200의 크기가 제대로 유지된다
document.body.appendChild(renderer.domElement) //html에 다이나믹하게 캔버스를 자동으로 그려준다

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()