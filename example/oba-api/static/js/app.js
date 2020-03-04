/*** Fetching data -> refactor into module later ***/
const section = document.querySelector('section');
const cors = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
const query = 'tolkien';
const key = 'dc0e2f073c03758140452044906bc818';
const secret = '4289fe6b02878111c06660300798cf4c40a685c4e962a33118340c888699438d';
const detail = 'Default';
const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;


const config = {
  Authorization: `Bearer ${secret}`
};

fetch(url, config)
  .then(response => {
    return response.json();
  })
  .then(data => {
    render(data);
  })
  .catch(err => {
    console.log(err);
  });

// render data
function render(data) {
  const results = data.results;
  console.dir(results);
  results.forEach((item, i) => {
    const html = `
            <article>
              <h2>${item.titles[0]}</h2>
            </article>
          `;
    section.insertAdjacentHTML('beforeend', html);
  });
}
     // <p>${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</p>
    //  <img src="${
    //   item.coverimages ? item.coverimages[1] : 'Geen samenvatting'
    // }">