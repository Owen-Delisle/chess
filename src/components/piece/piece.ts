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
    is_blocking_check: boolean = false

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

    public build_possible_moves_list(
        current_pos: GridPoint,
        distance: number,
        row_modifier: number,
        col_modifier: number,
        restrictions: string[][]
        ): void {
        this.add_positions_to_list_in_direction_for_distance(current_pos, distance, row_modifier, col_modifier, this.possible_moves, restrictions)
    }

    public add_positions_to_list_in_direction_for_distance(
        current_pos: GridPoint,
        distance: number,
        row_modifier: number,
        col_modifier: number,
        possible_moves: string[],
        restrictions: string[][]
    ): void {
        let index: number = 1
        let moves_in_direction: string[] = []

        let must_block_check: boolean = false

        while (this.conditions_to_continue_adding_positions(current_pos,distance,row_modifier,col_modifier,index) && !must_block_check)
        {
            let next_row: number = current_pos.row + (row_modifier * index)
            let next_col: number = current_pos.col + (col_modifier * index)
            let pos_at_point: string = SquareID.pos_at_point({row: next_row, col: next_col})
            moves_in_direction.push(pos_at_point)
            index++

            must_block_check = this.must_move_to_block_check(next_row, next_col, restrictions)
        }
        
        this.add_direction_to_possible_moves(moves_in_direction, possible_moves, restrictions)
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
        return Board.are_coors_within_board_bounds(
            new_row,
            new_col
        )
        &&
        this.correct_conditions_of_piece_at_square
            (
                new_row,
                new_col
            ) 
        &&
        distance < move_distance
        &&
        this.is_blocking_check === false
    }

    private must_move_to_block_check(new_row: number, new_col: number, restrictions: string[][]): boolean {
        let stop: boolean = false
        if(restrictions.length > 0) {
            restrictions.forEach(restriction => {
                if(restriction.includes(SquareID.pos_at_point({row: new_row, col: new_col}))) {
                    stop = true
                }
            })
        }
        return stop
    }

    public add_direction_to_possible_moves(moves_in_direction: string[], possible_moves: string[], restrictions: string[][]): void {
        if(restrictions.length > 0) {
            restrictions.forEach(restriction => {
                restriction.forEach(r => {
                    if(moves_in_direction.includes(r)) {
                        possible_moves.push(moves_in_direction[moves_in_direction.length-1])
                    }
                })
            })
        } else {
            possible_moves.push(...moves_in_direction)
        }
    }

    public correct_conditions_of_piece_at_square(row: number, col: number): boolean {
        const grid_point: GridPoint = { row, col }
        return SquareGrid.piece_by_grid_point(grid_point)! === undefined
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

    // public set_blocking_check() {
    //     this.
    // }
}