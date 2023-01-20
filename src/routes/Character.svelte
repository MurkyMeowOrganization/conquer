<script>
	import { Layers, Mesh, PerspectiveCamera, useFrame, useThrelte } from '@threlte/core';
	import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier';
	import * as THREE from 'three';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { Vector3 } from 'three';
	import PointerLockControls from './PointerLockControls.svelte';
	import Weapon from './Weapon.svelte';

	export let position = undefined;
	export let playerCollisionGroups = [0];
	export let groundCollisionGroups = [15];
	export let radius = 0.3;
	export let height = 1.7;
	export let speed = 6;
	export let jumpStrength = 4;

	let rigidBody;
	let lock;
	let cam;

	let forward = 0;
	let backward = 0;
	let left = 0;
	let right = 0;

	const t = new Vector3();

	const dispatch = createEventDispatcher();

	let grounded = false;
	$: grounded ? dispatch('groundenter') : dispatch('groundexit');

	const lockControls = () => lock();

	const { renderer } = useThrelte();
	if (!renderer) throw new Error();

	renderer.domElement.addEventListener('click', lockControls);

	onDestroy(() => {
		renderer.domElement.removeEventListener('click', lockControls);
	});

	useFrame(() => {
		if (!rigidBody) return;
		// get direction
		const velVec = t.fromArray([right - left, 0, backward - forward]);
		// sort rotate and multiply by speed
		velVec.applyEuler(cam.rotation).multiplyScalar(speed);
		// don't override falling velocity
		const linVel = rigidBody.linvel();
		t.y = linVel.y;
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(t, true);

		// when body position changes update position prop for camera
		const pos = rigidBody.translation();
		position = { x: pos.x, y: pos.y, z: pos.z };
	});

	/** @param {KeyboardEvent} e */
	function onKeyDown(e) {
		switch (e.key) {
			case 's':
				backward = 1;
				break;
			case 'w':
				forward = 1;
				break;
			case 'a':
				left = 1;
				break;
			case 'd':
				right = 1;
				break;

			default:
				break;
		}
	}

	/** @param {KeyboardEvent} e */
	function onKeyUp(e) {
		switch (e.key) {
			case 's':
				backward = 0;
				break;
			case 'w':
				forward = 0;
				break;
			case 'a':
				left = 0;
				break;
			case 'd':
				right = 0;
				break;
			default:
				break;
		}
	}

	const spriteMaterial = new THREE.ShaderMaterial({
		uniforms: {
			main_color: { value: { r: 1, g: 1, b: 1 } },
			border_color: { value: { r: 0, g: 0, b: 0.1 } },

			thickness: { value: 0.006 },
			height: { value: 0.13 },
			offset: { value: 0.05 },
			border: { value: 0.003 },

			opacity: { value: 1 },
			center: { value: { x: 0.5, y: 0.5 } },
			rotation: { value: 0 }
		},
		vertexShader: `
								uniform float rotation;
								uniform vec2 center;
								#include <common>
								varying vec2 vUv;
								void main() {
										vUv = uv;
										vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
										vec2 scale;
										scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
										scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
										#ifndef USE_SIZEATTENUATION
												bool isPerspective = isPerspectiveMatrix( projectionMatrix );
												if ( isPerspective ) scale *= - mvPosition.z;
										#endif
										vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
										vec2 rotatedPosition;
										rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
										rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
										mvPosition.xy += rotatedPosition;
										gl_Position = projectionMatrix * mvPosition;
								}
						`,
		fragmentShader: `
						uniform vec3 main_color;
						uniform vec3 border_color;
						uniform float opacity;

						uniform float thickness;
						uniform float height;
						uniform float offset;
						uniform float border;

						varying vec2 vUv;
						void main() {

								float a = (step(abs(vUv.x - 0.5), thickness)) * step(abs(vUv.y - 0.5), height + offset) * step(offset, abs(vUv.y - 0.5)) + (step(abs(vUv.y - 0.5), thickness)) * step(abs(vUv.x - 0.5), height + offset) * step(offset, abs(vUv.x - 0.5));
								float b = (step(abs(vUv.x - 0.5), thickness - border)) * step(abs(vUv.y - 0.5), height + offset - border) * step(offset + border, abs(vUv.y - 0.5)) + (step(abs(vUv.y - 0.5), thickness - border)) * step(abs(vUv.x - 0.5), height + offset - border) * step(offset + border, abs(vUv.x - 0.5));
								gl_FragColor = vec4( mix(border_color, main_color, b), a * opacity);
						}
				`,
		transparent: true
	});
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<RigidBody bind:rigidBody {position} enabledRotations={[false, false, false]}>
	<CollisionGroups groups={playerCollisionGroups}>
		<Collider shape={'capsule'} args={[height / 2 - radius, radius]} />
	</CollisionGroups>

	<CollisionGroups groups={groundCollisionGroups}>
		<Collider
			sensor
			on:sensorenter={() => (grounded = true)}
			on:sensorexit={() => (grounded = false)}
			shape={'ball'}
			args={[radius * 1.2]}
			position={{ y: -height / 2 + radius }}
		/>
	</CollisionGroups>
</RigidBody>

<PerspectiveCamera bind:camera={cam} bind:position fov={90}>
	<PointerLockControls bind:lock />

	<Mesh
		position={{ z: -0.15 }}
		geometry={new THREE.PlaneGeometry(1, 1)}
		material={spriteMaterial}
	/>

	<Weapon />
</PerspectiveCamera>
