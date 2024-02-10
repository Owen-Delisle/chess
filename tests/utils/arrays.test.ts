import { arrays_are_equal } from "../../src/utils/arrays"

const arr_1: number[] = [1,2,3]
const arr_2: number[] = [1,2,3]

test('checks arr_1 and arr_2 to be equal', () => {
    expect(arrays_are_equal(arr_1,arr_2)).toBe(true);
});