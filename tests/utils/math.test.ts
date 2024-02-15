import { distance_between_aligned_points } from '../../src/utils/math'
import * as math_functions from "../../src/utils/math"

jest.mock('../../src/utils/math')

describe("Testing distance_between_aligned_points with jest mock", () => {
    it("should return a number", () => {
        const distance_between_aligned_points_spy = jest.spyOn(math_functions, 'distance_between_aligned_points')
        distance_between_aligned_points_spy.mockReturnValueOnce(1)
        
        const distance = distance_between_aligned_points(
            {row:0, col: 0},
            {row:0, col: 1}
        )
        expect(distance).toBe(1)
    })
})