import { writable } from 'svelte/store';

export interface UseSpritesheetAnimationOptions {}

export function getSpritesheetAnimation(options: UseSpritesheetAnimationOptions) {
	let currentTime = 0;

	const currentFrame = writable(0);

	const updateTime = (dt: number) => {
		currentTime += dt;

		const frameTime = 0.1;
		const frameCount = 4;
		const currentValue = Math.floor(currentTime / frameTime) % (frameCount + 1);

		currentFrame.update(() => currentValue);
	};

	return {
		currentFrame,
		updateTime
	};
}
