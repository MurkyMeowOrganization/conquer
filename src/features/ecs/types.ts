import type { Engine } from 'tick-knock';

export interface ConquerTime {
  delta: number;
  elapsed: number;
}

export interface ConquerWorld {
  time: ConquerTime;
}

export interface ECSContextType {
  engine: Engine;
}
