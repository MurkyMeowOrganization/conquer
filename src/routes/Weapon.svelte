<script lang="ts">
	import { Mesh } from '@threlte/core';
	import * as THREE from 'three';
	import weaponImage from '../images/cropedWeapon.png';
	import SpriteSheetAnimation from './SpriteSheetAnimation.svelte';

	export let isAnimating = false;
	export let onAnimationEnd = () => {};

	const tileHoriz = 4;
	const tileVer = 1;

	const loader = new THREE.TextureLoader();
	const weaponTexture = loader.load(weaponImage);
	weaponTexture.magFilter = THREE.NearestFilter;
	const weaponMaterial = new THREE.MeshBasicMaterial({
		map: weaponTexture,
		transparent: true
	});
</script>

<SpriteSheetAnimation
	isAnimating={isAnimating}
	texture={weaponTexture}
	tileHoriz={tileHoriz}
	tileVer={tileVer}
	onAnimationEnd={onAnimationEnd}
/>

<Mesh
	position={{ y: -0.32, x: 0.8, z: -0.46 }}
	geometry={new THREE.PlaneGeometry(0.3, 0.3)}
	material={weaponMaterial}
/>
