const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');

   
});

app.get('/weather', async (req, res) => {
    const {lat, lon } = req.query;
    try {
        const weatherData = await getWeatherData(lat, lon);
        console.log(weatherData);
        res.json(weatherData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.use(express.static(path.join(__dirname, '/public')));


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


async function getWeatherData(lat, lng) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    // const apiKey = "6b70645a4c7c85bb3c00ed4d4147d128";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
    console.log(apiUrl);
  
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    const city = await getCityName(lat, lng);  // Pass lat and lng to getCityName

  
    return {
      address: city,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      coordinates: weatherData.coord,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: weatherData.wind.speed,
      countryCode: weatherData.sys.country,
      rainVolumeLast3Hours: weatherData.rain ? weatherData.rain['3h'] : 0,
    };
  }


  async function getCityName(lat, lng) {
    const opencageApiKey = process.env.OPENCAGE_API_KEY;
    const opencageApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${opencageApiKey}`;

    const response = await axios.get(opencageApiUrl);
    const data = response.data;

    if (data.results.length > 0) {
        return data.results[0].formatted;
    } else {
        console.error(`City not found for coordinates (${lat}, ${lng})`);
        return 'Unknown City';
    }
}