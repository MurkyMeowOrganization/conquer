import * as THREE from 'three';

export class TreeTrunkMesh extends THREE.Mesh {
  constructor(texture: THREE.Texture) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    super(new THREE.CylinderGeometry(0.01, 0.01, 4), material);
  }
}
