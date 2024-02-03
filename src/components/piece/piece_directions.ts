import type { GridPoint } from "../../global_types/grid_point";

export enum PieceDirections {
    north,
    north_east,
    east,
    south_east,
    south,
    south_west,
    west,
    north_west,
}

export function piece_direction_modifier(direction: PieceDirections): GridPoint {
    switch(direction) {
        case PieceDirections.north:
            return {row: -1, col: 0}
        case PieceDirections.north_east:
            return {row: -1, col: 1}
        case PieceDirections.east:
            return {row: 0, col: 1}
        case PieceDirections.south_east:
            return {row: 1, col: 1}
        case PieceDirections.south:
            return {row: 1, col: 0}
        case PieceDirections.south_west:
            return {row: 1, col: -1}
        case PieceDirections.west:
            return {row: 0, col: -1}
        case PieceDirections.north_west:
            return {row: -1, col: -1}
    }
}