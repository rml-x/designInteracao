
const prova = {

    titulo: "Prova de Design de Interação",

    questoes: [
        {
            enunciado: "O que é affordance?",
            alternativas: [
                "A cor predominante de uma interface",
                "A propriedade de um objeto que sugere como ele deve ser usado",
                "Um tipo de fonte tipográfica"
            ],
            correta: 1  
        },

        {
            enunciado: "Assinale a alternativa que apresenta uma forma utilizada na avaliação preditiva para avaliar a usabilidade de uma interface: ",
            alternativas: [
                "Realização de conversas informais",
                "Utilização de heurísticas",
                "Prototipação"
            ],
            correta: 1  
        },

        {
            enunciado: "Assinale a alternativa que NÃO apresenta uma melhoria de usabilidade na web proporcionada pela evolução tecnológica: ",
            alternativas: [
                "Melhoria na velocidade de downloads, devido ao advento de tecnologias de banda larga.",
                "Melhorias nos navegadores, que “aprenderam” a imprimir frames e a fazer funcionar o botão “voltar”.",
                "Adequação de conteúdos ao ambiente web, tornando os textos menores e a leitura mais dinâmica. "
            ],
            correta: 2 
        },

        
    ]
};

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

const todasQuestoesHTML = prova.questoes.map((q, i) => 
    gerarQuestaoHTML(q, i)
).join('');





class MinhaProva extends HTMLElement {

    constructor() {

        super();
        const shadow = this.attachShadow({ mode: 'open' });

        
        shadow.innerHTML = `

            <style>

            p, h2, label, #resultado {
                display: block;
                margin: 5px 0;
                padding: 0px 14px;
            }

            #corrigir {
                margin: 14px;
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
            }


            #corrigir:hover { background: #1d4ed8; }

            #reiniciar {

                margin: 14px;
                width: 100%;
                padding: 12px;
                background: #0a3f09
                color: white;
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

            </style>
            

            <h2>${prova.titulo}</h2>

            ${todasQuestoesHTML}

            <br>
            <button id = "corrigir" >Corrigir</button>

            <div id="resultado"></div>
        `

        shadow.querySelector('button').addEventListener('click', () => {

            let acertos = 0;
            let resultadoHTML = '';

            const resultado = shadow.querySelector('#resultado');

            prova.questoes.forEach((questao, i) => {

                const marcado = shadow.querySelector(`input[name="q${i}"]:checked`);

                if (marcado && Number(marcado.value) === questao.correta) {
                    acertos = acertos + 1;
                }

                 const respostaUsuario = marcado ? questao.alternativas[marcado.value] : "Não respondida";
                 const respostaCorreta = questao.alternativas[questao.correta];

                 resultadoHTML += `
                    <div id = "resultado">
             
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

            
            shadow.querySelector('#reiniciar').addEventListener('click', () => {

                shadow.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.checked = false;
                });
                
                resultado.innerHTML = '';
            });


        });

    }
}

customElements.define('minha-prova', MinhaProva);