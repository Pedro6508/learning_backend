export enum Floor {
  Flat, // F
  Outlet, // O
  Source, // S
  Water, // W
}

export interface RiverMap {
  data: Array<Array<Floor>>;
}

export function mapParse(path: string): RiverMap {
  let map: RiverMap = {
    data: [[]],
  };

  return map;
}

export function riverRun(map: RiverMap): RiverMap {
  return map;
}
