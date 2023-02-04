import { Engine } from 'tick-knock';
import type { ConquerWorld } from './types';

export function getECS() {
  const engine = new Engine();

  // const world = createWorld<ConquerWorld>({
  //   time: {
  //     delta: 0,
  //     elapsed: 0,
  //   },
  // });

  return {
    engine,
    update(dt: number) {
      // world.time.delta = dt;
      // world.time.elapsed += dt;
      engine.update(dt);
    },
  };
}
