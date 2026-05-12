
class MeuFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
            
            
            p {
                text-align: center;
                font-size: 10px;
                color: white;
                margin: 0;
                padding: 40px; 
            }

            :host {
                display: grid;
                background-color: #192a46;
                
            }

            @media (max-width: 768px) {

                 :host {
                    display: block;
                    width: 100%;
                }

                p {
                    font-size: 18px;
                    padding-top:40px;
                }

                
            }

            </style>

            
           <p>&copy; 2026. Trabalho de Trabalho Design de Interação - TADS IFRS. Todos os direitos reservados.</p>
            
            


        `;
    }
}

customElements.define('meu-footer', MeuFooter);