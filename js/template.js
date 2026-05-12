

class MeuTemplate extends HTMLElement{

    constructor(){
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.getElementById('meu-template');
        const clone = template.content.cloneNode(true);
        shadow.appendChild(clone);

    }
    


}

customElements.define('meu-template', MeuTemplate);