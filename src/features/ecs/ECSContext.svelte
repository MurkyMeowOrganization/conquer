<script lang="ts">
  import { useFrame } from '@threlte/core';
  import { setContext } from 'svelte';
  import { ECS_CONTEXT_KEY } from './constants';
  import { getECS } from './getECS';
  import type { ECSContextType } from './types';

  const { engine, update } = getECS();

  useFrame((_, dt) => {
    update(dt);
  });

  setContext<ECSContextType>(ECS_CONTEXT_KEY, {
    engine,
  });
</script>

<slot />
