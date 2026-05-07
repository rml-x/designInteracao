
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
            correta: 1  // índice da alternativa correta (começa em 0)
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
        // mais questões aqui...
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