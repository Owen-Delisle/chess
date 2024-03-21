import Piece from '../components/piece/piece'
import { PieceType } from '../components/piece/piece_types'
import { BlackOrWhite } from '../global_types/enums/black_or_white'
import { GridPoint } from '../global_types/grid_point'
import SquareID from '../components/square/square_id'
import SquareGrid from './square_grid'

import King from '../components/piece/pieces/king'
import piece_factory from '../components/piece/piece_factory/piece_factory'

import default_piece_list from './default_piece_list'

export default class PieceList {
	private number_of_queens: number = 2
	list: Piece[]
	square_grid: SquareGrid

	constructor(square_grid: SquareGrid) {
		this.list = default_piece_list()
		this.square_grid = square_grid
	}

	public pieces_by_color(color: BlackOrWhite): Piece[] {
		return this.list.filter((piece) => piece.color === color)
	}

	public pieces_by_other_color(color: BlackOrWhite): Piece[] {
		const other_color: BlackOrWhite = color === BlackOrWhite.white ? BlackOrWhite.black : BlackOrWhite.white
		return this.list.filter((piece) => piece.color === other_color)
	}

	public piece_by_position(pos: string): Piece | undefined {
		let p: Piece | undefined
		this.list.forEach((piece) => {
			if (piece.pos === pos) {
				p = piece
			}
		})
		return p
	}

	public piece_by_id(id: string): Piece | undefined {
		let p: Piece | undefined
		this.list.forEach((piece) => {
			if (piece.title == id) {
				p = piece
			}
		})
		return p
	}

	public list_of_pieces_by_type(type: PieceType): Piece[] {
		let typed_piece_list: Piece[] = []
		this.list.forEach((piece) => {
			if (piece.type == type) {
				typed_piece_list.push(piece)
			}
		})

		return typed_piece_list
	}

	public remove_piece_by_id(id: string): void {
		const index = this.list.findIndex((piece) => piece.title === id)
		if (index != -1) {
			this.list.splice(index, 1)
		}
	}

    public remove_piece_by_position(pos: string) {
        const index = this.list.findIndex((piece) => piece.pos === pos)
        if (index != -1) {
			this.list.splice(index, 1)
		}
    }

    public remove_piece_by_point(point: GridPoint): void {
        const position = SquareID.pos_at_point(point)
        this.remove_piece_by_position(position)
    }

	public king_by_color(color: BlackOrWhite): King {
		switch (color) {
			case BlackOrWhite.black:
				return this.piece_by_id('king_b') as King
			case BlackOrWhite.white:
				return this.piece_by_id('king_w') as King
		}
	}

	public clear_position_restrictions_property(): void {
		Piece.position_restrictions = []
		this.list.forEach((piece) => {
			piece.position_restrictions = []
		})
	}

	public swap_with_queen(position: string, color: BlackOrWhite) {
		this.remove_piece_by_position(position)
		this.list.push(
			piece_factory(`queen_${++this.number_of_queens}`, position, PieceType.queen, color)
		)
	}

    public any_pawns_left_in_game(): boolean {
        return this.list.some(piece => piece.type === PieceType.pawn)
    }

    public material_value_in_game(): number {
        return this.list.map(piece => piece.piece_value).reduce((acc, value) => acc + value, 0);
    }

    public only_same_square_color_bishops_left_in_game(): boolean {
        if(this.list.length !== 4) {
            return false
        }

        const bishops = this.list.filter(piece => piece.type === PieceType.bishop)
        if(bishops.length !== 2) {
            return false
        }

        if(bishops[0].color === bishops[1].color) {
            return false
        }

        const bishop_1_square_color = this.square_grid.square_by_board_position(bishops[0].pos)!.color
        const bishop_2_square_color = this.square_grid.square_by_board_position(bishops[1].pos)!.color

        if(bishop_1_square_color !== bishop_2_square_color) {
            return false
        }

        return true
    }
}
