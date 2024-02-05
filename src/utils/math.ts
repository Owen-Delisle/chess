import type { GridPoint } from "../global_types/grid_point";

export function inverse(number: number): number {
	if (number !== 0) {
		return 1 / number;
	} else {
		return 0
	}
}

export function distance_between_points(point_one: GridPoint, point_two: GridPoint) {
	const delta_x = point_two.row - point_one.row - 1;
	const delta_y = point_two.col - point_one.col - 1;

	const distance = Math.floor(Math.sqrt(delta_x ** 2 + delta_y ** 2))
	return distance;
}