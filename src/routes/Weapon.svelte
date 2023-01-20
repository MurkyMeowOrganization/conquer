<script lang="ts">
	import { Mesh, useTexture } from '@threlte/core';
	import * as THREE from 'three';
	import weaponImage from '../images/weapon.png';

	const texture = useTexture(weaponImage);

	const material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true
	});

  texture.offset.x = -1
</script>

<Mesh position={{ z: -0.15 }} geometry={new THREE.PlaneGeometry(1, 1)} {material} />
