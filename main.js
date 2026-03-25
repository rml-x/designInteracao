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

window.onload = () => {
    carregarHeader();
    carregarFooter();
};

const btnNovoTexto = document.getElementById('btnNovoTexto');
const containerElementos = document.getElementById('containerElementos');
const listaControles = document.getElementById('listaControles');
const corFundo = document.getElementById('corFundo');
const inputImagem = document.getElementById('inputImagem');
const cartao = document.getElementById('cartao');

let idCounter = 0;


function gerenciarMsgVazio() {
    const msg = document.querySelector('.empty-msg');
    if (containerElementos.children.length > 0) {
        if (msg) msg.style.display = 'none';
    } else {
        if (msg) msg.style.display = 'block';
    }
}


btnNovoTexto.addEventListener('click', () => {
    idCounter++;
    const id = `txt-${idCounter}`;

  
    const novaDiv = document.createElement('div');
    novaDiv.id = id;
    novaDiv.className = 'texto-dinamico';
    novaDiv.innerText = 'Clique na lateral para editar este texto...';
    novaDiv.style.fontSize = '24px'; // Tamanho padrão inicial
    novaDiv.style.color = '#1e293b';   // Cor padrão inicial
    containerElementos.appendChild(novaDiv);


    const itemControle = document.createElement('div');
    itemControle.className = 'item-controle';
    itemControle.id = `ctrl-${id}`;
    itemControle.innerHTML = `
        <input type="text" placeholder="Escreva sua mensagem..." id="input-${id}">
        <div style="display:flex; gap:10px; align-items:center; justify-content: space-between">
            <div style="display:flex; gap:5px; align-items:center">
                <input type="color" id="color-${id}" value="#1e293b" title="Cor do texto">
                <input type="range" id="size-${id}" min="12" max="80" value="24" title="Tamanho da fonte">
            </div>
            <button onclick="removerElemento('${id}')" style="color:red; border:none; background:none; cursor:pointer; font-size:0.8rem; font-weight:600">Remover</button>
        </div>
    `;
    listaControles.appendChild(itemControle);

 
    const inputField = document.getElementById(`input-${id}`);
    inputField.addEventListener('input', (e) => {
        novaDiv.innerText = e.target.value || ' '; 
    });
    
    document.getElementById(`color-${id}`).addEventListener('input', (e) => {
        novaDiv.style.color = e.target.value;
    });
    
    document.getElementById(`size-${id}`).addEventListener('input', (e) => {
        novaDiv.style.fontSize = e.target.value + 'px';
    });

    inputField.focus();
    gerenciarMsgVazio();
});


inputImagem.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        idCounter++;
        const id = `img-${idCounter}`;
        const reader = new FileReader();
        
        reader.onload = (e) => {
        
            const novaImg = document.createElement('img');
            novaImg.id = id;
            novaImg.src = e.target.result;
            novaImg.className = 'imagem-dinamica';
            containerElementos.appendChild(novaImg);

            const itemControle = document.createElement('div');
            itemControle.className = 'item-controle';
            itemControle.id = `ctrl-${id}`;
            itemControle.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center">
                    <span style="font-size:0.8rem; color:#64748b">Imagem inserida</span>
                    <button onclick="removerElemento('${id}')" style="color:red; border:none; background:none; cursor:pointer; font-size:0.8rem; font-weight:600">Remover Imagem</button>
                </div>
            `;
            listaControles.appendChild(itemControle);
            
            gerenciarMsgVazio();
            this.value = ''; 
        };
        reader.readAsDataURL(file);
    }
});


corFundo.addEventListener('input', () => {
    cartao.style.backgroundColor = corFundo.value;
});

function removerElemento(id) {
    const elementoNoCartao = document.getElementById(id);
    const controleNaLateral = document.getElementById(`ctrl-${id}`);
    
    if (elementoNoCartao) elementoNoCartao.remove();
    if (controleNaLateral) controleNaLateral.remove();
    
    gerenciarMsgVazio();
}


document.getElementById('btnLimpar').onclick = () => {
    containerElementos.innerHTML = '';
    listaControles.innerHTML = '<p class="empty-msg">Nenhum texto adicionado ainda.</p>';
    cartao.style.backgroundColor = '#ffffff';
    corFundo.value = '#ffffff';
    gerenciarMsgVazio();
};