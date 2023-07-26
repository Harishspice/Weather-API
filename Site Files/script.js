
// Get the forecast data from the OpenWeather API
function getWeather() {
    const apiKey = '5cd097c0f7a5b0dbd8927313d84149d2'; // Replace with your actual API key
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error:', error));
}

// Display the weather forecast on the page
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast');

    if (forecastData.cod !== 200) {
        forecastContainer.innerHTML = '<p>Failed to fetch the forecast.</p>';
        return;
    }

    const sunrise = new Date(forecastData.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(forecastData.sys.sunset * 1000).toLocaleTimeString();

    const temperatureCelsius = (forecastData.main.temp - 273.15).toFixed(2);
    const temperatureFahrenheit = ((forecastData.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);

    const humidity = forecastData.main.humidity;
    const description = forecastData.weather[0].description;

    const forecastHTML = `
        <p><strong>City:</strong> ${forecastData.name}</p>
        <p><strong>Country:</strong> ${forecastData.sys.country}</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <p><strong>Temperature:</strong> ${temperatureCelsius}°C / ${temperatureFahrenheit}°F</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Description:</strong> ${description}</p>
    `;

    forecastContainer.innerHTML = forecastHTML;
}
