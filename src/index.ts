import Board from './components/board/board'

export default class Index extends HTMLElement {
    constructor() {
      super();
      // this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      let board: Board = new Board()
      board.render()
      this.innerHTML = `
        ${board.innerHTML}
      `;
    }
  }
  
  // Register the custom element
  customElements.define('index-element', Index);
