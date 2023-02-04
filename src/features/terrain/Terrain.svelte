<script lang="ts">
  import { Mesh } from '@threlte/core';
  import { AutoColliders, CollisionGroups } from '@threlte/rapier';
  import * as THREE from 'three';

  import { TiledTerrainMaterial } from './TiledTerrainMaterial';
  import { generateMapTexture } from './generate-map-texture';

  import tilesImage from './img/tiles4.jpg';
  import mapImage from './img/map5.png';

  const loader = new THREE.TextureLoader();

  const atlasTexture = loader.load(tilesImage);
  atlasTexture.magFilter = THREE.NearestFilter;

  // const mapTexture = generateMapTexture([
  //   [3, 0, 1, 1, 1, 1, 1, 1, 3, 0, 1, 1, 1, 1, 1, 1],
  //   [0, 0, 2, 2, 2, 2, 2, 1, 0, 0, 2, 2, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1],
  //   [1, 2, 2, 3, 2, 2, 2, 1, 1, 2, 2, 3, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 0, 0, 1],
  //   [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
  //   [0, 0, 2, 2, 2, 2, 2, 1, 0, 0, 2, 2, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1],
  //   [1, 2, 2, 3, 2, 2, 2, 1, 1, 2, 2, 3, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
  //   [1, 2, 2, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 0, 0, 1],
  //   [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
  // ]);

  const mapTexture = loader.load(mapImage);
  mapTexture.minFilter = THREE.NearestFilter;
  mapTexture.magFilter = THREE.NearestFilter;

  const material = new TiledTerrainMaterial({
    atlasTexture,
    atlasTilesCount: new THREE.Vector2(2, 2),
    mapTexture,
    mapTilesCount: new THREE.Vector2(128, 256),
    tileSizeInPixels: 32,
  });
</script>

<CollisionGroups groups={[0, 15]}>
  <AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
    <Mesh receiveShadow geometry={new THREE.BoxGeometry(64, 1, 256)} material={material} />
  </AutoColliders>
</CollisionGroups>

<Mesh
  geometry={new THREE.BoxGeometry()}
  material={material}
  position={new THREE.Vector3(0, 2, 0)}
/>
