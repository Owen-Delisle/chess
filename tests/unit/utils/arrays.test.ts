import { arrays_are_equal } from "../../../src/utils/arrays"

test('checks arr_1 and arr_2 to be equal', () => {
    const arr_1: number[] = [1,2,3]
    const arr_2: number[] = [1,2,3]

    const arr_3: string[] = ["1","2","3"]
    const arr_4: string[] = ["1","2","3"]

    const arr_5: string[] = []
    const arr_6: string[] = []

    expect(arrays_are_equal(arr_1,arr_2)).toBeTruthy();
    expect(arrays_are_equal(arr_3,arr_4)).toBeTruthy();
    expect(arrays_are_equal(arr_5,arr_6)).toBeTruthy();
});

test('checks arr_1 and arr_2 to not be equal', () => {
    const arr_1: number[] = [1,2,3]
    const arr_2: number[] = [3,2,1]

    const arr_3: string[] = ["1","2","3"]
    const arr_4: string[] = ["3","2","1"]

    const arr_5: number[] = []
    const arr_6: number[] = [NaN]

    expect(arrays_are_equal(arr_1,arr_2)).toBeFalsy();
    expect(arrays_are_equal(arr_3,arr_4)).toBeFalsy();
    expect(arrays_are_equal(arr_5,arr_6)).toBeFalsy();
});