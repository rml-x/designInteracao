# Site - Disciplina de Design de Interação

Site desenvolvido para a disciplina de **Design de Interação**, do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS) do IFRS Campus Rio Grande, referente ao semestre 1/2026. O projeto reúne os trabalhos práticos produzidos ao longo do semestre, com foco em front-end, componentização e boas práticas de usabilidade.

🔗 **Acesse o site publicado:** [rml-x.github.io/Site-Disciplina-Design](https://rml-x.github.io/Site-Disciplina-Design/)

## Sobre a disciplina

Design de Interação é a área focada em projetar o comportamento e as interações entre usuários e produtos/serviços digitais (apps, sites, sistemas), definindo como as pessoas executam ações e como o sistema responde. O objetivo é criar experiências intuitivas, eficientes e agradáveis, com foco em usabilidade, feedback claro e fluidez — indo além da estética para garantir que o usuário alcance seus objetivos com facilidade.

## Estrutura do projeto

```
Site-Disciplina-Design/
├── estilo/          # Folhas de estilo (CSS)
├── img/              # Imagens utilizadas no site
├── js/                # Scripts e componentes (Web Components)
├── index.html         # Página inicial / sobre a disciplina
├── api1.html          # Trabalho envolvendo consumo de API
├── api2.html           # Trabalho envolvendo consumo de API
├── cartao.html         # Trabalho de componente "cartão"
├── prova.html           # Página de avaliação/prova interativa
└── prova.json            # Dados utilizados na prova
```

## Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript** (Web Components nativos: Custom Elements, Shadow DOM e `<template>`)

O site é construído com componentes reutilizáveis (`<meu-header>`, `<meu-footer>`, `<meu-template>`, `<minha-prova>`, entre outros), definidos via `customElements` e templates HTML, sem uso de frameworks externos.

## Como executar localmente

Por não depender de build tools, basta clonar o repositório e abrir o `index.html` em um navegador — ou servir os arquivos com um servidor local simples:

```bash
git clone https://github.com/rml-x/Site-Disciplina-Design.git
cd Site-Disciplina-Design
# usando Python, por exemplo
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Autora

Desenvolvido por **[Tiane (rml-x)](https://github.com/rml-x)**, estudante de TADS no IFRS Campus Rio Grande.
