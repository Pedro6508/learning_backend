export enum Floor {
  Flat, // F
  Outlet, // O
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

class WaterMove implements Iterator<[number, number] | undefined> {
  private position: [number, number];
  private value: Floor;
  readonly map: RiverMap;
  readonly limits: MapLimits;

  private done: boolean;
  private moveIndex: number;
  readonly moveList: Array<[number, number]>;

  private safeMove(next: [number, number]): boolean {
    let result = false;
    const nextPosition = [
      this.position[0] + next[0],
      this.position[1] + next[1],
    ];

    if (
      nextPosition[0] >= this.limits.hight.beg &&
      nextPosition[0] <= this.limits.hight.end &&
      nextPosition[1] >= this.limits.length.beg &&
      nextPosition[1] <= this.limits.length.end
    ) {
      result = true;
    }

    return result;
  }

  constructor(
    position: [number, number],
    value: Floor,
    map: RiverMap,
    limits: MapLimits,
  ) {
    this.position = position;
    if (value === Floor.Water) {
      this.value = value;
    } else {
      throw new Error("WaterMove Iterator works only in Floor.Water");
    }
    this.map = map;
    this.limits = limits;

    this.done = false;
    this.moveIndex = 0;
    this.moveList = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
  }

  ignoreAndNext(): IteratorResult<[number, number] | undefined> {
    if (this.moveIndex >= this.moveList.length - 1) {
      return {
        done: true,
        value: undefined,
      };
    } else {
      this.moveIndex += 1;
      return this.next();
    }
  }

  public next(): IteratorResult<[number, number] | undefined> {
    if (this.done == true) {
      return {
        done: true,
        value: undefined,
      };
    } else {
      const [i, j] = this.moveList[this.moveIndex];

      if (this.safeMove([i, j]) === true) {
        switch (this.map.data[i][j]) {
          case Floor.Flat: {
            return {
              done: false,
              value: [i, j],
            };
          }
          default: {
            return this.ignoreAndNext();
          }
        }
      } else {
        return this.ignoreAndNext();
      }
    }
  }
}
