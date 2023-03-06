import { assertEquals } from "standart";
import { swapSort } from "./main.ts";

function random_int(scale: number, positive_only: boolean): number {
  if (Math.random() > 0.5 && positive_only == true) {
    return Math.floor(Math.random() * scale);
  } else {
    return -Math.floor(Math.random() * scale);
  }

  return Math.floor(Math.random() * scale); // always return a number < scale
}

function randomArray(array: Array<number>): Array<number> {
  let i: number,
    record: number,
    random_pos: number,
    last_index = array.length - 1;

  for (i = 1; i < array.length; i++) {
    random_pos = random_int(last_index + 1, true); // +1 includes last_index in the random output possibilities
    record = array[i];
    array[i] = array[random_pos];
    array[random_pos] = record;
  }

  return array;
}
function sortedArray(size: number, scale: number): Array<number> {
  let array: Array<number> = [];
  if (size > 0) {
    array.push(random_int(scale, false));
    let i;

    for (i = 1; i < size; i++) {
      array.push(array[i - 1] + random_int(scale, true));
    }
  }

  return array;
}

Deno.test(function sortTest() {
  const scale = 1000000, max_size = 1000; // de 10 000 para 1 000 para diminuir a demora dos testes
  let i;
  let array: Array<number> = [];

  for (i = 0; i < max_size; i++) {
    array = sortedArray(i, scale);

    assertEquals(
      swapSort(
        randomArray(array),
      ),
      array,
    );
  }
});

Deno.test({
  name: "readFile",
  permissions: { read: true },
  fn: () => {
    Deno.readTextFile("./read_test_dir/test.txt").then(
      (value) => assertEquals(value, "Teste de leitura.\n"),
    );
  },
});
