<script lang="ts">
  import { useFrame } from '@threlte/core';
  import { setContext } from 'svelte';
  import { ECS_CONTEXT_KEY } from './constants';
  import { getECS } from './getECS';
  import type { ECSContextType } from './types';

  const { world, worldId, pipeline } = getECS();

  useFrame((_, dt) => {
    pipeline(dt);
  });

  setContext<ECSContextType>(ECS_CONTEXT_KEY, {
    world,
    worldId,
  });
</script>

<slot />
