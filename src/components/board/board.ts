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
    this.setup_game_board()
  }

  private add_styles_to_dom() {
    let styles: Styles = new Styles()
    this.innerHTML += `${styles.container}`
    this.innerHTML += `${styles.row}`
    this.innerHTML += `${styles.black_square}`
    this.innerHTML += `${styles.white_square}`
  }

  private async setup_game_board(): Promise<void> {
    let response = await this.board_generator()
    console.log(response)
    this.add_event_listeners()
  }

  private board_generator(): Promise<string> {
    return new Promise(resolve => {
      let next_square: Square
      let board_string: string = ``

      board_string += `<div class="container" id="container">`
      board_string += `<div class="row">`

      for (let i = 0; i < 64; i++) {
        next_square = this.color_picker(i)
        next_square.render()
        if (i % 8 === 0 && i > 1) board_string += `</div><div class="row">`
        board_string += `${next_square.innerHTML}`
      }

      board_string += `</div>`
      board_string += `</div>`

      this.innerHTML += board_string
      resolve("Finished Generating Board")
    })
  }

  private add_event_listeners(): void {
    let shadowRoot = document.querySelector("index-element")?.shadowRoot
    let squares = shadowRoot?.querySelectorAll("div.black, div.white")
    squares?.forEach(square => {
      square.addEventListener("click", () => console.log(square.id))
    })
  }

  private color_picker(i: number): Square {
    let square: Square
    if (i % 2 === this.current_row(i)) {
      square = new Square(Color.black, i)
    } else {
      square = new Square(Color.white, i)
    }

    return square
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