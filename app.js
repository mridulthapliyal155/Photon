const auth = 'k59Bl0nHchGsKH7nMejLI6tlax9lG0OhYN1MCotMnOXG9DhOQUTneyco';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form')
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

// Event listeners
searchInput.addEventListener('input',updateInput);
form.addEventListener('submit',(e)=> {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})


more.addEventListener("click",loadMore);

function updateInput(e){
    searchValue = e.target.value;
}


async function fetchAPI(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers:{
            Accept: 'application/json',
            Authorization: auth
            }
        });
        const data = await dataFetch.json();
        return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.large}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function cureatedPhotos(){
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
    const data = await fetchAPI(fetchLink);
    generatePictures(data);

}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchAPI(fetchLink)
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore(){
    page++;
    if(currentSearch){
       fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`; 
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchAPI(fetchLink);
    generatePictures(data);
}

cureatedPhotos()

