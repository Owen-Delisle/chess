export default class Piece {
    title: string
    pos: string
    svg: string
    taken: boolean = false

    constructor(title: string, pos: string, svg: string) {
        this.title = title
        this.pos = pos
        this.svg = svg
    }
}