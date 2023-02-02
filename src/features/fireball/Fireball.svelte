<script lang="ts">
  import { PositionalAudio, Three } from '@threlte/core';
  import { Collider, RigidBody } from '@threlte/rapier';
  import * as THREE from 'three';

  import { getFireballMesh } from './lib/getFireballMesh';

  import castSound from './sound/fireball_cast.mp3';

  export let initialPosition: THREE.Vector3;
  export let direction: THREE.Vector3;
  export let onCollide: () => void;

  const SIZE = 0.3;
  const SPEED = 8;
  const fireballMesh = getFireballMesh(SIZE);

  const velocity = new THREE.Vector3(direction.x, direction.y, direction.z).multiplyScalar(SPEED);
</script>

<RigidBody position={initialPosition} linearVelocity={velocity} type="kinematicVelocity">
  <Three type={fireballMesh}>
    <PositionalAudio source={castSound} autoplay />

    <Collider shape="cuboid" args={[SIZE, SIZE, SIZE]} on:collisionenter={onCollide} />
  </Three>
</RigidBody>
