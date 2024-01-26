import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import PieceList from "../piece_list"
import type Rook from "./rook"

export default class King extends Piece implements Piece_Interface {
    move_distance: number = 2
    directions: PieceDirections[]
    has_moved: boolean = false

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

    public calculate_possible_moves(): GridPoint[] | undefined {
        console.log("King Piece")
        this.check_if_king_can_castle()

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
                    this.moves_list(current_pos, possible_moves, this.move_distance, -1, 0)
                    break;
                case PieceDirections.north_east:
                    this.moves_list(current_pos, possible_moves, this.move_distance, -1, 1)
                    break;
                case PieceDirections.east:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 0, 1)
                    break;
                case PieceDirections.south_east:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 1, 0)
                    break;
                case PieceDirections.south_west:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 1, -1)
                    break;
                case PieceDirections.west:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 0, -1)
                    break;
                case PieceDirections.north_west:
                    this.moves_list(current_pos, possible_moves, this.move_distance, -1, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    private check_if_king_can_castle() {
        if(!this.has_moved) {
            this.check_short_castle()
            this.check_long_castle()
        }
    }

    private check_short_castle() {
        let short_rook: Rook | undefined = PieceList.piece_by_id("rook_w1") as Rook
        if (short_rook !== undefined && !short_rook.has_moved) {
            if (PieceList.piece_by_position("F1") == undefined &&
                PieceList.piece_by_position("G1") == undefined) {
                    console.log("Can Short Castle")
            }
        }
    }

    private check_long_castle() {
        let long_rook: Rook | undefined = PieceList.piece_by_id("rook_w2") as Rook
        if (long_rook !== undefined && !long_rook.has_moved) {
            if (PieceList.piece_by_position("D1") == undefined &&
                PieceList.piece_by_position("C1") == undefined &&
                PieceList.piece_by_position("B1") == undefined) {
                console.log("Can Long Castle")
            }
        }
    }
}