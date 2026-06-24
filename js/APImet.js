
function setAction(form) {   
    
    const cityCodeInput = document.getElementById("CityCode");
    const daysInput = document.getElementById("days");

    const cityCode = cityCodeInput.value;
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
