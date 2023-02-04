import * as THREE from 'three';

export function generateMapTexture(map: number[][]): THREE.Texture {
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const ctx = canvas.getContext('2d')!;

  for (let i = 0; i < mapWidth; ++i) {
    for (let j = 0; j < mapHeight; ++j) {
      ctx.fillStyle = `rgb(${map[j][i]}, 0, 0)`;
      ctx.fillRect(i, j, 1, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  return texture;
}
