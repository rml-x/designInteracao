
// Recado: apesar de não estar nos requisitos
// do trabalho que dizia para utilizar 1 api 
// nessa pagina, quis fazer com que a experiencia
// do usuario para pesquisar a cidade fosse mais 
// facil entao optei por utilizar duas apis, uma para 
// pesquisar a cidade por nome, que passa esse valor para
// a proxima que entao traz as informações meteorologicas.
// ao inves do usuario precisar introduzir o id da cidade.

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
            <div class="cidade-card" onclick="setAction('${item.id}')">
                <h3>${item.nome}, ${item.estado}, ${item.regiao}</h3>
            </div>
            `;
        });

        const finalHtml = htmlTemplate.join(`<br>`);
        document.getElementById('cidade').innerHTML = finalHtml;

    })
    .catch(error => {
        console.error(error);
        document.getElementById('cidade').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
    return false;

}


function setAction(cityCode) {   
    
    const daysInput = document.getElementById("days");

    const days = daysInput.value;

    const url = `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}/${days}`;


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
        document.getElementById('response').innerHTML = JSON.stringify(json);  
    })
    .catch(error => {
        console.error(error);
        document.getElementById('response').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
    return false;
}
