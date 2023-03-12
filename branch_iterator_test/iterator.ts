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

export async function mapParse(path: string): Promise<RiverMap> {
  const map: RiverMap = {
    data: [],
    source: [0, 0],
  };

  const file_content = await Deno.readTextFile(path);
  const raw_map = file_content.replaceAll("\n", "").replaceAll(" ", "");
  const map_beg = raw_map.search("MAP:{");
  let map_str = raw_map.slice(map_beg + 5, -1);

  switch (map_str.slice(-1)) {
    case ",":
      map_str = map_str.slice(0, -2);
      break;
    case "]":
      map_str = map_str.slice(0, -1);
      break;
    default:
      throw new Error(
        "Invalid Input: The map end's don't is dirty | end: " +
          map_str,
      );
  }

  const map_lines = map_str.split("],");

  for (const line of map_lines) {
    map.data.push(lineParse(line));
  }

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

function verifyLimits([i, j]: [number, number], map: RiverMap): boolean {
  let result = false;

  if (
    i >= 0 &&
    i <= map.data.length - 1
  ) {
    if (
      j >= 0 &&
      j <= map.data[i].length - 1
    ) {
      result = true;
    }
  }

  return result;
}

export function riverRun(map: RiverMap): RiverMap {
  const fifo: Array<[number, number]> = [];

  fifo.push(map.source);

  while (fifo.length != 0) {
    const iter: IterMove = new IterMove();
    const [i, j] = fifo[0];
    fifo.shift();

    for (const [ip, jp] of iter) { // *p = * plus
      const [ir, jr] = [i + ip, j + jp]; // *r = * result

      if (verifyLimits([ir, jr], map) === true) {
        const value = map.data[ir][jr];

        if (value === Floor.Flat) {
          map.data[ir][jr] = Floor.Water;
          fifo.push([ir, jr]);
        } else if (value === Floor.Outlet) {
          return map;
        }
      }
    }
  }

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

function lineParse(str: String): Array<Floor> { // str has no spaces ou breaklines
  const result: Array<Floor> = [];
  const pure_str = str.slice(1).split(",");

  if (str[0] !== "[") {
    throw new Error(
      "Invalid Input: Line array is dirty | str:" + str,
    );
  }

  for (const char of pure_str) {
    switch (char) {
      case "O":
        result.push(Floor.Outlet);
        break;
      case "W":
        result.push(Floor.Water);
        break;
      case "F":
        result.push(Floor.Flat);
        break;
      default:
        throw new Error(
          "Invalid Input: Invalid line array element | element:" +
            str.indexOf(char),
        );
    }
  }

  return result;
}

Deno.test({
  name: "Teste de parse de linha",
  fn: () => {
    const line = "[O,F,F,F,F,W";
    const expected_parse = [
      Floor.Outlet,
      Floor.Flat,
      Floor.Flat,
      Floor.Flat,
      Floor.Flat,
      Floor.Water,
    ];

    assertEquals(
      lineParse(line),
      expected_parse,
    );
  },
});
