import * as THREE from 'three';
import impImage from '../img/imp-sprite-image.png';

export class ImpMesh extends THREE.Mesh {
  constructor() {
    let tilesHoriz = 10;
    let tilesVert = 6;

    const loader = new THREE.TextureLoader();
    const impTexture = loader.load(impImage);
    impTexture.repeat.set(1 / tilesHoriz, 1 / tilesVert);
    impTexture.magFilter = THREE.NearestFilter;

    const material = new THREE.MeshBasicMaterial({
      map: impTexture,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(2, 3, 32, 32);

    super(geometry, material);
  }
}

export function getImpMesh(): THREE.Mesh {
  return new ImpMesh();
}
