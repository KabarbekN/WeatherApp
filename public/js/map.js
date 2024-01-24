
let map;


document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let marker, circle, zoomed;
    navigator.geolocation.watchPosition(success, error);
    function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;
        if (marker) {
            map.removeLayer(marker);
            map.removeLayer(circle);
        }

         marker = L.marker([lat, lng]).addTo(map);
         circle = L.circle([lat, lng], {radius: accuracy }).addTo(map); 
        if(!zoomed){
           zoomed =  map.fitBounds(circle.getBounds());

        }
    }
    function error(err) {
        if(err.code === 1){
            alert("Please allow geolocation access");
        
        }else{
            alert("Cannot get current location");
        }
    }

    map.on('click', onMapClick);
});
function onMapClick(e) {
    const {lat, lng} = e.latlng;
    console.log(lat + " " + lng);

    fetch(`/weather?lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weather-container');
            
            const iconUrl = `http://openweathermap.org/img/w/${data.icon}.png`;

            weatherContainer.innerHTML = `
            <h2>Weather Information</h2>
            <p>Coordinates: <br> ${data.coordinates.lon} ${data.coordinates.lat} </p>
            <p>Address: ${data.address} </p>
            <p>Temperature: ${data.temperature - 273} C</p>
            <img src="${iconUrl}" alt="Weather Icon" />
            <p>Feels like: ${data.feelsLike - 273}</p>
            <p>Humidity: ${data.humidity} </p>
            <p>Pressure: ${data.pressure}</p>
            <p>Wind Speed: ${data.windSpeed}</p>
            <p>Country code: ${data.countryCode}</p>
            <p>Rain volume for last 3 hours: ${data.rainVolumeLast3Hours}</p>
            <p>Description: ${data.description}</p>
          `;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function getAddressByCoordinate(lat, lng) {
    
}