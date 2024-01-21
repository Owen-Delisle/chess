export default class Piece {
    title: string
    pos: string
    svg: string
    image: string

    constructor(title: string, pos: string, svg: string) {
        this.title = title
        this.pos = pos
        this.svg = svg
        this.image = `
        <img src=${svg} class="piece" id="${title}"/>
        `
    }
}