export enum Floor {
  Flat, // F
  Outlet, // O
  Water, // W
}

export interface RiverMap {
  data: Array<Array<Floor>>;
  source: [number, number];
}

export async function mapParse(path: string): Promise<RiverMap> {
  let map: RiverMap = {
    data: [[]],
    source: [0, 0],
  };

  const file = await Deno.readTextFile(path);

  return new Promise((resolve, _) => {
    resolve(map);
  });
}

interface MapLimits {
  hight: {
    beg: number;
    end: number;
  };

  length: {
    beg: number;
    end: number;
  };
}

function findMapLimits(map: RiverMap): MapLimits {
  return {
    hight: {
      beg: 0,
      end: map.data.length - 1,
    },
    length: {
      beg: 0,
      end: map.data[0].length - 1,
    },
  };
}

export function riverRun(map: RiverMap): RiverMap {
  return map;
}

export class IterMove implements IterableIterator<[number, number]> {
  readonly moveList: Array<[number, number]> = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  private moveIndex = 0;

  constructor() {}

  public next(): IteratorResult<[number, number]> {
    if (this.moveIndex >= this.moveList.length) {
      return {
        done: true,
        value: this.moveList[this.moveList.length - 1],
      };
    } else {
      const result: IteratorResult<[number, number]> = {
        done: false,
        value: this.moveList[this.moveIndex],
      };

      this.moveIndex += 1;
      return result;
    }
  }

  [Symbol.iterator](): IterableIterator<[number, number]> {
    return this;
  }
}
