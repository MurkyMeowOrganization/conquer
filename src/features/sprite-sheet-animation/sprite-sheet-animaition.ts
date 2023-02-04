import { Entity, IterativeSystem } from 'tick-knock';
import * as THREE from 'three';

export class SpriteSheetAnimation {
  public constructor(
    public tilesX: number,
    public tilesY: number,
    public fps: number,
    public texture: THREE.Texture
  ) {}
}

export class SpriteSheetAnimationSystem extends IterativeSystem {
  constructor() {
    super((entity) => entity.has(SpriteSheetAnimation));
  }

  updateEntity(entity: Entity, dt: number) {
    const animation = entity.get(SpriteSheetAnimation)!;
  }
}
