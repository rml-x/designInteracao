
function setAction(form) {
  const url = `https://brasilapi.com.br/docs#tag/CPTEC/operation/climapredictionwithoutdays/cptec/v1/clima/previsao/${cityCode}/${days}`;

  fetch(
    url,
    {            
        headers: { "Content-Type": "application/json" },            
        method: "GET",
    }
   )
  .then(data => data.json())
  .then((json) => {
    //alert(JSON.stringify(json));
    document.getElementById('response');  
    document.innerHTML('response')   
  });
  return false;
}
