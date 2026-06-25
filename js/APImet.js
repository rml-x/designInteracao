
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
    .then(data => data.json())
    .then((json) => {

        const htmlTemplate= json.map( item => {
            return `
            <div class="cidade-card" onclick="setAction('${item.id}')">
                <h3>${item.nome}, ${item.estado}, ${item.regiao}</h3>
            </div>
            `;
        });

        const finalHtml = htmlTemplate.join(`<br>`);
        document.getElementById('cidade').innerHTML = finalHtml;

    
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
    .then(data => data.json())
    .then((json) => {
        document.getElementById('response').innerHTML = JSON.stringify(json);  
    });
    return false;
}
