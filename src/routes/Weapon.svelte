<script lang="ts">
	import { Mesh } from '@threlte/core';
	import * as THREE from 'three';
	import { SpriteFlipbook } from '../helpers/SpriteFlipbook';
	import weaponImage from '../images/cropedWeapon.png';

	const tileHoriz = 4;
	const tileVer = 1;
	const flipbook = new SpriteFlipbook(weaponImage, tileHoriz, tileVer);
	const material = flipbook.material;
	flipbook.loop([0, 1, 2, 3], 1.5);
</script>

<Mesh
	position={{ y: 0.04, x: 0.93, z: -0.46 }}
	geometry={new THREE.PlaneGeometry(0.3, 0.3)}
	{material}
/>
