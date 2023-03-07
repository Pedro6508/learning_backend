export enum Floor {
  Flat, // F
  Outlet, // O
  Source, // S
  Water, // W
}

export interface RiverMap {
  data: Array<Array<Floor>>;
  source: [number, number];
}

export function mapParse(path: string): RiverMap {
  let map: RiverMap = {
    data: [[]],
    source: [0, 0],
  };

  return map;
}

export function riverRun(map: RiverMap): RiverMap {
  return map;
}
