export default class TestStyles {
	public static test_style(): Element {
		let style = document.createElement('style')
		style.innerHTML = `
      .passed {
        width: 300px;
        height: 50px;
        background-color: #73BE73;
        color: white;
        text-align: center;
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

      .test_list {
        width: calc(20% - 10px); /* Adjust width based on the number of columns you want */
        margin-bottom: 20px; /* Adjust margin between items */
        text-align: center;
      }

      .test_view {
        display: flex;
        justify-content: space-between; /* or space-evenly */
        flex-wrap: wrap;
      }
      `

		return style
	}
}