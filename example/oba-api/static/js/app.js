var submit = document.getElementById("submit")
submit.addEventListener("click", function setQuery() {
  const details = document.getElementById("detailed");
  const title = document.getElementById("title");
  const section = document.querySelector('section');
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
  let query = document.getElementById("userInput").value;
  const key = '1e19898c87464e239192c8bfe422f280';
  const secret = '4289fec4e962a33118340c888699438d';
  const detail = 'Default';
  const pagesize = 20;
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
      const color = ["book-green", "book-blue", "book-brown", "book-red"];
      const randomColor = color[Math.floor(Math.random() * color.length)];

      const tilt = ["tilt", "no-tilt", "no-tilt", "no-tilt", "no-tilt", "no-tilt", "no-tilt", "no-tilt", "no-tilt"];
      const randomTilt = tilt[Math.floor(Math.random() * tilt.length)];

      let rawTitle = item.titles[0];
      let header = rawTitle.slice(0, 29);
      let length = header.length;

      if (length == 29) {
        header = header + "...";
      }

      let parentTilt = "";
      if (randomTilt == "no-tilt") {
        parentTilt = "noTilt";
      } else if (randomTilt == "big-tilt") {
        parentTilt = "book-big-tilted";
      } else {
        parentTilt = "book-tilted";
      }

      const html = `
      <a href = '#${item.isbn ? item.isbn[0]: '' }' class="${parentTilt} abook">
             <article class=" articleClass ${randomColor} ${randomTilt}">
              <h2 class="h2Class">${header}</h2>
            </article>
      </a>
          `;

      section.insertAdjacentHTML('beforeend', html);
      routie({
        [item.isbn]: function () {
          title.innerHTML = item.titles[0];
          document.getElementById("thumb").src = item.coverimages ? item.coverimages[1] : 'Geen foto'
        }
      });
    });
  }
})

var gunstate = 0;
gunToggle = document.getElementById("gun");
gunToggle.addEventListener("click", function () {
  bookList.classList.add("guncss")
  gunstate = 1;
})
mouseToggle = document.getElementById("mouse");
mouseToggle.addEventListener("click", function () {
  bookList.classList.remove("guncss")
  gunstate = 0;
})

bookList = document.querySelector("section")
bookList.addEventListener("click", function () {
  console.log(event.target)
  if (gunstate == 1) {
    const body = document.querySelector("body")
    let explosionHTML = `      
    <div class="image-wrapper">
    <img src="../oba-api/static/img/3iCN.gif" alt="myimage" />
    </div>`;
    body.insertAdjacentHTML('afterbegin', explosionHTML)
    var div = document.querySelector(".image-wrapper")
    div.style.left = event.pageX + "px";
    div.style.top = event.pageY + "px";
    setTimeout(function () {
      div.remove()
    }, 1000)
    console.log(event.target.tagName)
      if (event.target.tagName == "ARTICLE")  {
        event.target.remove(event.target)
      } else if ( event.target.tagName == "H2") {
        event.target.parentNode.remove(event.target)
      }
  }
});
