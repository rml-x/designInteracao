function carregarHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.header').innerHTML = data;
        });
}

function carregarFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.footer').innerHTML = data;
        });
}

function adicionarQuadrado(){
    console.log('adicionarQuadrado called');
    let textoQuadrado = document.querySelector("#texto").value;
    let novoQuadrado = document.createElement('div');
    novoQuadrado.className = 'quadrado';
    novoQuadrado.textContent = textoQuadrado;
    novoQuadrado.style.color = selectedColor;
    novoQuadrado.style.backgroundColor = selectedColorSquare;
    novoQuadrado.style.borderColor = selectedColorSquare;
    painel.appendChild(novoQuadrado);
}

function removerQuadrado(){
    let todosQuadrados = document.querySelectorAll(".quadrado");
    let quadradoEscolhido = parseInt(document.querySelector("#escolhido").value)-1;
    if (todosQuadrados[quadradoEscolhido]) {
        todosQuadrados[quadradoEscolhido].remove()
    }
}
function alterarFonte(){
    let todosQuadrados = document.querySelectorAll(".quadrado");
    let quadradoEscolhido = parseInt(document.querySelector("#escolhido").value)-1;
    if (todosQuadrados[quadradoEscolhido]) {
        todosQuadrados[quadradoEscolhido].style.fontSize = document.querySelector("#fontSizeButton").value + "px";
    }
}

function alterarQuadrado(){
    let todosQuadrados = document.querySelectorAll(".quadrado");
    let quadradoEscolhido = parseInt(document.querySelector("#escolhido").value)-1;
    if (todosQuadrados[quadradoEscolhido]) {
        const tamanho = document.querySelector("#SquareSizeButton").value;
        todosQuadrados[quadradoEscolhido].style.width = tamanho + "px";
        todosQuadrados[quadradoEscolhido].style.height = tamanho + "px";
    }
}

function alterarCorQuadrado(){
    selectedColorSquare = document.querySelector("#corquadrado").value;
}
function alterarCorFonte(){
    selectedColor = document.querySelector("#corfonte").value;
}

function uploadImageFunc(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            if (!cardImageElement) {
                cardImageElement = document.createElement('img');
                card.appendChild(cardImageElement);
            }
            cardImageElement.src = e.target.result;
            cardImageElement.style.width = '50%';    
        };  
    }
}

function removeImageFunc() {
    if (cardImageElement) {
        card.removeChild(cardImageElement);
        cardImageElement = null;
        uploadImageButton.value = '';
    }
}

//Main
const card = document.querySelector('#cardId');
const uploadImageButton = document.querySelector('#selectImageId');
const removeImageButton = document.querySelector('#removeImageId');
let cardImageElement = null;

const painel = document.querySelector('#painel');
const adicionarButton = document.querySelector('#adicionarButton');
const removerButton = document.querySelector('#removerButton');
const fontSizeButton = document.querySelector('#fontSizeButton');
const squareSizeButton = document.querySelector('#SquareSizeButton');
const corfonte = document.querySelector('#corfonte');
const corquadrado = document.querySelector('#corquadrado');

let selectedColor = '#000000';
let selectedColorSquare ='#000000';

if (uploadImageButton) {
    uploadImageButton.addEventListener('change', uploadImageFunc);
}
if (removeImageButton) {
    removeImageButton.addEventListener('click', removeImageFunc);
}
if (adicionarButton) {
    adicionarButton.addEventListener('click', adicionarQuadrado);
}
if (removerButton) {
    removerButton.addEventListener('click', removerQuadrado);
}
if (fontSizeButton) {
    fontSizeButton.addEventListener('input', alterarFonte);
}
if (squareSizeButton) {
    squareSizeButton.addEventListener('input', alterarQuadrado);
}
if (corfonte) {
    corfonte.addEventListener('input', alterarCorFonte);
}
if (corquadrado) {
    corquadrado.addEventListener('input', alterarCorQuadrado);
}

window.onload = () => {
    carregarHeader();
    carregarFooter();
};
