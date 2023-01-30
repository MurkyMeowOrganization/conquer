<script>
  import { Mesh, useFrame } from '@threlte/core';
  import * as THREE from 'three';
  import { MeshBasicMaterial, TextureLoader } from 'three';
  import lavaImage from '../../images/lavaTexture.png';

  const loader = new TextureLoader();
  const lavaTexture = loader.load(lavaImage);
  lavaTexture.magFilter = THREE.NearestFilter;
  const geometry = new THREE.SphereGeometry(0.3, 64, 32);
  const fireballMaterial = new MeshBasicMaterial({ map: lavaTexture });
  let positionZ = 0;
  useFrame(() => {
    positionZ -= 0.01;
  });
</script>

<Mesh position={{ y: 0.8, x: 0, z: positionZ }} geometry={geometry} material={fireballMaterial} />
