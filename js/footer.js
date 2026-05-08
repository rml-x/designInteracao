
class MeuFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>


            
            .p {
                color: #ffffff
                font-size: 14px;
                background-color: transparent;
                margin: 0;
               
            }

            :host {
                display: block;
                background-color: #192a46;
                
            }

               
             
            </style>

            
           <p>&copy; 2026. Trabalho de Trabalho Design de Interação - TADS IFRS. Todos os direitos reservados.</p>
            
            


        `;
    }
}

customElements.define('meu-footer', MeuFooter);