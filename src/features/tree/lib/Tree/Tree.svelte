<script lang="ts">
  import { Three, useFrame } from '@threlte/core';
  import * as THREE from 'three';
  import { TreeMesh, TreeTrunkMesh } from '../TreeMesh/index';
  import trunkImage from '../../img/pine_tree_1_trunk.png';
  import leavesImage from '../../img/pine_tree_1_leaves.png';

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

<Three type={treeMesh} position={[0, 1, -3]} />
<Three type={treeTrunkMesh} position={[0, 0, -3]} />
