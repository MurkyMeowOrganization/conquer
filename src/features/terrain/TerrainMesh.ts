import * as THREE from 'three';
import tilesImage from './tiles2.jpg';
import mapImage from './map.png';
import fragmentShader from './TerrainMesh.fragment.glslx?raw';
import vertexShader from './TerrainMesh.vertex.glslx?raw';

export class TerrainMesh extends THREE.Mesh {
  _material: THREE.ShaderMaterial;

  constructor() {
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const mapWidth = map[0].length;
    const mapHeight = map.length;

    // const canvas = document.createElement('canvas');
    // canvas.width = mapWidth;
    // canvas.height = mapHeight;
    // const ctx = canvas.getContext('2d')!;

    // for (let i = 0; i < mapWidth; ++i) {
    //   for (let j = 0; j < mapHeight; ++j) {
    //     // ctx.fillStyle = `rgb(${(map[i][j] / 2) * 255}, 0, 0)`;
    //     ctx.fillStyle = `rgb(255, 0, 0)`;
    //     ctx.fillRect(i, j, 1, 1);
    //   }
    // }

    // mapData.minFilter = THREE.NearestFilter;
    // mapData.magFilter = THREE.NearestFilter;
    // mapData.wrapS = THREE.RepeatWrapping;
    // mapData.wrapT = THREE.RepeatWrapping;

    const loader = new THREE.TextureLoader();

    const mapData = loader.load(mapImage);

    const tilesTexture = loader.load(tilesImage);
    tilesTexture.magFilter = THREE.NearestFilter;

    const uniforms: Record<string, THREE.IUniform> = {
      map: {
        value: mapData,
      },

      mapSize: {
        value: new THREE.Vector2(mapWidth, mapHeight),
      },

      tiles: {
        value: tilesTexture,
      },

      tilesSize: {
        value: new THREE.Vector2(2, 2),
      },

      tileSizeInPixels: {
        value: 128,
      },
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(100, 100, 100);

    super(geometry, material);

    this.rotation.x = -1;

    this._material = material;
  }
}
