import { assertEquals } from "standart";
import { Floor, mapParse, RiverMap, riverRun } from "./iterator.ts";

Deno.test({
  name: "Teste de Parse",
  permissions: { read: true },
  fn: () => {
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
      mapParse("./map/_parse_test.txt"),
      expected_map,
    );
  },
});

Deno.test({
  name: "Teste de Percurso",
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
  name: "Teste geral",
  permissions: { read: true },
  fn: () => {
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
        mapParse("./map/_parse_test.txt"),
      ),
      expected_map,
    );
  },
});
