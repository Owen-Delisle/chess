export default class MessageStyles {
	public static square_style(): Element {
		let style = document.createElement('style')
		style.innerHTML = `
            .message_container {
                background-color: hotpink;
                height: 500px;
                width: 500px;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
            }
			`

		return style
	}
}