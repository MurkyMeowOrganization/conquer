import * as THREE from 'three';
import lavaImage from '../img/lavaTexture.png';

export function getFireballMesh(size: number): THREE.Mesh {
  const loader = new THREE.TextureLoader();
  const lavaTexture = loader.load(lavaImage);
  lavaTexture.magFilter = THREE.NearestFilter;

  const mesh = new THREE.Mesh();
  mesh.material = new THREE.MeshBasicMaterial({ map: lavaTexture });
  mesh.geometry = new THREE.SphereGeometry(size / 2, 64, 32);

  return mesh;
}
