import Piece from '../../components/piece/piece'
import { PieceType } from '../../components/piece/piece_types'
import { Color } from '../../components/piece/color'
import { RookType } from '../../components/piece/pieces/rook'
import { GridPoint } from '../../global_types/grid_point'
import SquareID from '../../components/square/square_id'
import SquareGrid from '../square_grid'

import King from '../../components/piece/pieces/king'
import piece_factory from '../../components/piece/piece_factory/piece_factory'

export default class PieceList {
	private static number_of_queens: number = 2

	public static piece_list: Piece[] = [
		piece_factory('king_b', 'E8', PieceType.king, Color.black),
		piece_factory('king_w', 'E1', PieceType.king, Color.white),

		piece_factory('queen_b', 'D8', PieceType.queen, Color.black),
		piece_factory('queen_w', 'D1', PieceType.queen, Color.white),

		piece_factory('bishop_b1', 'C8', PieceType.bishop, Color.black),
		piece_factory('bishop_w1', 'C1', PieceType.bishop, Color.white),
		piece_factory('bishop_b2', 'F8', PieceType.bishop, Color.black),
		piece_factory('bishop_w2', 'F1', PieceType.bishop, Color.white),

		piece_factory('knight_w1', 'B1', PieceType.knight, Color.white),
		piece_factory('knight_b1', 'B8', PieceType.knight, Color.black),
		piece_factory('knight_b2', 'G8', PieceType.knight, Color.black),
		piece_factory('knight_w2', 'G1', PieceType.knight, Color.white),

		piece_factory('rook_b1', 'A8', PieceType.rook, Color.black, RookType.long_rook),
		piece_factory('rook_w1', 'A1', PieceType.rook, Color.white, RookType.long_rook),
		piece_factory('rook_b2', 'H8', PieceType.rook, Color.black, RookType.short_rook),
		piece_factory('rook_w2', 'H1', PieceType.rook, Color.white, RookType.short_rook),

		piece_factory('pawn_b1', 'A7', PieceType.pawn, Color.black),
		piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
		piece_factory('pawn_b2', 'B7', PieceType.pawn, Color.black),
		piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),
		piece_factory('pawn_b3', 'C7', PieceType.pawn, Color.black),
		piece_factory('pawn_w3', 'C2', PieceType.pawn, Color.white),
		piece_factory('pawn_b4', 'D7', PieceType.pawn, Color.black),
		piece_factory('pawn_w4', 'D2', PieceType.pawn, Color.white),
		piece_factory('pawn_b5', 'E7', PieceType.pawn, Color.black),
		piece_factory('pawn_w5', 'E2', PieceType.pawn, Color.white),
		piece_factory('pawn_b6', 'F7', PieceType.pawn, Color.black),
		piece_factory('pawn_w6', 'F2', PieceType.pawn, Color.white),
		piece_factory('pawn_b7', 'G7', PieceType.pawn, Color.black),
		piece_factory('pawn_w7', 'G2', PieceType.pawn, Color.white),
		piece_factory('pawn_b8', 'H7', PieceType.pawn, Color.black),
		piece_factory('pawn_w8', 'H2', PieceType.pawn, Color.white),
	]

	public static pieces_by_color(color: Color): Piece[] {
		return this.piece_list.filter((piece) => piece.color === color)
	}

	public static pieces_by_other_color(color: Color): Piece[] {
		const other_color: Color = color === Color.white ? Color.black : Color.white
		return this.piece_list.filter((piece) => piece.color === other_color)
	}

	public static piece_by_position(pos: string): Piece | undefined {
		let p: Piece | undefined
		this.piece_list.forEach((piece) => {
			if (piece.pos === pos) {
				p = piece
			}
		})
		return p
	}

	public static piece_by_id(id: string): Piece | undefined {
		let p: Piece | undefined
		this.piece_list.forEach((piece) => {
			if (piece.title == id) {
				p = piece
			}
		})
		return p
	}

	public static list_of_pieces_by_type(type: PieceType): Piece[] {
		let typed_piece_list: Piece[] = []
		this.piece_list.forEach((piece) => {
			if (piece.type == type) {
				typed_piece_list.push(piece)
			}
		})

		return typed_piece_list
	}

	public static remove_piece_by_id(id: string): void {
		const index = this.piece_list.findIndex((piece) => piece.title === id)
		if (index != -1) {
			this.piece_list.splice(index, 1)
		}
	}

    public static remove_piece_by_position(pos: string) {
        const index = this.piece_list.findIndex((piece) => piece.pos === pos)
        if (index != -1) {
			this.piece_list.splice(index, 1)
		}
    }

    public static remove_piece_by_point(point: GridPoint): void {
        const position = SquareID.pos_at_point(point)
        this.remove_piece_by_position(position)
    }

	public static king_by_color(color: Color): King {
		switch (color) {
			case Color.black:
				return this.piece_by_id('king_b') as King
			case Color.white:
				return this.piece_by_id('king_w') as King
		}
	}

	public static clear_position_restrictions_property(): void {
		Piece.position_restrictions = []
		PieceList.piece_list.forEach((piece) => {
			piece.position_restrictions = []
		})
	}

	public static swap_with_queen(piece_id: string, position: string, color: Color) {
		this.remove_piece_by_id(piece_id)
		this.piece_list.push(
			piece_factory(`queen_${++this.number_of_queens}`, position, PieceType.queen, color)
		)
	}

    public static any_pawns_left_in_game(): boolean {
        return this.piece_list.some(piece => piece.type === PieceType.pawn)
    }

    public static material_value_in_game(): number {
        return this.piece_list.map(piece => piece.piece_value).reduce((acc, value) => acc + value, 0);
    }

    public static only_same_square_color_bishops_left_in_game(): boolean {
        if(this.piece_list.length !== 4) {
            return false
        }

        const bishops = this.piece_list.filter(piece => piece.type === PieceType.bishop)
        if(bishops.length !== 2) {
            return false
        }

        if(bishops[0].color === bishops[1].color) {
            return false
        }

        const bishop_1_square_color = SquareGrid.square_by_board_position(bishops[0].pos)!.color
        const bishop_2_square_color = SquareGrid.square_by_board_position(bishops[1].pos)!.color

        if(bishop_1_square_color !== bishop_2_square_color) {
            return false
        }

        return true
    }

}
