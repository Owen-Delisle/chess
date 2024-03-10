export default class SquareStyles {
	public static square_style(): Element {
		let style = document.createElement('style')
		style.innerHTML = `
			.black {
				height: 100px;
				width: 100px;
				background-color: #1FE5DF;
				position: relative;
				box-sizing: border-box
				}
				.white {
				height: 100px;
				width: 100px;
				background-color: #D8ECEC;
				position: relative;
				box-sizing: border-box
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
				.dot {
				background-color: #0000FF;
				border-radius: 50%;
				height: 20px;
				width: 20px;
				position: absolute;
				top: 90%;
				left: 87%;
				margin: -50px 0 0 -50px;
				}
				`

		return style
	}
}
