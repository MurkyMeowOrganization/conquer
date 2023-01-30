<script lang="ts">
  import { Mesh, useFrame } from '@threlte/core';
  import { Collider } from '@threlte/rapier';
  import * as THREE from 'three';
  import { MeshBasicMaterial, TextureLoader, Vector3 } from 'three';
  import lavaImage from '../../images/lavaTexture.png';

  const SIZE = 0.3;
  const SPEED = 3;

  export let initialPosition: THREE.Vector3;
  export let direction: THREE.Vector3;
  export let onCollide: () => void;

  let position = new THREE.Vector3(initialPosition.x, initialPosition.y, initialPosition.z);

  const loader = new TextureLoader();
  const lavaTexture = loader.load(lavaImage);
  lavaTexture.magFilter = THREE.NearestFilter;
  const geometry = new THREE.SphereGeometry(SIZE / 2, 64, 32);
  const fireballMaterial = new MeshBasicMaterial({ map: lavaTexture });

  useFrame((_, dt) => {
    const shift = new Vector3(direction.x, direction.y, direction.z);

    shift.multiplyScalar(SPEED * dt);

    position = position.add(shift);
  });
</script>

<Mesh position={position} geometry={geometry} material={fireballMaterial} />

<Collider
  shape="cuboid"
  position={position}
  args={[SIZE, SIZE, SIZE]}
  on:collisionenter={onCollide}
/>
