import type { GridPoint } from "../../src/global_types/grid_point"
import { distance_between_points } from "../../src/utils/math"

// Distance between points test
const gp_1: GridPoint = {row: 0, col: 0}
const gp_2: GridPoint = {row: 7, col: 7}

test('checks distance_between_points to be equal', () => {
    expect(distance_between_points(gp_1, gp_2)).toBe(8);
});
