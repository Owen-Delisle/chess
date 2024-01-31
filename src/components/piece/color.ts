export enum Color {
    black,
    white
}

export function not_color(color: Color): Color {
    return color == Color.white ? Color.black : Color.white
}