<script lang="ts">
  import { Three } from '@threlte/core';
  import { Collider } from '@threlte/rapier';
  import { getWolfMesh } from './lib/getWolfMesh';
  const wolfMesh = getWolfMesh();
</script>

<Three type={wolfMesh} position={[2, 0.9, -5]}>
  <Collider
    shape={'cuboid'}
    args={[0.5, 0.5, 0.5]}
    on:collisionenter={() => {
      console.log('123312');
    }}
    on:collisionexit={() => {
      console.log('123');
    }}
  />
</Three>
