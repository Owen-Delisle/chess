export enum BlackOrWhite {
    black = 'black',
    white = 'white'
}

export function not_color(color: BlackOrWhite): BlackOrWhite {
	return color == BlackOrWhite.white ? BlackOrWhite.black : BlackOrWhite.white
}