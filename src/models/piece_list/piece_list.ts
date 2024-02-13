import Piece from '../../components/piece/piece'
import { PieceType } from '../../components/piece/piece_types'
import { Color } from '../../components/piece/color'
import { RookType } from '../../components/piece/pieces/rook'
import { GridPoint } from '../../global_types/grid_point'
import SquareID from '../../components/square/square_id'

import Bishop from '../../components/piece/pieces/bishop'
import King from '../../components/piece/pieces/king'
import Knight from '../../components/piece/pieces/knight'
import Pawn from '../../components/piece/pieces/pawn'
import Queen from '../../components/piece/pieces/queen'
import Rook from '../../components/piece/pieces/rook'

import Bishop_B_SVG from './assets/bishop-b.svg'
import Bishop_W_SVG from './assets/bishop-w.svg'
import King_B_SVG from './assets/king-b.svg'
import King_W_SVG from './assets/king-w.svg'
import Knight_B_SVG from './assets/knight-b.svg'
import Knight_W_SVG from './assets/knight-w.svg'
import Pawn_B_SVG from './assets/pawn-b.svg'
import Pawn_W_SVG from './assets/pawn-w.svg'
import Queen_B_SVG from './assets/queen-b.svg'
import Queen_W_SVG from './assets/queen-w.svg'
import Rook_B_SVG from './assets/rook-b.svg'
import Rook_W_SVG from './assets/rook-w.svg'

export default class PieceList {
	private static number_of_queens: number = 2

	public static piece_list: Piece[] = [
		//TODO -- WRONG PIECES, DELETE LATER
		    new Pawn('pawn_b1', 'E3', Pawn_B_SVG, PieceType.pawn, Color.black),
		//END TODO

		new King('king_b', 'E8', King_B_SVG, PieceType.king, Color.black),
		new King('king_w', 'E1', King_W_SVG, PieceType.king, Color.white),

		// new Queen('queen_b', 'D8', Queen_B_SVG, PieceType.queen, Color.black),
		// new Queen('queen_w', 'D1', Queen_W_SVG, PieceType.queen, Color.white),

		// new Bishop('bishop_b1', 'C8', Bishop_B_SVG, PieceType.bishop, Color.black),
		// new Bishop('bishop_w1', 'C1', Bishop_W_SVG, PieceType.bishop, Color.white),
		// new Bishop('bishop_b2', 'F8', Bishop_B_SVG, PieceType.bishop, Color.black),
		// new Bishop('bishop_w2', 'F1', Bishop_W_SVG, PieceType.bishop, Color.white),

		// new Knight('knight_b1', 'B8', Knight_B_SVG, PieceType.knight, Color.black),
		// new Knight('knight_w1', 'B1', Knight_W_SVG, PieceType.knight, Color.white),
		// new Knight('knight_b2', 'G8', Knight_B_SVG, PieceType.knight, Color.black),
		// new Knight('knight_w2', 'G1', Knight_W_SVG, PieceType.knight, Color.white),

		// new Rook('rook_b1', 'A8', Rook_B_SVG, PieceType.rook, Color.black, RookType.long_rook),
		// new Rook('rook_w1', 'A1', Rook_W_SVG, PieceType.rook, Color.white, RookType.long_rook),
		// new Rook('rook_b2', 'H8', Rook_B_SVG, PieceType.rook, Color.black, RookType.short_rook),
		// new Rook('rook_w2', 'H1', Rook_W_SVG, PieceType.rook, Color.white, RookType.short_rook),

		// new Pawn('pawn_b1', 'A7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w1', 'A2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b2', 'B7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w2', 'B2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b3', 'C7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w3', 'C2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b4', 'D7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w4', 'D2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b5', 'E7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w5', 'E2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b6', 'F7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w6', 'F2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b7', 'G7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w7', 'G2', Pawn_W_SVG, PieceType.pawn, Color.white),
		// new Pawn('pawn_b8', 'H7', Pawn_B_SVG, PieceType.pawn, Color.black),
		// new Pawn('pawn_w8', 'H2', Pawn_W_SVG, PieceType.pawn, Color.white),
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
		const svg: string = color === Color.white ? Queen_W_SVG : Queen_B_SVG
		this.remove_piece_by_id(piece_id)
		this.piece_list.push(
			new Queen(`queen_${++this.number_of_queens}`, position, svg, PieceType.queen, color),
		)
	}
}
