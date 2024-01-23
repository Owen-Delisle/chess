import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections } from "../piece_directions"

export default class Pawn extends Piece implements Piece_Interface {
    move_distance: number
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType) {
        super(title, pos, svg)
        this.type = type
        this.move_distance = 1
        this.directions = [
            PieceDirections.north,
            PieceDirections.north_east,
            PieceDirections.north_west,
        ]
    }

    public calculate_possible_moves(): Array<[number, number]> | undefined {
        console.log("Pawn Piece")
        let current_position: [number, number] | undefined
        current_position = SquareGrid.position_by_piece_id(this.title)
        let arr: Array<[number, number]> | undefined = undefined

        if (current_position !== undefined) {
            return this.possible_moves_arr(current_position)
        }
        return arr
    }

    private possible_moves_arr(current_pos: [number,number]): Array<[number, number]> {
        let possible_moves: Array<[number, number]> = []
        console.log(current_pos)
        this.directions.forEach(direction => {
            switch(direction) {
                case PieceDirections.north:
                    this.move_north(current_pos, possible_moves)
                    break;
                case PieceDirections.north_east:
                    this.move_north_east(current_pos, possible_moves)
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

    private move_north(current_pos: [number, number], possible_moves: Array<[number, number]>) {
        if(SquareGrid.square_grid[current_pos[0]-1][current_pos[1]].piece == undefined) {
            possible_moves.push([current_pos[0]-1, current_pos[1]])
        }
    }

    private move_north_east(current_pos: [number, number], possible_moves: Array<[number, number]>) {
        if(SquareGrid.square_grid[current_pos[0]-1][current_pos[1]-1].piece != undefined) {
            possible_moves.push([current_pos[0]-1, current_pos[1]-1])
        }
    }

    private move_north_west(current_pos: [number, number], possible_moves: Array<[number, number]>) {
        if(SquareGrid.square_grid[current_pos[0]-1][current_pos[1]+1].piece != undefined) {
            possible_moves.push([current_pos[0]-1, current_pos[1]+1])
        }
    }
}