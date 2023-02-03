import * as THREE from 'three';
import impImage from '../img/imp-sprite-image.png';

export function getImpMesh(): THREE.Mesh {
  let currentTile = 6;
  let tilesHoriz = 11;
  let tilesVert = 7;
  const loader = new THREE.TextureLoader();
  const impTexture = loader.load(impImage);
  impTexture.repeat.set(1 / tilesHoriz, 1 / tilesVert)
  const offsetX = (currentTile % tilesHoriz) / tilesHoriz;
  const offsetY = (tilesVert - Math.floor(currentTile / tilesHoriz) - 1) / tilesVert;
  impTexture.offset.x = offsetX
  impTexture.offset.y = offsetY
  impTexture.magFilter = THREE.NearestFilter;
  const mesh = new THREE.Mesh();
  mesh.material = new THREE.MeshBasicMaterial({
    map: impTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });
  mesh.geometry = new THREE.PlaneGeometry(2, 3, 32, 32);
  return mesh;
}
