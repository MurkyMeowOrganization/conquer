import * as THREE from 'three';
import * as $mol from 'mol_wire_lib';

export interface SpriteSheetAnimationOptions {
  tilesX: number;
  tilesY: number;
  texture: THREE.Texture;
}

export class SpriteSheetAnimation {
  public readonly tilesX: number;
  public readonly tilesY: number;
  public readonly texture: THREE.Texture;

  constructor(options: SpriteSheetAnimationOptions) {
    this.tilesX = options.tilesX;
    this.tilesY = options.tilesY;
    this.texture = options.texture;

    this.texture.repeat.set(1 / this.tilesX, 1 / this.tilesY);
  }

  @$mol.default.$mol_wire_solo
  _lastTime(next: number = 0) {
    return next;
  }

  @$mol.default.$mol_wire_solo
  offset(next = { x: 0, y: 0 }) {
    const texture = this.texture;

    texture.offset.x = next.x;
    texture.offset.y = next.y;

    return next;
  }

  @$mol.default.$mol_wire_solo
  currentFrame(next = 0) {
    const offsetX = (next % this.tilesX) / this.tilesX;
    const offsetY = (this.tilesY - Math.floor(next / this.tilesX) - 1) / this.tilesY;

    this.offset({
      x: offsetX,
      y: offsetY,
    });

    return next;
  }

  @$mol.default.$mol_wire_solo
  fps(next = 1) {
    return next;
  }

  @$mol.default.$mol_wire_solo
  isAnimating(next = true) {
    return next;
  }

  @$mol.default.$mol_wire_solo
  time(next = 0) {
    if (this.isAnimating()) {
      const lastTime = this._lastTime();

      if (lastTime === undefined) {
        this.currentFrame(0);
        this._lastTime(next);
      } else {
        const diff = next - lastTime;
        this.currentFrame(Math.floor(diff * this.fps()) % 4);
      }
    } else {
      this._lastTime(undefined);
    }

    return next;
  }
}
