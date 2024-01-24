import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"

export default class King extends Piece implements Piece_Interface {
    largest_move_distance: number = 1
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north,
            PieceDirections.north_east,
            PieceDirections.east,
            PieceDirections.south_east,
            PieceDirections.south,
            PieceDirections.south_west,
            PieceDirections.west,
            PieceDirections.north_west,
        ]
    }

    public calculate_possible_moves(current_pos: GridPoint): GridPoint[] | undefined {
        console.log("King Piece")

        let current_position: GridPoint | undefined
        current_position = SquareGrid.point_by_piece_id(this.title)

        if (current_position !== undefined) {
            return this.possible_moves_arr(current_position)
        }

        return undefined
    }

    public possible_moves_arr(current_pos: GridPoint): GridPoint[] {
        let possible_moves: GridPoint[] = []

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.move_north(current_pos, possible_moves)
                    break;
                case PieceDirections.north_east:
                    this.move_north_east(current_pos, possible_moves)
                    break;
                case PieceDirections.east:
                    this.move_east(current_pos, possible_moves)
                    break;
                case PieceDirections.south_east:
                    this.move_south_east(current_pos, possible_moves)
                    break;
                case PieceDirections.south:
                    this.move_south(current_pos, possible_moves)
                    break;
                case PieceDirections.south_west:
                    this.move_south_west(current_pos, possible_moves)
                    break;
                case PieceDirections.west:
                    this.move_west(current_pos, possible_moves)
                    break;
                case PieceDirections.north_west:
                    this.move_north_west(current_pos, possible_moves)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    private move_north(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row - 1 >= 0) {
            if (this.piece_at_grid_point(
                current_pos.row - this.largest_move_distance,
                current_pos.col) === undefined) {
                possible_moves.push({
                    row: current_pos.row - this.largest_move_distance,
                    col: current_pos.col
                })
            }
        }
    }

    private move_north_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row - 1 >= 0 && current_pos.col + 1 <= 7) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row - 1,
                current_pos.col + 1)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row - 1,
                    col: current_pos.col + 1
                })
            }
        }
    }

    private move_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.col + 1 <= 7) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row,
                current_pos.col + 1)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row,
                    col: current_pos.col + 1
                })
            }
        }
    }

    private move_south_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row + 1 <= 7 && current_pos.col + 1 <= 7) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row + 1,
                current_pos.col + 1)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row + 1,
                    col: current_pos.col + 1
                })
            }
        }
    }

    private move_south(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row + 1 <= 7) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row + 1,
                current_pos.col)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row + 1,
                    col: current_pos.col
                })
            }
        }
    }

    private move_south_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row + 1 <= 7 && current_pos.col - 1 >= 0) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row + 1,
                current_pos.col - 1)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row + 1,
                    col: current_pos.col - 1
                })
            }
        }
    }

    private move_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.col - 1 >= 0) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row,
                current_pos.col - 1)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row,
                    col: current_pos.col - 1
                })
            }
        }
    }

    private move_north_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row - 1 >= 0 && current_pos.col - 1 >= 0) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                current_pos.row - 1,
                current_pos.col - 1)
            if (north_east_piece == undefined) {
                possible_moves.push({
                    row: current_pos.row - 1,
                    col: current_pos.col - 1
                })
            }
        }
    }
}