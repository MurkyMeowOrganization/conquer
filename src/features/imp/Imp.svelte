<script>
  import { PositionalAudio, Three } from '@threlte/core';
  import { Collider } from '@threlte/rapier';
  // import SpriteSheetAnimation from 'src/routes/SpriteSheetAnimation.svelte';
  import { getCharacterInjuredAudio } from '../../helpers/getCharacterInjuredAudio';
  import { getImpMesh } from './lib/getImpMesh';
  import impAudio from './sound/imp-injured.mp3';
  const impMesh = getImpMesh();

  const impInjuredAudio = getCharacterInjuredAudio(impAudio);

  function impInjured() {
    impInjuredAudio.play();
  }
</script>

<!-- 
<SpriteSheetAnimation
  isAnimating={true}
  texture={}
  tileHoriz={7}
  tileVer={1}
  onAnimationEnd={() => {}}
/>
 -->
<Three type={impMesh} position={[5, 0.9, -5]}>
  <PositionalAudio source={impInjuredAudio} />
  <Collider
    shape={'cuboid'}
    args={[0.5, 0.5, 0.5]}
    on:collisionenter={() => {
      impInjured();
    }}
  />
</Three>
