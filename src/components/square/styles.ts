export default class SquareStyles {
  public static square_style(): Element {
    let style = document.createElement("style")
    style.innerHTML = `
    .black {
      height: 100px;
      width: 100px;
      background-color: #1FE5DF;
      position: relative;
      }
      .white {
        height: 100px;
        width: 100px;
        background-color: #D8ECEC;
        position: relative;
      }
      .row {
        height: 100px;
        width: 800px;
        display: flex;
      }
      .container {
        height: 800px;
        width: 800px;
        box-sizing: border-box;
        border: 1px solid #000;
        margin: 0 auto;
      }
      .p {
        position: absolute;
      }
      `

    return style
  }
}