import MyCustomElement from './components/board/board'

export default class Index extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      let el: MyCustomElement = new MyCustomElement()
      el.render()
      this.shadowRoot!.innerHTML = `
        ${el.innerHTML}
      `;
    }
  }
  
  // Register the custom element
  customElements.define('index-element', Index);
