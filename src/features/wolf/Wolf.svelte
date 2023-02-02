<script lang="ts">
  import { Three } from '@threlte/core';
  import { AutoColliders, RigidBody } from '@threlte/rapier';
  import { getWolfMesh } from './lib/getWolfMesh';

  const wolfMesh = getWolfMesh();
</script>

<RigidBody>
  <AutoColliders shape={'cuboid'}>
    <Three type={wolfMesh} position={[2, 0.9, -5]} />
  </AutoColliders>
</RigidBody>
