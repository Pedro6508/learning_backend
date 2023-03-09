import { assertEquals } from "standart";

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

class WaterMove implements IterableIterator<[number, number] | undefined> {
  private position: [number, number];
  private value: Floor;
  readonly map: RiverMap;
  readonly limits: MapLimits;

  private done: boolean;
  public moveIndex: number; // change to private
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

  returnAndPrepare(
    value: [number, number] | undefined,
  ): IteratorResult<[number, number] | undefined> {
    if (this.moveIndex >= this.moveList.length - 1) {
      this.done = true;

      return {
        done: this.done,
        value: value,
      };
    } else {
      this.moveIndex += 1;
      return this.next();
    }
  }

  // ignoreAndNext(): IteratorResult<[number, number] | undefined> {
  //   if (this.moveIndex >= this.moveList.length - 1) {
  //     return {
  //       done: true,
  //       value: undefined,
  //     };
  //   } else {
  //     this.moveIndex += 1;
  //     return this.next();
  //   }
  // }

  public next(): IteratorResult<[number, number] | undefined> {
    if (this.done == true) {
      return {
        done: true,
        value: undefined,
      };
    } else {
      const [raw_i, raw_j] = this.moveList[this.moveIndex];
      const [i, j] = [this.position[0] + raw_i, this.position[1] + raw_j];

      if (this.safeMove([i, j]) === true) {
        if (this.map.data[i][j] === Floor.Flat) {
          this.moveIndex += 1;

          return this.returnAndPrepare([i, j]);
        } else {
          return this.returnAndPrepare(undefined);
        }
      } else {
        return this.returnAndPrepare(undefined);
      }
    }
  }

  [Symbol.iterator](): IterableIterator<[number, number] | undefined> {
    return this;
  }
}

Deno.test({
  name: "Class Test: WaterMove Iterator",
  fn: (test) => {
    const map: RiverMap = {
      data: [
        [Floor.Flat, Floor.Flat, Floor.Flat],
        [Floor.Flat, Floor.Water, Floor.Flat],
        [Floor.Flat, Floor.Flat, Floor.Flat],
      ],
      source: [1, 1],
    };

    const expected_map: RiverMap = {
      data: [
        [Floor.Flat, Floor.Water, Floor.Flat],
        [Floor.Water, Floor.Water, Floor.Water],
        [Floor.Flat, Floor.Water, Floor.Flat],
      ],
      source: [1, 1],
    };

    const [i, j] = map.source;
    const iter = new WaterMove(
      map.source,
      map.data[i][j],
      map,
      findMapLimits(map),
    );

    let index = 0;
    let position = iter.next();
    while (position.value != undefined) {
      test.step({
        name: "Loop num: " + index.toString(),
        fn: () => {
          const [x, y] = [
            map.source[0] + iter.moveList[index][0],
            map.source[1] + iter.moveList[index][1],
          ];
          index += 1;

          assertEquals(
            position.value,
            [x, y],
            "position.value: " + String(position.value) + " | [x,y]: " +
              String([x, y]),
          );
        },
      });

      position = iter.next();
    }

    // for (let floor of iter) {
    //   test.step({
    //     name: "Loop num: " + index.toString(),
    //     fn: () => {
    //       const [x, y] = [
    //         map.source[0] + iter.moveList[index][0],
    //         map.source[1] + iter.moveList[index][1],
    //       ];
    //       index += 1;

    //       assertEquals(floor, [x, y]);
    //     },
    //   });
    // }

    // for (let floor of iter) {
    //   if (floor != undefined) {
    //     const [i, j] = floor;
    //     map.data[i][j] = Floor.Water;
    //   }
    // }

    // assertEquals(map, expected_map);
  },
});
