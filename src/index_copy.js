let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const toyCollectionDiv = document.querySelector("#toy-collection");

    const toyForm = document.querySelector('form.add-toy-form')



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

    })



    // GET fetch request
    fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(toyArr => {
            // console.log(toyJson)
            // renderToys(toyJson)
            toyArr.forEach((toy) => {
                renderToys(toy)
            })
        }) //closing second .then

    // Helper function for GET request
    // function renderToys(toyArr) {
    // toyArr.forEach(toy => {
    // let toyDiv = document.createElement("div")
    // toyDiv.className = "card"
    // let toyH2 = document.createElement("h2")
    // toyH2.innerText = toy.name
    // let toyImage = document.createElement("img")
    // toyImage.className = "toy-avatar"
    // toyImage.src = toy.image
    // let toyP = document.createElement("p")
    // toyP.innerText = `${toy.likes} Likes`
    // let toyBtn = document.createElement("button")
    // toyBtn.className = "like-btn"
    // toyBtn.id = toy.id
    // toyBtn.innerText = "Like <3"

    // toyDiv.append(toyH2, toyImage, toyP, toyBtn)
    // toyCollectionDiv.append(toyDiv)

    // //Create an Event Listener for toyBtn
    // toyBtn.addEventListener("click", (evt) => {
    //   //1) Updating the Backend
    //   // console.log(fetch(`http://localhost:3000/toys/${toy.id}`))
    //   fetch(`http://localhost:3000/toys/${toy.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //       "likes": toy.likes + 1
    //       //if we do toy.likes += 1, it is optimstic
    //     })
    //   })
    //     .then(resp => resp.json())
    //     .then((updatedToyObj) => {
    //       //2) Update the DOM
    //       toyP.innerText = `${updatedToyObj.likes} Likes`

    //       //3) Update the Object in Memory-- Remember!!!!!
    //       toy.likes = updatedToyObj.likes
    //     }) //closing second .then


    // }) //closing Event listener



    // }) //closes forEach


    // }

    //Create another Helper function

    function renderToys(toy) {
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
            //1) Updating the Backend
            // console.log(fetch(`http://localhost:3000/toys/${toy.id}`))
            fetch(`http://localhost:3000/toys/${toy.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "likes": toy.likes + 1
                    //if we do toy.likes += 1, it is optimstic
                })
            })
                .then(resp => resp.json())
                .then((updatedToyObj) => {
                    //2) Update the DOM
                    toyP.innerText = `${updatedToyObj.likes} Likes`

                    //3) Update the Object in Memory-- Remember!!!!!
                    toy.likes = updatedToyObj.likes
                }) //closing second .then


        })
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
            .then(function (toy) {
                renderToys(toy)
                // //note- object ^ here is a single object that a user typed in through the form

                // //Below: attaching the object to the DOM when the user adds the object.
                // let toyDiv = document.createElement("div")
                // toyDiv.className = "card"
                // let toyH2 = document.createElement("h2")
                // toyH2.innerText = object.name
                // let toyImage = document.createElement("img")
                // toyImage.className = "toy-avatar"
                // toyImage.src = object.image
                // let toyP = document.createElement("p")
                // toyP.innerText = `${object.likes} Likes`
                // let toyBtn = document.createElement("button")
                // toyBtn.className = "like-btn"
                // toyBtn.id = object.id
                // toyBtn.innerText = "Like <3"

                // toyDiv.append(toyH2, toyImage, toyP, toyBtn)
                // toyCollectionDiv.append(toyDiv)

                // //testing start

                // toyBtn.addEventListener("click", (evt) => {
                //   fetch(`http://localhost:3000/toys/${object.id}`, {
                //     method: "PATCH",
                //     headers: {
                //       "Content-Type": "application/json",
                //       "Accept": "application/json"
                //     },
                //     body: JSON.stringify({
                //       "likes": object.likes + 1
                //     })
                //   })
                //     .then(resp => resp.json())
                //     .then((updatedToyObj) => {
                //       //Update the DOM
                //       toyP.innerText = `${updatedToyObj.likes} Likes`

                //       //Update the Object in Memory
                //       object.likes = updatedToyObj.likes
                //     }) //closing second .then

                //   e.target.reset()
                // })
                // //testing done


            })
        //console.log(submitData('name','image','3'))

        //CLOSING CODE VVVVVVVVV

    };







})


