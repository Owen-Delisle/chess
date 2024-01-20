export default class Styles {
    black_square: string
    white_square: string
    row: string
    container: string

    constructor() {
        this.black_square =
            `
            <style>
            .black {
            height: 100px;
            width: 100px;
            background-color: grey;
            position: relative;
            }
            </style>
          `
        this.white_square =
            `
        <style>
        .white {
            height: 100px;
            width: 100px;
            background-color: blue;
            position: relative;
          }
        </style>
        `

        this.row =
            `
        <style>
        .row {
            height: 100px;
            width: 800px;
            display: flex;
          }
        </style>
        `

        this.container = 
        `
        <style>
        .container {
            height: 800px;
            width: 800px;
            box-sizing: border-box;
            border: 1px solid #000;
            margin: 0 auto;
          }
          </style>
        `
    }
}