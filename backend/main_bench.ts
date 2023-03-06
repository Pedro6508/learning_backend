import { swapSort } from "./main.ts";

Deno.bench(function order() {
  swapSort([9, 2, 3, 4, 2, 0]);
});
