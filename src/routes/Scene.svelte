<script>
	import { AmbientLight, DirectionalLight, Mesh } from '@threlte/core';
	import { AutoColliders, CollisionGroups } from '@threlte/rapier';
	import * as THREE from 'three';
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three';
	import treeImage from '../images/tree.png';
	import wallImage from '../images/wall.png';

	import Player from './Character.svelte';
	import Door from './Door.svelte';

	const loader = new THREE.TextureLoader();
	const treeGeometry = new THREE.PlaneGeometry(1, 3, 5, 5);
	const treeMaterial = new THREE.MeshBasicMaterial({
		map: loader.load(treeImage),
		transparent: true,
		side: THREE.DoubleSide
	});

	const wallGeometry = new THREE.BoxGeometry(7, 4.55, 0.15);
	const wallMaterial = new THREE.MeshBasicMaterial({
		map: loader.load(wallImage),
		transparent: true
	});
</script>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />
<AmbientLight intensity={0.2} />

<CollisionGroups groups={[0, 15]}>
	<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
		<Mesh
			receiveShadow
			geometry={new BoxBufferGeometry(100, 1, 100)}
			material={new MeshStandardMaterial()}
		/>
	</AutoColliders>
</CollisionGroups>

<CollisionGroups groups={[0]}>
	<Door />

	<!-- WALLS -->
	<AutoColliders shape={'cuboid'}>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
			geometry={wallGeometry}
			material={wallMaterial}
		/>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 10 + 0.7 + 0.15 }}
			geometry={wallGeometry}
			material={wallMaterial}
		/>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 20 + 0.7 + 0.15 }}
			geometry={wallGeometry}
			material={wallMaterial}
		/>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
			geometry={wallGeometry}
			material={wallMaterial}
		/>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 40 + 0.7 + 0.15 }}
			geometry={wallGeometry}
			material={wallMaterial}
		/>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: -30 - 0.7 - 0.15 }}
			geometry={wallGeometry}
			material={wallMaterial}
		/>

		<!-- Tree -->
		<Mesh position={{ y: 1.6, x: -4, z: -3 }} geometry={treeGeometry} material={treeMaterial} />
	</AutoColliders>

	<Player position={{ z: 2 }} />
</CollisionGroups>
