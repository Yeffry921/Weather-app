const weatherData = (() => {
	async function getTemp(city) {
		const apiKey = '50e876f0306cf9fa7f04e6e896979c45';

		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
		const data = await response.json();
		return data;
	}

  async function getCondition(condition) {
    const apiKey = 'JCck8vGoViqPkfMBP6QWsnfxSnh6A4pu';

    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?apikey=${apiKey}&s=${condition}`)
    const data = await response.json();
    return data
  }
	function getCity(e) {
		e.preventDefault();
		return e.target.city.value;
	}
	function convertKelvinToCelsius(temp) {
		return {
			type: 'C°',
			temperature: Math.round(temp - 273.15)
		};
	}

	function convertKelvinToFahrenheit(temp) {
		return {
			type: 'F°',
			temperature: Math.round(temp * 9 / 5 - 459.67)
		};
	}
	return {
		getTemp,
		getCity,
		convertKelvinToCelsius,
    convertKelvinToFahrenheit,
    getCondition,
	};
})();

const weatherUI = ((weatherData) => {
	function renderUI(data) {
		document.querySelector('.weather-output-temp').textContent = `${data.temperature} ${data.type}`;
	}
	return {
		renderUI
	};
})(weatherData);

const weatherControl = ((weatherData, weatherUI) => {
	let currentTemp;

	document.querySelector('.weather-input-form').addEventListener('submit', (e) => {
		e.preventDefault();

		weatherData.getTemp(e.target.city.value).then((data) => {
      weatherUI.renderUI(weatherData.convertKelvinToFahrenheit(data.main.temp));
      currentTemp = data.main.temp;

      const weatherCondition = data.weather[0].description;
      console.log(weatherCondition)
      
      weatherData.getCondition(weatherCondition).then((data) => {
        console.log(data.data.url)
      })
      
		});
	});

	document.querySelector('.weather-metric').addEventListener('click', (e) => {
		e.preventDefault();
		if (e.target.textContent === '°C' && currentTemp !== undefined) {
			weatherUI.renderUI(weatherData.convertKelvinToCelsius(currentTemp));
		} else if (e.target.textContent === '°F' && currentTemp !== undefined) {
			weatherUI.renderUI(weatherData.convertKelvinToFahrenheit(currentTemp));
		}
	});
})(weatherData, weatherUI);

// For tommorow

// We need a way to make 2 choices, like 2 buttons or 2 radios
// If button one is active then display F temp, if button 2 is active then display C temp
// The toggle buttons will be highlighted when its active
// By default we can have F button be active
