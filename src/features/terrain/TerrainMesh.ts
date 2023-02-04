import * as THREE from 'three';
import tilesImage from './tiles3.png';
import mapImage from './map2.png';
import fragmentShader from './TerrainMesh.fragment.glslx?raw';
import vertexShader from './TerrainMesh.vertex.glslx?raw';

export class TerrainMesh extends THREE.Mesh {
  _material: THREE.ShaderMaterial;

  constructor() {
    const map = [
      [3, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 1],
      [1, 2, 2, 3, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 0, 0, 1],
      [1, 1, 1, 3, 1, 1, 1, 1],
    ];

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

    const loader = new THREE.TextureLoader();

    const mapData = loader.load(mapImage);
    // const mapData = new THREE.CanvasTexture(canvas);
    mapData.minFilter = THREE.NearestFilter;
    mapData.magFilter = THREE.NearestFilter;

    const tilesTexture = loader.load(tilesImage);
    // tilesTexture.magFilter = THREE.LinearFilter;
    tilesTexture.minFilter = THREE.NearestFilter;

    const uniforms: Record<string, THREE.IUniform> = {
      tileSizeInPixels: {
        value: 128,
      },

      textureAtlasTextureSizeInPixels: {
        value: 128,
      },

      textureAtlasSize: {
        value: new THREE.Vector2(256, 256),
      },

      textureAtlasTexturesWidth: {
        value: 2,
      },

      mapTilesCount: {
        value: new THREE.Vector2(8, 8),
      },

      textureAtlas: {
        value: tilesTexture,
      },

      mapData: {
        value: mapData,
      },

      // uViewportSize: {
      //   value: new THREE.Vector2(1366, 768),
      // },

      // uInverseLayerTileCount: {
      //   value: new THREE.Vector2(1 / 2, 1 / 2),
      // },

      // uInverseLayerTileSize: {
      //   value: new THREE.Vector2(1 / 128, 1 / 128),
      // },

      // map: {
      //   value: mapData,
      // },

      // mapSize: {
      //   value: new THREE.Vector2(mapWidth, mapHeight),
      // },

      // tiles: {
      //   value: tilesTexture,
      // },

      // tilesSize: {
      //   value: new THREE.Vector2(2, 2),
      // },

      // tileSizeInPixels: {
      //   value: 128,
      // },
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(100, 100, 100);

    super(geometry, material);

    this.rotation.x = 0;
    this.scale.setScalar(0.4);

    this._material = material;
  }
}
