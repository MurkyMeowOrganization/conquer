<script>
  import { Three } from '@threlte/core';
  import { Collider } from '@threlte/rapier';
  import { getImpMesh } from './lib/getImpMesh';

  const impMesh = getImpMesh();
</script>

<Three type={impMesh} position={[5, 0.9, -5]}>
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
