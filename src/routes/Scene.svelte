<script>
  import { AmbientLight, AudioListener, DirectionalLight, Mesh } from '@threlte/core';
  import { AutoColliders, CollisionGroups } from '@threlte/rapier';
  import * as THREE from 'three';
  import { Terrain } from 'src/features/terrain';
  import { Sky } from '../features/day-and-night-cycle';
  import treeImage from '../images/tree.png';
  import wallImage from '../images/wall.png';

  import Imp from '../features/imp/Imp.svelte';
  import Wolf from '../features/wolf/Wolf.svelte';
  import Player from './Character.svelte';
  import Door from './Door.svelte';

  const loader = new THREE.TextureLoader();
  const treeGeometry = new THREE.PlaneGeometry(1, 3, 5, 5);
  const treeTexture = loader.load(treeImage);
  treeTexture.magFilter = THREE.NearestFilter;
  const treeMaterial = new THREE.MeshBasicMaterial({
    map: treeTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const wallGeometry = new THREE.BoxGeometry(7, 4.55, 0.15);
  const wallTexture = loader.load(wallImage);
  wallTexture.magFilter = THREE.NearestFilter;
  const wallMaterial = new THREE.MeshBasicMaterial({
    map: wallTexture,
    transparent: true,
  });
</script>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />
<AmbientLight intensity={0.2} />

<Sky />

<Terrain />

<CollisionGroups groups={[0]}>
  <Door />

  <!-- WALLS -->
  <AutoColliders shape={'cuboid'}>
    <Mesh
      receiveShadow
      castShadow
      position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
      geometry={wallGeometry}
      material={wallMaterial}
    />
    <Mesh
      receiveShadow
      castShadow
      position={{ y: 1.275, x: 10 + 0.7 + 0.15 }}
      geometry={wallGeometry}
      material={wallMaterial}
    />
    <Mesh
      receiveShadow
      castShadow
      position={{ y: 1.275, x: 20 + 0.7 + 0.15 }}
      geometry={wallGeometry}
      material={wallMaterial}
    />
    <Mesh
      receiveShadow
      castShadow
      position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
      geometry={wallGeometry}
      material={wallMaterial}
    />
    <Mesh
      receiveShadow
      castShadow
      position={{ y: 1.275, x: 40 + 0.7 + 0.15 }}
      geometry={wallGeometry}
      material={wallMaterial}
    />
    <Mesh
      receiveShadow
      castShadow
      position={{ y: 1.275, x: -30 - 0.7 - 0.15 }}
      geometry={wallGeometry}
      material={wallMaterial}
    />
    <!-- Wolf -->
    <Wolf />
    <!-- Audio listener -->
    <AudioListener />
    <!-- Imp -->
    <Imp />
    <!-- Tree -->
    <Mesh position={{ y: 1.6, x: -4, z: -3 }} geometry={treeGeometry} material={treeMaterial} />
  </AutoColliders>

  <Player position={{ z: 2 }} />
</CollisionGroups>
