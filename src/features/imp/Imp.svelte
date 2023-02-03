<script>
  import { PositionalAudio, Three } from '@threlte/core';
  import { Collider } from '@threlte/rapier';
  import { getImpMesh } from './lib/getImpMesh';
  import castSound from './sound/imp-injured.mp3';
  const impMesh = getImpMesh();

  const impInjuredAudio = new Audio();
  impInjuredAudio.src = castSound;

  function impInjured() {
    impInjuredAudio.play();
  }
</script>

<Three type={impMesh} position={[5, 0.9, -5]}>
  <PositionalAudio source={castSound} />
  <Collider
    shape={'cuboid'}
    args={[0.5, 0.5, 0.5]}
    on:collisionenter={() => {
      impInjured();
    }}
  />
</Three>
