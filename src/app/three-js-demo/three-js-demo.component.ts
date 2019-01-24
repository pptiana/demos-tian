import { Component, OnInit } from '@angular/core';
import THREE from '../../assets/js/three.js';
@Component({
  selector: 'app-three-js-demo',
  templateUrl: './three-js-demo.component.html',
  styleUrls: ['./three-js-demo.component.css']
})
export class ThreeJsDemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.showCube();
  }

  showCube() {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, ( window.innerWidth * 7 / 10) / 600, 0.1, 1000);

    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth * 7 / 10, 600);

    document.body.appendChild(renderer.domElement);
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    function render() {
      requestAnimationFrame(render);
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    }
    render();
  }
}
