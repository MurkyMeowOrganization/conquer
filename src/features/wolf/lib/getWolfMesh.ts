import * as THREE from 'three';
import wolfImage from '../img/wolf.png';

export function getWolfMesh(): THREE.Mesh {

  const loader = new THREE.TextureLoader();
  const wolfTexture = loader.load(wolfImage);
  wolfTexture.magFilter = THREE.NearestFilter;
  const mesh = new THREE.Mesh();
  mesh.material = new THREE.MeshBasicMaterial({
    map: wolfTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });
  mesh.geometry = new THREE.PlaneGeometry(3, 3, 8, 8);
  return mesh;
}
