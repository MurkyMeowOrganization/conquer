<script lang="ts">
  import { Three, useFrame } from '@threlte/core';
  import { SkyMesh } from '../SkyMesh';
  import Sounds from '../Sounds/Sounds.svelte';

  let time_sec = 60;

  const DAY_LENGTH_SEC = 30;

  $: normalized_time = time_sec / (DAY_LENGTH_SEC * 2);

  $: isDay = Math.sin((Math.PI / 2.0) * Math.cos(normalized_time * Math.PI)) < 0;

  const sky = new SkyMesh();
  $: {
    sky.update(normalized_time);
  }

  useFrame((_, dt) => {
    time_sec += dt;
  });
</script>

<Three type={sky} />

<Sounds isDay={isDay} />
