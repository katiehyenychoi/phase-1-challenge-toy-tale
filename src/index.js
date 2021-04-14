let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyJson => {
      // console.log(toyJson)
      renderToys(toyJson)
    })


  function renderToys(toyArr) {
    toyArr.forEach(toy => {
      let toyDiv = document.createElement("div")
      toyDiv.className = "card"
      let toyH2 = document.createElement("h2")
      toyH2.innerText = toy.name
      let toyImage = document.createElement("img")
      toyImage.className = "toy-avatar"
      toyImage.src = toy.image
      let toyP = document.createElement("p")
      toyP.innerText = `${toy.likes} Likes`
      let toyBtn = document.createElement("button")
      toyBtn.className = "like-btn"
      toyBtn.id = toy.id
      toyBtn.innerText = "Like <3"

      toyDiv.append(toyH2, toyImage, toyP, toyBtn)
      toyCollectionDiv.append(toyDiv)
    })
  }

});
