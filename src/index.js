function getWeatherByGeo() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
	}
}

const onSuccess = async (position) => {
	const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
	renderWeather(data)
}

const onFailure = () => {
	console.log('Operation has failed')
}

const fetchWeather = async (lat, lon) => {

	const apiKey = 'cf340f87b78434078bcfc1562e431517';

	const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
	return await response.json()
}

const renderWeather = (data, cityName = undefined) => {

	const headerRender = `
 		<div class="weather__header">
	 		<h2 class="weather__location">${cityName ? cityName : data.timezone}</h2>
	 		<p class="weather__description">${data.current.weather[0].description}</p>
	 		<h1 class="weather__temp">${Math.trunc(data.current.temp)}°</h1>

	 		<img class="weather__icon" src="${`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}" alt="">
 		</div>
 `

	const renderDaily = data.daily.map((day) => {
		const dayName = new Date(day.dt * 1000).toLocaleDateString(window.navigator.language, {
			weekday: 'short'
		})

		return `
		<div class="weather__body">
			<h2>${dayName}</h2>
			<img class="weather__icon-body" src="${`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}" alt="">
			<h4 class="weather__temp-body">${Math.trunc(day.temp.max)}°</h4>
			<h4 class="weather__temp-body">${Math.trunc(day.temp.min)}°</h4>
		</div>
		`
	}).join('')



	document.querySelector('.weather__header-container').innerHTML = headerRender;
	document.querySelector('.weather__body-container').innerHTML = renderDaily;
}
window.onload = () => {
	getWeatherByGeo();
}

document.querySelector('.search__form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchQuery = document.querySelector('.search__input').value;
	const response = await getGeoByCityName(searchQuery);
	console.log(response);
	const data = await fetchWeather(response.coord.lat, response.coord.lon);
	renderWeather(data, response.name)
})

const getGeoByCityName = async (city) => {
	const apiKey = 'cf340f87b78434078bcfc1562e431517';

	const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
	return await response.json()
}

// const fetchWeather = async (lat, lon) => {

// 	const apiKey = 'cf340f87b78434078bcfc1562e431517';

// 	const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
// 	return await response.json()

// }

// console.log(fetchWeather())

// // Example of simple data storage
// const objData = {
// 	name: '',
// 	description: '',
// 	temp: 00,
// 	icon: '',
// 	temp_min: 00,
// 	temp_max: 00,
// }

// 888-801-1660 h1 managecare - healthfirst medicare
//