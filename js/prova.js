
function gerarQuestaoHTML(questao, indice) {

    const alternativasHTML = questao.alternativas.map((alt, i) => `
        <label>
            <input type="radio" name="q${indice}" value="${i}">
            ${alt}
        </label>
    `).join('');

    return `
        <div class="questao">
            <p>${indice + 1}. ${questao.enunciado}</p>
            ${alternativasHTML}
        </div>
    `;
}


class MinhaProva extends HTMLElement {

    async carregarProva() {
        
        try {
             
            const response = await fetch('prova.json');   

            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const prova = await response.json();
            console.log(prova);

            const todasQuestoesHTML = prova.questoes.map((q, i) => gerarQuestaoHTML(q, i)).join('');

            this.shadow.innerHTML = `

                <style>

                :host {
                    display: block;
                    width: 100%;
                    box-sizing: border-box;
                    padding-bottom: 80px;
                }

                p, h2, label, #resultado {
                    display: block;
                    margin: 5px 0;
                    padding: 0px 14px;
                }

                #corrigir {
                    margin: 14px auto;
                    width: 100%;
                    padding: 12px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 20px;
                    font-weight: bold;
                    transition: background 0.2s;
                    margin-bottom: 40px;
                }


                #corrigir:hover { background: #1d4ed8; }

                #reiniciar {

                    margin: 14px auto;
                    width: 100%;
                    padding: 12px;
                    color: black;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 20px;
                    font-weight: bold;
                    transition: background 0.2s;
                }

                #resultado{
                    padding: 10px;
                }

                @media (max-width: 768px) {

                    :host {
                        display: block;
                        width: 100%;
                    }

                    p, h2, label {
                        font-size: 18px; 
                    }

                    .questao {
                        width: 100%; 
                        box-sizing: border-box;
                    }

                    #corrigir, #reiniciar {
                        box-sizing: border-box;
                        max-width: 100%;
                    }
                }

                </style>
                

                <h2>${prova.titulo}</h2>

                ${todasQuestoesHTML}

                <br>
                <button id = "corrigir" >Corrigir</button>

                <div id="resultado"></div>
            `

        

            this.shadow.querySelector('button').addEventListener('click', () => {

                let acertos = 0;
                let resultadoHTML = '';

                const resultado = this.shadow.querySelector('#resultado');

                prova.questoes.forEach((questao, i) => {

                    const marcado = this.shadow.querySelector(`input[name="q${i}"]:checked`);

                    if (marcado && Number(marcado.value) === questao.correta) {
                        acertos = acertos + 1;
                    }

                    const respostaUsuario = marcado ? questao.alternativas[marcado.value] : "Não respondida";
                    const respostaCorreta = questao.alternativas[questao.correta];

                    resultadoHTML += `
                        <div class="item-resultado">
                            <p><strong>${questao.enunciado}</strong></p>
                            <p>Sua resposta: ${respostaUsuario}</p>
                            <p>Resposta correta: ${respostaCorreta}</p>
                        </div>
                        `;

                    

                });

                let responderNovamente = `<button id="reiniciar">Responder novamente</button>`;

                

                if (acertos === prova.questoes.length) {
                    resultado.innerHTML = `<p>Você acertou todas as questões!</p> 
                    <p>Correção: </p>` +  responderNovamente + resultadoHTML;


                }else { 
                    resultado.innerHTML =  `<p>Você acertou ${acertos} de ${prova.questoes.length} questões!</p>  
                    <p>Correção: </p>`+  responderNovamente + resultadoHTML;

                }

                
                this.shadow.querySelector('#reiniciar').addEventListener('click', () => {

                    this.shadow.querySelectorAll('input[type="radio"]').forEach(input => {
                        input.checked = false;
                    });
                    
                    resultado.innerHTML = '';
                });


            });
            
            
        } 
        catch (error) {
            console.error('Fetch failed:', error);
        }
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.carregarProva();
    }
}

customElements.define('minha-prova', MinhaProva);