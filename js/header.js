
class MeuHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>

               
             :host {
                    display: block;
                    background-color: #192a46;
                }

                h1{
                    color: #ffffff;
                    padding: 20px ;
                    background-color: transparent;
                    margin: 0;

                }
                
                nav {
                
                    background-color: #192a46;
                    padding: 20px ;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .nav {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .nav ul li { 

                    display: inline;
                    
                }

                .nav ul li a { 
                        padding: 3px 12px; 
                        display: inline-block; 
                         
                        }


                .nav a {
                
                    color: #fff;
                    text-decoration: none;
                    font-size: 16px;~
                    transition: color 0.3s ease;
                }

                .nav a:hover {
                    color: #3183f5;
                }    


            </style>

            
            <h1>Design de Interação</h1>
            
            <nav>
            <ul class="nav">
                <li><a href="./index.html">Home</a></li>
                <li><a href="./cartao.html">Editor de Cartões</a></li>
                <li><a href="./prova.html">Prova On-line</a></li>
                <li><a href="./404.html">Trabalho 3</a></li>
            </ul>
            </nav>


        `;
    }
}

customElements.define('meu-header', MeuHeader);