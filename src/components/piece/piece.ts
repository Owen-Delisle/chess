export default class Piece {
    title: string
    pos: string
    svg: string
    image: HTMLImageElement

    constructor(title: string, pos: string, svg: string) {
        this.title = title
        this.pos = pos
        this.svg = svg
        this.image = this.imageBuilder()
    }

    imageBuilder(): HTMLImageElement {
        let image: HTMLImageElement = new Image()
        image.src = this.svg
        image.id = this.title
        image.className = "piece"

        return image
    }
}