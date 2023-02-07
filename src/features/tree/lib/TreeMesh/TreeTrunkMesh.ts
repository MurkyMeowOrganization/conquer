import * as THREE from 'three';

export class TreeTrunkMesh extends THREE.Mesh {
  constructor(texture: THREE.Texture) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    super(new THREE.PlaneGeometry(1, 4), material);
  }
}
