import type { GridPoint } from "../../src/global_types/grid_point"
import { distance_between_aligned_points } from "../../src/utils/math"

// Distance between points test
test('checks distance_between_aligned_points to be equal', () => {
    const gp_1: GridPoint = {row: 0, col: 0}
    const gp_2: GridPoint = {row: 7, col: 7}

    const gp_3: GridPoint = {row: 0, col: 0}
    const gp_4: GridPoint = {row: 2, col: 2}

    expect(distance_between_aligned_points(gp_1, gp_2)).toBe(7)
    expect(distance_between_aligned_points(gp_3, gp_4)).toBe(2)
})

test('checks distance_between_aligned_points with out of bounds coordinated to throw error', () => {
    const gp_1: GridPoint = {row: -1, col: 0}
    const gp_2: GridPoint = {row: 7, col: 7}
    const gp_3: GridPoint = {row: NaN, col: 7}
    const gp_4: GridPoint = {row: 7, col: NaN}
    const gp_5: GridPoint = {row: -1, col: NaN}

    expect(() => {distance_between_aligned_points(gp_1,gp_2) }).toThrow(`-1, 0 is out of bounds.`);
    expect(() => {distance_between_aligned_points(gp_2,gp_1) }).toThrow(`-1, 0 is out of bounds.`);
    expect(() => {distance_between_aligned_points(gp_2,gp_3) }).toThrow(`row input is NaN`);
    expect(() => {distance_between_aligned_points(gp_2,gp_4) }).toThrow(`col input is NaN`);
    expect(() => {distance_between_aligned_points(gp_2,gp_5) }).toThrow(`col input is NaN`);
})
