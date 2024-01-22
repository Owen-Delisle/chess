export default class PieceStyles {
  public static piece_style(): Element {
    let style = document.createElement("style")
    style.innerHTML = `
      .piece {
        height: 80px;
        width: 80px;
        position: absolute;
        top: 65%;
        left: 57%;
        margin: -50px 0 0 -50px;
      }`

    return style
  }
}