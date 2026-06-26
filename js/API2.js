
function callAll(){

    const url1 = 'https://catfact.ninja/fact';
    const url2 = 'https://cataas.com/cat?json=true';
    const url3 = 'https://corsproxy.io/?https://stoic.tekloon.net/stoic-quote';


    Promise.all([fetch(url1), fetch(url2), fetch(url3)])
    .then(responses =>
        Promise.all(responses.map(res => res.json()))
    ).then(json => {

        const htmlTemplate = 
        `
        ${json[0].fact}<br>
        <img src="${json[1].url}"><br>
        ${json[2].data.quote}<br> 
        ${json[2].data.author}<br>

        `;
        

        document.getElementById('response').innerHTML = htmlTemplate;

    }).catch(error => {
        console.error(error);
        document.getElementById('response').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
    
}   
window.addEventListener('load', callAll);