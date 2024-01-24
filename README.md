# Weather Application

This is a simple weather application that provides weather information based on geographical coordinates (latitude and longitude). It utilizes the OpenWeatherMap API to fetch weather data and the OpenCage Geocoding API to get the city name from coordinates.

## Features

- Display current weather information for a given location on a map.
- Automatically detects and displays the user's current location.
- Fetches weather data from the OpenWeatherMap API.
- Retrieves city name from coordinates using the OpenCage Geocoding API.

## Technologies Used

- Node.js
- Express.js
- Axios
- OpenWeatherMap API
- OpenCage Geocoding API
- Leaflet.js (for interactive maps)

## Getting Started

### Prerequisites

- Node.js installed
- OpenWeatherMap API key (Sign up for a free API key [here](https://openweathermap.org/appid))
- OpenCage Geocoding API key (Sign up for a free API key [here](https://opencagedata.com/api))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
Install dependencies:
npm install
Crate .env file 
OPENWEATHER_API_KEY=your_openweather_api_key
OPENCAGE_API_KEY=your_opencage_api_key

Start the application
npm run dev
