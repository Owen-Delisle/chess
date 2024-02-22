import Assert from "./assert"

export default class Test extends HTMLElement {
    title: string
    assert: Assert

	constructor(title: string, assert: Assert) {
		super()
        this.title = title
        this.assert = assert
		this.render()
	}

	render(): void {
        this.append_children()
	}

    private append_children(): Promise<void> {
		return new Promise(async (resolve) => {
			let div_node: Element = document.createElement('div')
			let title_node: Element = document.createElement('p')

			title_node.className = this.assert.result
            title_node.innerHTML = `${this.title}`
			
			div_node.appendChild(title_node)

            this.appendChild(div_node)

			resolve()
		})
	}
}

customElements.define('custom-test-element', Test)