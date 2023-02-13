import React, { Component } from 'react';
import * as THREE from 'three';
import { Box } from '@chakra-ui/react';

class AnimateSphere extends Component {
  componentDidMount() {
    this.setState();
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 4;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD sphere
    const geometry = new THREE.SphereGeometry(2, 8, 18);
    const material = new THREE.MeshNormalMaterial({
      flatShading: false,
      wireframe: true,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
    this.start();
  }

  // eslint-disable-next-line etc/no-commented-out-code
  componentWillUnmount = () => {
    // eslint-disable-next-line etc/no-commented-out-code
    //  this.stop();
    this.mount.removeChild(this.renderer.domElement);
  };
  start = () => {
    if (!this.frameId) {
      // eslint-disable-next-line no-undef
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  // eslint-disable-next-line etc/no-commented-out-code
  // stop = () => {
  //   // eslint-disable-next-line no-undef
  //   cancelAnimationFrame(this.frameId);
  // };
  animate = () => {
    this.sphere.rotation.x += 0.005;
    this.sphere.rotation.y += 0.01;
    this.renderScene();
    // eslint-disable-next-line no-undef
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <Box
        id={'sphere'}
        style={{ minWidth: '30vw', minHeight: '30vw' }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default AnimateSphere;
