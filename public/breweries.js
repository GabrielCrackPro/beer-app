const API_URLS = {
 breweries: "https://api.openbrewerydb.org/breweries",
 beers: "https://api.punkapi.com/v2/beers",
 random: "https://api.punkapi.com/v2/beers/random"
}
const breweriesContainer = document.querySelector(".breweries-container")
const moreBtn = document.querySelector(".more-btn")

const getData = async (url) => {
let data = fetch(url).then(response => response.json())
return data
}

const formatDate = (date) => {
return new Date(date).toLocaleDateString()
}
let actualPage = 1
const getBreweries = async () => {
let breweries = await getData(API_URLS.breweries + `?page=${actualPage}`)
breweries.forEach(brewery => {
if(brewery.street == null) brewery.street = ''
if(brewery.longitude == null || brewery.latitude == null){
brewery.longitude = 0
brewery.latitude = 0
}
breweriesContainer.innerHTML += `
<div class="card mb-3 mt-3">
  <div class="row g-0">
    <div class="col-md-12">
      <div class="card-body">
        <h5 class="card-title beer-color fw-bold">${brewery.name}</h5>
        <p class="card-text text-capitalize"><span class="beer-color fw-bold">Type</span> ${brewery.brewery_type}</p>
        <p class="card-text text-capitalize"><span class="beer-color fw-bold">Location</span> ${brewery.street} ${brewery.city} ${brewery.state} ${brewery.country} <span class="beer-color fw-bold">Postal code</span> ${brewery.postal_code}</p>
        <p class="card-text text-capitalize"><span class="beer-color fw-bold">Created At</span> ${formatDate(brewery.created_at)} <span class="beer-color fw-bold">Updated At</span> ${formatDate(brewery.updated_at)}</p>
	<a href="https://www.google.com/maps/place/${brewery.latitude}+${brewery.longitude}" target="blank" class="location-btn btn beer-bg text-white"><i class="fas fa-map-marker-alt"></i> View in Google Maps</a>
      </div>
    </div>
  </div>
</div>
`
})
}
moreBtn.addEventListener("click", () => {
actualPage += 1
getBreweries()
})
window.onload = getBreweries()
