<script lang="ts">
  import { Three, useFrame } from '@threlte/core';
  import { SkyMesh } from '../SkyMesh';

  let time = 1;

  const sky = new SkyMesh();
  $: sky.update(time);

  useFrame((_, dt) => {
    time += dt / 100;
  });
</script>

<Three type={sky} />
