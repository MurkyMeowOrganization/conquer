import * as THREE from 'three';

import fragmentShader from './TerrainMesh.fragment.glslx?raw';
import vertexShader from './TerrainMesh.vertex.glslx?raw';

export interface TiledTerrainMaterialOptions {
  atlasTexture: THREE.Texture;
  atlasTilesCount: THREE.Vector2;
  tileSizeInPixels: number;
  mapTexture: THREE.Texture;
  mapTilesCount: THREE.Vector2;
}

export class TiledTerrainMaterial extends THREE.ShaderMaterial {
  constructor(options: TiledTerrainMaterialOptions) {
    const { atlasTexture, tileSizeInPixels, atlasTilesCount, mapTilesCount, mapTexture } = options;

    const uniforms: Record<string, THREE.IUniform> = {
      tileSizeInPixels: {
        value: tileSizeInPixels,
      },

      mapTilesCount: {
        value: mapTilesCount,
      },

      textureAtlas: {
        value: atlasTexture,
      },

      atlasTilesCount: {
        value: atlasTilesCount,
      },

      mapData: {
        value: mapTexture,
      },
    };

    super({
      fragmentShader,
      vertexShader,
      uniforms,
    });
  }
}
