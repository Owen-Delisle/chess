export enum BlackOrWhite {
    black = 'black',
    white = 'white'
}

export function not_color(color: BlackOrWhite): BlackOrWhite {
	return color == BlackOrWhite.white ? BlackOrWhite.black : BlackOrWhite.white
}

export function black_or_white_by_index(index: number): BlackOrWhite {
    return index === 0 ? BlackOrWhite.black : BlackOrWhite.white
}