
document.getElementById('btn').addEventListener('click', callAll);

window.addEventListener('load', callAll)

function callAll(){

    const url1 = 'https://catfact.ninja/fact';
    const url2 = 'https://cataas.com/cat?json=true';
    const url3 = 'https://api.adviceslip.com/advice';

    Promise.all([fetch(url1), fetch(url2), fetch(url3)])
    .then(data =>
        Promise.all(data.map(res => res.json()))
    ).then(json => {

        const htmlTemplate = 
        `
        <h3>Fatos sobre gatos: </h3>
        ${json[0].fact}
        <br>
        <br>
        <img src="${json[1].url}"><br>
        <h3>Conselho:</h3>
        ${json[2].slip.advice}<br> 
        <br>

        `;
        

        document.getElementById('response').innerHTML = htmlTemplate;

    }).catch(error => {
        console.error(error);
        document.getElementById('response').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
    
} 

