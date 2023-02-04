import { createWorld, addEntity, pipe } from 'bitecs';
import type { ConquerWorld } from './types';

export function getECS() {
  const pipeline = pipe();

  const world = createWorld<ConquerWorld>({
    time: {
      delta: 0,
      elapsed: 0,
    },
  });

  const eid = addEntity(world);

  return {
    world,
    worldId: eid,
    pipeline(dt: number) {
      world.time.delta = dt;
      world.time.elapsed += dt;
      pipeline(world);
    },
  };
}
