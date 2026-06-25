
// Recado: apesar de não estar nos requisitos
// do trabalho que dizia para utilizar 1 api 
// nessa pagina, quis fazer com que a experiencia
// do usuario para pesquisar a cidade fosse mais 
// facil entao optei por utilizar duas apis, uma para 
// pesquisar a cidade por nome, que passa esse valor para
// a proxima que entao traz as informações meteorologicas.
// ao inves do usuario precisar introduzir o id da cidade.

let cityCodePersistencia = 0;

function setSearch(form) {

    const cityNameInput = document.getElementById("CityName");
    const CityName = cityNameInput.value;

    const url = `https://brasilapi.com.br/api/cptec/v1/cidade/${CityName}`;

    fetch(
        url,
        {            
            headers: { "Content-Type": "application/json" },            
            method: "GET",
        }
    )
    .then(data => {
        if (!data.ok) {
            throw new Error(`error! Status: ${data.status}`);
        }
        return data.json();
    })
    .then((json) => {

       
        if (json.length === 0) {
            throw new Error("cidade não encontrada!!");
        }

        const htmlTemplate= json.map( item => {
            return `
            <style>
                .cidade-card:hover {
                    border:1px solid ;
                }
            </style>
            <div class="cidade-card" onclick="setAction('${item.id}','${item.nome}')">
                <p>${item.nome}, ${item.estado}, ${item.regiao}</p>
            </div>
            `;
        });

        const finalHtml = htmlTemplate.join('');
        document.getElementById('cidade').innerHTML = finalHtml;
        
    })
    .catch(error => {
        console.error(error);
        document.getElementById('cidade').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
    return false;

}


function setAction(cityCode, CityName) {

    cityCodePersistencia = cityCode;


    const cityNameLocal = document.getElementById('CityName').value = CityName;
    const daysInput = document.getElementById("days");
    const days = daysInput.value;

    const url = `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}/${days}`;

    document.getElementById('cidade').innerHTML = '';

    fetch(
        url,
        {            
            headers: { "Content-Type": "application/json" },            
            method: "GET",
        }
    )
    .then(data => {
        if (!data.ok) {
            throw new Error(`error! Status: ${data.status}`);
        }
        return data.json();
    })
    .then((json) => {

        if (!json.cidade) {
            throw new Error("sem resultado!!");
        }

        const cabecalho = `<strong>${json.cidade} - ${json.estado}, atualizado em: ${json.atualizado_em}</strong><br><hr>`;

        const htmlTemplate = json.clima.map( item => {
            return `

            <style>
                .previsao-card{
                    margin-bottom:20px;
                    background-color:#3453;
                    border-radius:10px;
                }
            </style>

            <div class="previsao-card">
                <p> 
                    <strong> Data: ${item.data} </strong><br>
                    Condição: ${item.condicao_desc}<br>
                    Temperatura Mínima: ${item.min} ºC<br>
                    Temperatura Máxima: ${item.max} ºC<br>
                    Indice UV: ${item.indice_uv}<br>
                </p><br>
            </div>
            `;
        });

        const finalHtml = cabecalho + htmlTemplate.join('');
        document.getElementById('response').innerHTML = finalHtml;
    })
    .catch(error => {
        console.error(error);
        document.getElementById('response').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
    return false;
}

document.getElementById('days').addEventListener('input', () => {
    if (cityCodePersistencia !== 0) {
        setAction(cityCodePersistencia, document.getElementById('CityName').value);
    }
});
