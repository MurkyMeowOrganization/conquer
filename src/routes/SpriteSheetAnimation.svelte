<script lang="ts">
	import { useFrame } from '@threlte/core';
	import { getSpritesheetFrameOffsets } from '../helpers/getSpritesheetFrameOffsets';
	import { getSpritesheetAnimation } from './getSpritesheetAnimation';

	export let isAnimating: boolean;
	export let texture: THREE.Texture;
	export let tileHoriz: number;
	export let tileVer: number;
	export let onAnimationEnd: () => void;

	const { currentFrame, updateTime } = getSpritesheetAnimation({});

	$: texture.repeat.set(1 / tileHoriz, 1 / tileVer);

	useFrame((_, dt) => updateTime(dt));

	currentFrame.subscribe((frame) => {
		const actualFrame = isAnimating ? frame : 0;

		const { offsetX, offsetY } = getSpritesheetFrameOffsets(tileHoriz, tileVer, actualFrame);

		texture.offset.x = offsetX;
		texture.offset.y = offsetY;

		if (actualFrame === 3) {
			onAnimationEnd();
		}
	});
</script>
