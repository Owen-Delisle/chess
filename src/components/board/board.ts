export default class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<p>Hello, World</p>`
  }
}

// Register the custom element
customElements.define('my-custom-element', MyCustomElement);