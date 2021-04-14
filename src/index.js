let addToy = false;


toyForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  //console.log(evt.target.name.value)
  
  let inputName = evt.target.name.value
  let inputImage = evt.target.image.value
  
  submitData(inputName, inputImage, 0);
  
  //let whatUserTyped
  
  evt.target.reset();
})


// GET fetch request
fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(toyJson => {
  // console.log(toyJson)
  renderToys(toyJson)
}) //closing second .then

// helper function for GET fetch request
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
    
    //Create an Event Listener for toyBtn
    toyBtn.addEventListener("click", (evt) => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": toy.likes + 1
        })
      })
      .then(resp => resp.json())
      .then((updatedToyObj) => {
        //Update the DOM
        toyP.innerText = `${updatedToyObj.likes} Likes`
        
        //Update the Object in Memory
        toy.likes = updatedToyObj.likes
      }) //closing second .then
      
      
    }) //closing Event listener
    
    
  }) //closes forEach
  
  
}


// POST fetch request 
function submitData(name, image, likes) {
  
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
  .then(function (object) {
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
        
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            //CLOSING CODE VVVVVVVVV
            
            
          };

// broke this code again and again      
          
          
          
          
       
      
      