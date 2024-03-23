export default class MessageStyles {
	public static square_style(): Element {
		let style = document.createElement('style')
		style.innerHTML = `
            .message_container {
                background-color: #4f545c;
                border: solid 3px #ADADAD;
                height: 300px;
                width: 500px;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
			`

		return style
	}

    public static shadow_styles() {
        let style = document.createElement('style')
		style.innerHTML = `
            .message_button {
                display: inline-block;  
                outline: none;
                cursor: pointer;
                border-radius: 3px;
                font-size: 14px;
                font-weight: 500;
                line-height: 16px;
                padding: 2px 16px;
                height: 32px;
                width: 80%;
                min-width: 60px;
                min-height: 32px;
                border: none;
                color: #fff;
                background-color: #ADADAD;
                transition: background-color .17s ease,color .17s ease;
                margin: 20px
            }

            .header {
                text-align: center;
                padding-top: 20px;
                font-family: Verdana;
                color: #FFF
            }
			`

		return style
    }
}