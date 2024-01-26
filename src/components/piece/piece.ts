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

export default class Piece {
    title: string
    pos: string
    svg: string
    image: HTMLImageElement
    type?: PieceType
    color: Color
    grid_point: GridPoint | undefined

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

    public move_to(new_square: Square) {
        this.pos = new_square.square_id as string
    }

    public moves_list(
        current_pos: GridPoint, 
        possible_moves: GridPoint[], 
        move_distance: number,
        row_modifier: number,
        col_modifier: number
        ): void {
        this.build_possible_moves_list(
            move_distance,
            current_pos,
            possible_moves,
            row_modifier,
            col_modifier
        )
    }

    public build_possible_moves_list(
        move_distance: number,
        current_pos: GridPoint,
        possible_moves: GridPoint[],
        row_modifier: number,
        col_modifier: number,
    ): void {
        let distance = 1
        while (
            Piece.point_within_board_bounds
                (current_pos, (row_modifier*distance), (col_modifier*distance))
            &&
            SquareGrid.piece_by_grid_point
                ({
                    row: current_pos.row + (row_modifier*distance),
                    col: current_pos.col + (col_modifier*distance)
                }) === undefined
            &&
            distance < move_distance
        ) {
            possible_moves.push({
                row: current_pos.row + (row_modifier*distance),
                col: current_pos.col + (col_modifier*distance)
            })
            distance++
        }
    }

    public static point_within_board_bounds(
        current_pos: GridPoint,
        new_row: number,
        new_col: number): boolean {
        if (current_pos.row + new_row < Board.start_index) return false
        if (current_pos.row + new_row >= Board.row_size) return false

        if (current_pos.col + new_col < Board.start_index) return false
        if (current_pos.col + new_col >= Board.col_size) return false

        return true
    }
}