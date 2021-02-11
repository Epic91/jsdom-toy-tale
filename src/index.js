let addToy = false;
document.addEventListener("DOMContentLoaded", main);

function main(){
  createButtonListener()
  fetchToys()
  createFormListener()
  createLikeListener()
}

function createLikeListener(){
  const toyContainer = document.querySelector('#toy-collection')
  toyContainer.addEventListener('click', function(e){
    if(e.target.className === 'like-btn'){
      const id = e.target.dataset.id
      const pTag = e.target.previousElementSibling
      const currentlikes = parseInt(pTag.innerText.split(' ')[0])

      const reqObj = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({likes: currentlikes + 1})
      }

      fetch(`http://localhost:3000/toys/${id}`, reqObj)
      .then(resp => resp.json())
      .then(updatedToy => {
        pTag.innerText = `${updatedToy.likes} likes`
      })
    }
  })
}

function createFormListener(){
  const form = document.querySelector('form')
  form.addEventListener('submit', function(e){
    e.preventDefault()

    const newToy = {
      name: e.target['name'].value,
      image: e.target['image'].value,
      like: 0
    }

    form.reset()
    
    const toyObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', toyObj)
    .then(resp => resp.json())
    .then(toyObj => {
      renderToy(toyObj)
    })
  })
}

function renderToy(toyObj){
  const div = document.createElement('div')
  div.setAttribute('class', 'card')
  
  const h2 = document.createElement('h2')
  h2.innerText = toyObj.name
  
  const img = document.createElement('img')
  img.src = toyObj.image
  img.setAttribute('class', 'toy-avatar')
  
  const p = document.createElement('p')
  p.innerText = `${toyObj.likes} likes`
  
  const button = document.createElement('button')
  button.dataset.id = toyObj.id
  button.setAttribute('class', 'like-btn')
  button.innerText = 'Like'
  
  div.append(h2, img, p, button)
  
  const toysContainer = document.querySelector('#toy-collection')
  
  toysContainer.append(div)
}


function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(function(toyObj){
      renderToy(toyObj)
    })
  })
}


function createButtonListener(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}