import { assertEquals } from "standart";
import { Floor, IterMove, mapParse, RiverMap, riverRun } from "./iterator.ts";

Deno.test({
  name: "iterator",
  fn: async (test) => {
    const iterMove = new IterMove();

    let index = 0;
    const expectedMove = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    for (const move of iterMove) {
      await test.step({
        name: "Step: " + (index + 1).toString(),
        fn: () => {
          assertEquals(
            move,
            expectedMove[index],
            String("Actual: " + move) +
              String(" | Expected: " + expectedMove[index]),
          );
        },
      });

      index += 1;
    }
  },
});

Deno.test({
  name: "parse",
  permissions: { read: true },
  fn: async () => {
    const expected_map: RiverMap = {
      data: [
        [
          Floor.Water,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Outlet,
        ],
      ],
      source: [0, 0],
    };

    assertEquals(
      await mapParse("./map/_parse_test.txt"),
      expected_map,
    );
  },
});

Deno.test({
  name: "dfs-run",
  fn: () => {
    const initial_map: RiverMap = {
      data: [
        [
          Floor.Water,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
        ],
        [
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Flat,
          Floor.Outlet,
        ],
      ],
      source: [0, 0],
    };

    const expected_map: RiverMap = {
      data: [
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Outlet,
        ],
      ],
      source: [0, 0],
    };

    assertEquals(riverRun(initial_map), expected_map);
  },
});

Deno.test({
  name: "full",
  permissions: { read: true },
  fn: async () => {
    const expected_map: RiverMap = {
      data: [
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
        ],
        [
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Water,
          Floor.Outlet,
        ],
      ],
      source: [0, 0],
    };

    assertEquals(
      riverRun(
        await mapParse("./map/_parse_test.txt"),
      ),
      expected_map,
    );
  },
});
