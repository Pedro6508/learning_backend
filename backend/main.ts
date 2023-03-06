export function swapSort(array: Array<number>): Array<number> {
  let i: number, record: number, count = 0;
  let end = false;

  while (end == false) {
    count = 0;

    for (i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        record = array[i];
        array[i] = array[i + 1];
        array[i + 1] = record;
        count++;
      }
    }

    if (count == 0) {
      end = true;
    }
  }

  for (i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      record = array[i];
      array[i] = array[i + 1];
      array[i + 1] = record;

      array = swapSort(array);
    }
  }

  return array;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(
    "Array inicial: [2, 6, 1, 9, 0, -1] | Array final: ",
    swapSort([2, 6, 1, 9, 0, -1]),
  );
}
