<script>
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import { ECSContext } from 'src/features/ecs';
  import Scene from './Scene.svelte';
  import { useTweakpane } from './useTweakpane';
  const { pane, action } = useTweakpane();
  pane.addBlade({
    view: 'text',
    text: "Use the 'wasd' keys to move around",
    lineCount: 3,
  });
</script>

<div use:action />

<Canvas>
  <World>
    <ECSContext>
      <Scene />
    </ECSContext>
  </World>
</Canvas>
