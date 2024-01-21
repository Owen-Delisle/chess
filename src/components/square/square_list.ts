import type Square from "./square"

export default class SquareList {
    public static square_list: Square[] = []

    public static add_square_to_list(new_square: Square): void {
        this.square_list.push(new_square)
    }
}