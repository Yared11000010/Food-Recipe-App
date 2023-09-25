const searchForm=document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container= document.querySelector('.container');
let searchQuery = '';
const APP_ID='0e199a68';
const APP_Key='0bccc99296cd2f425aa0cc8fc493c0cf';


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseURL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
container.classList.remove('initial');
   let generateHTML = '';
   results.map(result => {
    generateHTML += `
    <div class="item">
    <img src="${result.recipe.image}" class="img-fluid" alt="">
    <div class="flex-container">
    <h1 class="title">${result.recipe.label}</h1>
    <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
    </div>
    <p class="item-data">Colories: ${result.recipe.calories}</p>
    <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
    <p class="health">Health Label : ${result.recipe.healthLabels
    }</p>

    </div>
    `
   })
   searchResultDiv.innerHTML=generateHTML;
}