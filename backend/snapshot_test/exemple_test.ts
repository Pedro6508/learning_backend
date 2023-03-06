import { assertSnapshot } from "https://deno.land/std@0.177.0/testing/snapshot.ts";

Deno.test("isSnapshotMatch", async function (t): Promise<void> {
  const first = {
    example: 123,
    hello: "world!",
  };

  const second = {
    example: 321,
    world: "hello!",
  };

  await assertSnapshot(t, first);
  await assertSnapshot(t, second);
});
