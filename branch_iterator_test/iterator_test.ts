import { assertEquals } from "standart";
import { Floor, mapParse, RiverMap, riverRun } from "./iterator.ts";

Deno.test({
  name: "Teste de Parse",
  permissions: { read: true },
  fn: () => {
    const expected_map: RiverMap = {
      data: [
        [
          Floor.Source,
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
          Floor.Source,
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
    };

    const expected_map: RiverMap = {
      data: [
        [
          Floor.Source,
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
          Floor.Source,
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
    };

    assertEquals(
      riverRun(
        mapParse("./map/_parse_test.txt"),
      ),
      expected_map,
    );
  },
});
