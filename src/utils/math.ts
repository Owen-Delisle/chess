import type { GridPoint } from "../global_types/grid_point";

export function inverse(number: number): number {
	if (number !== 0) {
		return 1 / number;
	} else {
		return 0
	}
}

export function distance_between_points(point_one: GridPoint, point_two: GridPoint) {
	const deltaX = point_two.row - point_one.row;
	const deltaY = point_two.col - point_one.col;

	const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
	return distance;
}