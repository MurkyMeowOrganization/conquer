<script lang="ts">
  import { Three, useFrame } from '@threlte/core';
  import { SkyMesh } from '../SkyMesh';

  let time_sec = 60;

  const DAY_LENGTH_SEC = 30;

  const sky = new SkyMesh();
  $: {
    const normalized_time = time_sec / (DAY_LENGTH_SEC * 2);

    sky.update(normalized_time);
  }

  useFrame((_, dt) => {
    time_sec += dt;
  });
</script>

<Three type={sky} />
