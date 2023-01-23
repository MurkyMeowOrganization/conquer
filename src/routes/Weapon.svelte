<script lang="ts">
	import { Mesh, useFrame } from '@threlte/core';
	import * as THREE from 'three';
	import { SpriteFlipbook } from '../helpers/SpriteFlipbook';
	import weaponImage from '../images/cropedWeapon.png';

	const tileHoriz = 4;
	const tileVer = 1;
	let currentTile = 0;
	let flipbook;
	let material: THREE.Material | THREE.Material[];

	useFrame(() => {
		flipbook = new SpriteFlipbook(weaponImage, tileHoriz, tileVer, currentTile);
		material = flipbook.material;
		if (currentTile === 4) {
			currentTile = 0;
		} else {
			currentTile += 1;
		}
	});
</script>

<Mesh
	position={{ y: 0.04, x: 0.93, z: -0.46 }}
	geometry={new THREE.PlaneGeometry(0.3, 0.3)}
	{material}
/>
