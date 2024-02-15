import { are_coors_within_board_bounds } from "../../../src/utils/bounds"

test('checks coors are within board bounds to be true', () => {
    const row_1: number = 4
    const col_1: number = 5

    const row_2: number = 0
    const col_2: number = 0

    const row_3: number = 7
    const col_3: number = 7

    expect(are_coors_within_board_bounds(row_1, col_1)).toBeTruthy()
    expect(are_coors_within_board_bounds(row_2, col_2)).toBeTruthy()
    expect(are_coors_within_board_bounds(row_3, col_3)).toBeTruthy()
})



test('checks coors are within board bounds to be false', () => {
    const row_1: number = 5
    const col_1: number = -1

    const row_2: number = -1
    const col_2: number = 5

    const row_3: number = -1
    const col_3: number = -1

    const row_4: number = 5
    const col_4: number = 8

    const row_5: number = 8
    const col_5: number = 5

    const row_6: number = 8
    const col_6: number = 8

    expect(are_coors_within_board_bounds(row_1, col_1)).toBeFalsy()
    expect(are_coors_within_board_bounds(row_2, col_2)).toBeFalsy()
    expect(are_coors_within_board_bounds(row_3, col_3)).toBeFalsy()
    expect(are_coors_within_board_bounds(row_4, col_4)).toBeFalsy()
    expect(are_coors_within_board_bounds(row_5, col_5)).toBeFalsy()
    expect(are_coors_within_board_bounds(row_6, col_6)).toBeFalsy()
})

test('checks coors are within board bounds to throw', () => {
    const row_1: number = NaN
    const col_1: number = 5

    const row_2: number = 0
    const col_2: number = NaN

    const row_3: number = NaN
    const col_3: number = NaN

    expect(() => {are_coors_within_board_bounds(row_1,col_1)}).toThrow(`row input is NaN`);
    expect(() => {are_coors_within_board_bounds(row_2,col_2)}).toThrow(`col input is NaN`);
    expect(() => {are_coors_within_board_bounds(row_3,col_3)}).toThrow(`row input is NaN`);
})