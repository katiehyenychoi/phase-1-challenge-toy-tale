let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection");

  const createBtn = document.querySelector('.submit')
  const toyForm = document.querySelector('.add-toy-form')



  addBtn.addEventListener("click", (evt) => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


toyForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //console.log(evt.target.name.value)

  let inputName = evt.target.name.value
  let inputImage = evt.target.image.value

  submitData(inputName, inputImage, 0);

  //let whatUserTyped

} )


  // GET fetch request
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyJson => {
      // console.log(toyJson)
      renderToys(toyJson)
    })

// helper function for GET request
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


 // POST fetch request 
function submitData(name, image, likes){

  let formData = {
    "name": name,
    "image": image,
    "likes": likes
  }
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
    
  
  fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(function(object){
    let toyDiv = document.createElement("div")
      toyDiv.className = "card"
      let toyH2 = document.createElement("h2")
      toyH2.innerText = object.name
      let toyImage = document.createElement("img")
      toyImage.className = "toy-avatar"
      toyImage.src = object.image
      let toyP = document.createElement("p")
      toyP.innerText = `${object.likes} Likes`
      let toyBtn = document.createElement("button")
      toyBtn.className = "like-btn"
      toyBtn.id = object.id
      toyBtn.innerText = "Like <3"

      toyDiv.append(toyH2, toyImage, toyP, toyBtn)
      toyCollectionDiv.append(toyDiv)
  })
 //console.log(submitData('name','image','3'))
  


















//CLOSING CODE VVVVVVVVV

  
};

})  