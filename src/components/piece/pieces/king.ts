import type { GridPoint } from "../../../global_types/grid_point"
import { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import type Square from "../../../components/square/square"
import type Rook from "./rook"
import { RookType } from "./rook"
import PieceList from "../piece_list"

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

    public calculate_possible_moves(): GridPoint[] {
        let possible_moves: GridPoint[] = []
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 0)
                    break;
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 1)
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, 1)
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 0)
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, -1)
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, -1)
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    public move_to(new_square: Square): Promise<void> {
        return new Promise(async resolve => {
            this.pos = new_square.square_id as string
            this.has_moved = true
            this.possible_moves = []
            resolve()
        })
    }

    //Overloaded from Piece
    public piece_specific_highlight_steps(): void {
        const rooks = PieceList.piece_list.filter(rook =>
            rook.type === PieceType.rook && rook.color === this.color)

            this.add_borders_to_castleable_rooks(rooks)
    }

    public squares_between_king_and_rook_empty(rook: Rook): boolean {
        if(this.has_moved) return false
        
        let castle_vars: CastleVars = this.castle_vars_for_rook_type(rook.rook_type)

        for (let index = 1; index <= castle_vars.number_of_squares_between_king_and_rook; index++) {
            let point: GridPoint = { row: this.grid_point!.row, col: this.grid_point!.col + (index * castle_vars.index_modifier) }
            if (SquareGrid.piece_by_grid_point(point) != undefined) {
                return false
            }
        }
        return true
    }

    public castle_vars_for_rook_type(rook_type: RookType): CastleVars {
        if(this.color == Color.white) {
            switch (rook_type) {
                case RookType.long_rook:
                    return {
                        king_col_modifier: -2,
                        rook_col_modifier: 3,
                        number_of_squares_between_king_and_rook: 3,
                        index_modifier: -1
                    }
                case RookType.short_rook:
                    return {
                        king_col_modifier: 2,
                        rook_col_modifier: -2,
                        number_of_squares_between_king_and_rook: 2,
                        index_modifier: 1
                    }
            }
        } else {
            switch (rook_type) {
                case RookType.long_rook:
                    return {
                        king_col_modifier: 2,
                        rook_col_modifier: -3,
                        number_of_squares_between_king_and_rook: 3,
                        index_modifier: 1
                    }
                case RookType.short_rook:
                    return {
                        king_col_modifier: -2,
                        rook_col_modifier: 2,
                        number_of_squares_between_king_and_rook: 2,
                        index_modifier: -1
                    }
            }
        }
    }

    private add_borders_to_castleable_rooks(rooks: Piece[]) {
        rooks.forEach(piece => {
            let rook = piece as Rook
            if (
                this.squares_between_king_and_rook_empty(rook) &&
                !this.has_moved && !rook.has_moved
            ) {
                SquareGrid.square_by_grid_point({ row: rook.grid_point!.row, col: rook.grid_point!.col })
                    .add_border()
            }
        })
    }

    private check_for_checks(): void {
/*

        Option 1:
        For the kings current square and every square touching that square
        Coduct a search in every direction away from that square that every type of piece on the board would do
        If while doing a search starting from the kings position a piece of the opposite color that would conduct that type of search is found then the king is in check
        If any of the squares one away from the king find a piece of that type of the opposite color, then the king cannot move there because it would be in check if it did
        If the search from any of the surronding squares finds a piece of the same color as the king that can block the attack, its possible moves list should be updated with that possible move



        Option 2:
        When a Piece moves, immediately run its existing possible moves generator looking for the king. If it finds the king then the king is in check
        If it finds a square surrounding the king, add the path from the attacking piece to the king to a list, blacklist that square from the kings possible movements. 
        If a piece the same color as the king moves onto a square in the path attacking the king, remove that path from the list and remove the square from the kings move blacklist.
        If every square that thing can move to is blacklisted, and no pieces of the same color can intercept the path of the attacking piece, and the king is currently in check, checkmate occurs and the game is over.
        If the same case above happens, but the king is not in check, the games ends in stalemate and the game is over.
*/

        

    }
}

export type CastleVars = {
    king_col_modifier: number
    rook_col_modifier: number
    number_of_squares_between_king_and_rook: number
    index_modifier: number
}