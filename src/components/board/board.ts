import Square from '../square/square'
import { Color } from "../square/color"
import Styles from "../square/styles"

export default class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.add_styles_to_dom()
    this.innerHTML += this.board_generator()
  }

  private add_styles_to_dom() {
    let styles: Styles = new Styles()
    this.innerHTML += `${styles.container}`
    this.innerHTML += `${styles.row}`
    this.innerHTML += `${styles.black_square}`
    this.innerHTML += `${styles.white_square}`
  }

  private board_generator(): string {
    let next_square: Square
    let board_string: string = ``

    board_string += `<div class="container">`
    board_string += `<div class="row">`

    for (let i = 0; i < 64; i++) {
      next_square = this.color_picker(i)
      next_square.render()
      if (i % 8 === 0 && i > 1) board_string += `</div><div class="row">`
      board_string += `${next_square.innerHTML}`
    }

    board_string += `</div>`
    board_string += `</div>`

    return board_string
  }

  private color_picker(i: number): Square {
    if (i % 2 === this.current_row(i)) {
      return new Square(Color.black, i)
    } else {
      return new Square(Color.white, i)
    }
  }

  private current_row(i: number): number {
    let mod: number = 0

    if (i > 7 && i < 16) {
      mod = 1
    } else if (i > 23 && i < 32) {
      mod = 1
    } else if (i > 39 && i < 48) {
      mod = 1
    } else if (i > 55) {
      mod = 1
    }

    return mod
  }
}

customElements.define('board-element', Board);