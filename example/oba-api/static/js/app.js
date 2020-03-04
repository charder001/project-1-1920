var submit = document.getElementById("submit")
submit.addEventListener("click", function setQuery() {
  
  const section = document.querySelector('section');
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
  let query = document.getElementById("userInput").value;
  const key = '1e19898c87464e239192c8bfe422f280';
  const secret = '4289fec4e962a33118340c888699438d';
  const detail = 'Default';
  const pagesize = 5;
  const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json&pagesize=${pagesize}`;
  

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
            <article id="${item.titles[0]}">
              <h2>${item.titles[0]}</h2>
            </article>
          `;
      section.insertAdjacentHTML('beforeend', html);
    });
  }  
})

var gunstate;
gunToggle = document.getElementById("gun");
gunToggle.addEventListener("click", function(){
  bookList.classList.toggle("guncss")
  gunstate = 1;
})
mouseToggle = document.getElementById("mouse");
mouseToggle.addEventListener("click", function(){

  gunstate = 0;
})

bookList = document.querySelector("section")

bookList.addEventListener("click", function(){
console.log(event.target)
if (gunstate == 1){
var x = event.clientX;
var y = event.clientY;
var explosion = document.getElementById("explosion")
explosion.style.display = "block";
explosion.style.top = y - 25 + "px";
explosion.style.left = x - 25 + "px";
explosion.addEventListener("animationend", function(){
  explosion.style.display = "none";
})
event.target.parentNode.removeChild(event.target);
}
})

// <p>${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</p>
// <img src="${
//   item.coverimages ? item.coverimages[1] : 'Geen samenvatting'
// }">