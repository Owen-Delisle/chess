import { PieceType } from "./piece_types"
import SquareGrid from "../../models/square_grid"

import type Bishop from "./pieces/bishop"
import type King from "./pieces/king"
import type Knight from "./pieces/knight"
import type Pawn from "./pieces/pawn"
import type Queen from "./pieces/queen"
import type Rook from "./pieces/rook"
import type { GridPoint } from "src/global_types/grid_point"
import type { Color } from "./color"
import Board from "../board/board"
import type Square from "../square/square"
import SquareID from "../square/square_id"
import type { PieceDirections } from "./piece_directions"

export default class Piece {
    title: string
    pos: string
    svg: string
    image: HTMLImageElement
    type?: PieceType
    color: Color
    grid_point: GridPoint | undefined
    possible_moves: string[] = []
    directions: PieceDirections[] = []
    move_distance: number = 8
    position_restrictions: string[] = []
    can_block_check: boolean = false

    static position_restrictions: string[] = []

    constructor(title: string, pos: string, svg: string, color: Color) {
        this.title = title
        this.pos = pos
        this.svg = svg
        this.image = this.imageBuilder()
        this.color = color
        this.grid_point = undefined
    }

    public imageBuilder(): HTMLImageElement {
        let image: HTMLImageElement = new Image()
        image.src = this.svg
        image.id = this.title
        image.className = "piece"

        return image
    }

    public static piece_factory(piece: Piece): any {
        switch (piece.type) {
            case PieceType.bishop:
                return piece as Bishop
            case PieceType.king:
                return piece as King
            case PieceType.knight:
                return piece as Knight
            case PieceType.pawn:
                return piece as Pawn
            case PieceType.queen:
                return piece as Queen
            case PieceType.rook:
                return piece as Rook
            default:
                break;
        }
    }

    public move_to(new_square: Square): Promise<void> {
        return new Promise(async resolve => {
            this.pos = new_square.square_id as string
            this.possible_moves = []
            resolve()
        })
    }

    public check_if_piece_can_block_check() {

    }

    public build_possible_moves_list(
        current_pos: GridPoint,
        distance: number,
        modifier: GridPoint
    ): void {
        const row_modifier = modifier.row
        const col_modifier = modifier.col
        this.add_positions_to_list_in_direction_for_distance(current_pos, distance, row_modifier, col_modifier, this.possible_moves)
    }

    public add_positions_to_list_in_direction_for_distance(
        current_pos: GridPoint,
        distance: number,
        row_modifier: number,
        col_modifier: number,
        possible_moves: string[],
    ): void {
        let index: number = 1
        let moves_in_direction: string[] = []

        while (this.conditions_to_continue_adding_positions(current_pos, distance, row_modifier, col_modifier, index) ){
            let next_row: number = current_pos.row + (row_modifier * index)
            let next_col: number = current_pos.col + (col_modifier * index)
            let pos_at_point: string = SquareID.pos_at_point({ row: next_row, col: next_col })
            moves_in_direction.push(pos_at_point)
            index++
        }

        this.add_moves_in_direction_to_all_possible_moves(moves_in_direction, possible_moves)
        this.check_piece_that_stopped_loop(current_pos, row_modifier, col_modifier, index)
    }

    public conditions_to_continue_adding_positions(
        current_pos: GridPoint,
        move_distance: number,
        row_modifier: number,
        col_modifier: number,
        distance: number): boolean {
        let new_row: number = current_pos.row + (row_modifier * distance)
        let new_col: number = current_pos.col + (col_modifier * distance)

        if (!Board.are_coors_within_board_bounds(new_row, new_col)) {
            return false
        }

        if (!this.new_square_is_empty({row: new_row, col: new_col})) {
            return false
        }

        if (distance > move_distance) {
            return false
        }

        return true
    }

    public add_moves_in_direction_to_all_possible_moves(moves_in_direction: string[], possible_moves: string[]): void {
        if (this.position_restrictions.length > 0) {
            possible_moves.push(...moves_in_direction.filter(move => this.position_restrictions.includes(move)))
            this.can_block_check = true
        } else if(Piece.position_restrictions.length > 0 && this.type != PieceType.king) {
            possible_moves.push(...moves_in_direction.filter(move => Piece.position_restrictions.includes(move)))
            this.can_block_check = true
        } else {
            possible_moves.push(...moves_in_direction)
        }
    }

    public new_square_is_empty(point: GridPoint): boolean {
        return SquareGrid.piece_by_grid_point(point)! === undefined
    }

    public highlight_target(grid_point: GridPoint): void {
        let square: Square | undefined
        let piece: Piece | undefined
        if (Board.are_coors_within_board_bounds(grid_point.row, grid_point.col)) {
            square = SquareGrid.square_by_grid_point(grid_point)
            piece = square.piece_attached_to_square()
        }
        if (square != undefined && piece != undefined) {
            if (piece.color != this.color) {
                this.possible_moves.push(square.square_id)
                square.add_border()
            }
        }
        this.piece_specific_highlight_steps()
    }

    //Function definition to be used by subclasses
    public piece_specific_highlight_steps(): void {
    }

    public check_piece_that_stopped_loop(current_pos: GridPoint, row_modifier: number, col_modifier: number, distance: number): void {
        switch (this.type) {
            case PieceType.pawn:
                this.highlight_target({
                    row: current_pos.row - 1,
                    col: current_pos.col - 1
                })
                this.highlight_target({
                    row: current_pos.row - 1,
                    col: current_pos.col + 1
                })
                break

            case PieceType.king:
                this.highlight_target({
                    row: current_pos.row + (row_modifier),
                    col: current_pos.col + (col_modifier)
                })
                break

            default:
                this.highlight_target({
                    row: current_pos.row + (row_modifier * distance),
                    col: current_pos.col + (col_modifier * distance)
                })
                break
        }
    }
}