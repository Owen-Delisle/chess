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

export function direction_by_modifier(modifier: {row: number, col: number}): PieceDirections | undefined {
        if(modifier.row === -1 && modifier.col === 0)
            return PieceDirections.north 
        if(modifier.row === -1 && modifier.col === 1)
            return PieceDirections.north_east
        if (modifier.row === 0 && modifier.col === 1)
            return PieceDirections.east
        if (modifier.row === 1 && modifier.col === 1)
            return PieceDirections.south_east
        if (modifier.row === 1 && modifier.col === 0)
            return PieceDirections.south
        if (modifier.row === 1 && modifier.col === -1)
            return PieceDirections.south_west
        if (modifier.row === 0 && modifier.col === -1)
            return PieceDirections.west
        if (modifier.row === -1 && modifier.col === -1)
            return PieceDirections.north_west
}