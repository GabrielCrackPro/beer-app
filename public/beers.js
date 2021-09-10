const API_URLS = {
 breweries: "https://api.openbrewerydb.org/breweries",
 beers: "https://api.punkapi.com/v2/beers",
 random: "https://api.punkapi.com/v2/beers/random"
}
const beersContainer = document.querySelector(".beers-container")
const nextBtn = document.querySelector(".next-btn")

const getData = async (url) => {
let data = fetch(url).then(response => response.json())
return data
}

const formatDate = (date) => {
return new Date(date).toLocaleDateString()
}

let actualPage = 1
const getBeers = async () => {
let beers = await getData(API_URLS.beers + `?page=${actualPage}`)
beers.forEach(beer => {
beersContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${beer.image_url}" class="img-fluid rounded-start" alt="beer-img" height="100" width="120">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"><span class="beer-color fw-bold">${beer.name}</span> - <span>${beer.tagline}</span></h5>
        <p class="card-text"><span class="beer-color fw-bold">Alcohol By Volume (ABV)</span> ${beer.abv}%</p>
	<p class="card-text"><span class="beer-color fw-bold">International Bitterness Units (IBU)</span> ${beer.ibu}</p>
	<p class="card-text"><span class="beer-color fw-bold">Boil Volume (BV)</span> ${beer.boil_volume.value} ${beer.boil_volume.unit}</p>
	<p class="card-text"><span class="beer-color fw-bold">Standard Reference Method (SRM)</span> ${beer.srm} <span class="beer-color fw-bold">European Brewing Convention (EBC)</span> ${beer.ebc}</p>
	<p class="card-text"><span class="beer-color fw-bold">Original Gravity (OG)</span> ${beer.target_og} <span class="beer-color fw-bold">Final Gravity (FG)</span> ${beer.target_fg}</p>
	<p class="card-text"><span class="beer-color fw-bold">First Brewed</span> ${beer.first_brewed}</p>
	<p class="card-text"><span class="beer-color fw-bold">Food Pairing</span> ${beer.food_pairing}</p>
	<p class="card-text"><span class="beer-color fw-bold">Tips</span> ${beer.brewers_tips}</p>
	<p class="card-text"><span class="beer-color fw-bold">Description</span> ${beer.description}</p>
      </div>
    </div>
  </div>
</div>
`
})
}
nextBtn.addEventListener("click", async () => {
actualPage += 1
beers = await getData(API_URLS.beers + `?page=${actualPage}`)
await getBeers()
})

window.onload = getBeers()
