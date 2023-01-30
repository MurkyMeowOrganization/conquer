<script>
  import { Mesh, useFrame } from '@threlte/core';
  import * as THREE from 'three';
  import { MeshBasicMaterial, TextureLoader } from 'three';
  import lavaImage from '../../images/lavaTexture.png';

  export let isAnimating = false;
  export const onAnimationEnd = () => {};

  const loader = new TextureLoader();
  const lavaTexture = loader.load(lavaImage);
  lavaTexture.magFilter = THREE.NearestFilter;
  const geometry = new THREE.SphereGeometry(0.3, 64, 32);
  const fireballMaterial = new MeshBasicMaterial({ map: lavaTexture });
  let positionZ = 0;
  const fireballs = [
    { y: 0.8, x: 0, z: positionZ },
    { y: 1.5, x: 0, z: positionZ },
    { y: 2, x: 0, z: positionZ },
  ];
  useFrame(() => {
    fireballs.map(({ x, y }) => ({ y, x, z: positionZ }));

    if (isAnimating) {
      console.log('12');
      positionZ -= 0.04;
    }
  });
</script>

{#each fireballs as { y, x, z }}
  <Mesh position={{ y, x, z }} geometry={geometry} material={fireballMaterial} />
{/each}
