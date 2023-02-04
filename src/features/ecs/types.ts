export interface ConquerTime {
  delta: number;
  elapsed: number;
}

export interface ConquerWorld {
  time: ConquerTime;
}

export interface ECSContextType {
  world: ConquerWorld;
  worldId: number;
}
