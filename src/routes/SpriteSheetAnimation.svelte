<script lang="ts">
	import { useFrame } from '@threlte/core';
	import { getSpritesheetFrameOffsets } from '../helpers/getSpritesheetFrameOffsets';

	export let isAnimating: boolean;
	export let texture: THREE.Texture;
	export let tileHoriz: number;
	export let tileVer: number;
	export let onAnimationEnd: () => void;

	$: texture.repeat.set(1 / tileHoriz, 1 / tileVer);
	let actualFrame = 0;
	// Повышая или понижая фреймтайм, можно регулировать скорость анимации
	const frameTime = 100;
	let currentTime = 0;
	useFrame((_, dt) => {
		if (isAnimating) {
			currentTime += dt * 1000;

			if (currentTime >= frameTime) {
				actualFrame += 1;
				if (actualFrame >= 4) {
					actualFrame = 0;
					onAnimationEnd();
				}
				currentTime = 0;
			}
		}
		const { offsetX, offsetY } = getSpritesheetFrameOffsets(tileHoriz, tileVer, actualFrame);

		texture.offset.x = offsetX;
		texture.offset.y = offsetY;

		if (actualFrame >= 4) {
			onAnimationEnd();
		}
	});
</script>
