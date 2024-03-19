export default class SquareStyles {
	public static square_style(): Element {
		let style = document.createElement('style')
		style.innerHTML = `
			.black {
				height: 100px;
				width: 100px;
				background-color: #B58863;
				position: relative;
				box-sizing: border-box
				}
				.white {
				height: 100px;
				width: 100px;
				background-color: #F0D9B5;
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
				.big-message {
					font-size: 36px; /* Adjust font size */
					text-align: center;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					margin: 0;
					z-index: 1;
					background-color: grey;
				  }
				`

		return style
	}
}
