<script lang="ts">
  import { Three, useFrame } from '@threlte/core';
  import * as THREE from 'three';
  import { TreeMesh, TreeTrunkMesh } from '../TreeMesh/index';
  import trunkImage from '../../img/trunk.png';
  import leavesImage from '../../img/leaves.png';

  export let position: [number, number, number];

  const loader = new THREE.TextureLoader();
  const treeTexture = loader.load(leavesImage);
  treeTexture.magFilter = THREE.NearestFilter;

  const treeMesh = new TreeMesh({
    leavesTexture: treeTexture,
    trunkTexture: treeTexture,
  });

  const trunkTexture = loader.load(trunkImage);
  trunkTexture.magFilter = THREE.NearestFilter;

  const treeTrunkMesh = new TreeTrunkMesh(trunkTexture);

  let time_sec = 60;

  $: {
    treeMesh.updateTime(time_sec);
  }

  useFrame((_, dt) => {
    time_sec += dt;
  });
</script>

<Three type={treeTrunkMesh} position={[position[0], position[1] + 2, position[2]]}>
  <Three type={treeMesh} position={[0, -1.7, 0]} />
</Three>
