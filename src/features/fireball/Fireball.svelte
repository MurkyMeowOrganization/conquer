<script lang="ts">
  import { Three, useFrame, PositionalAudio } from '@threlte/core';
  import { Collider } from '@threlte/rapier';
  import * as THREE from 'three';

  import { getFireballMesh } from './lib/getFireballMesh';
  import { getFireballShift } from './lib/getFireballShift';

  import castSound from './sound/fireball_cast.mp3';

  export let initialPosition: THREE.Vector3;
  export let direction: THREE.Vector3;
  export let onCollide: () => void;

  const SIZE = 0.3;
  const SPEED = 3;
  const fireballMesh = getFireballMesh(SIZE);

  let position = new THREE.Vector3(initialPosition.x, initialPosition.y, initialPosition.z);

  useFrame((_, dt) => {
    position = position.add(getFireballShift(direction, SPEED, dt));
  });
</script>

<Three type={fireballMesh} position={[position.x, position.y, position.z]}>
  <PositionalAudio source={castSound} autoplay />

  <Collider shape="cuboid" args={[SIZE, SIZE, SIZE]} on:collisionenter={onCollide} />
</Three>
