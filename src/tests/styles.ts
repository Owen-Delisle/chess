export default class TestStyles {
	public static test_style(): Element {
		let style = document.createElement('style')
		style.innerHTML = `
      .passed {
        width: 300px;
        height: 50px;
        background-color: #73BE73;
        color: white;
        text-align: left;
        line-height: 50px;
        font-size: 18px;
      }
      
      .failed {
        width: 300px;
        height: 50px;
        background-color: red;
        color: white;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }
      `

		return style
	}
}