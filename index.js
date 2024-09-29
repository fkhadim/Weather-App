let input = document.querySelector('#input')
let btn = document.querySelector('button')
let loc = document.querySelector('.location')
let date = document.querySelector('.date')
let icon = document.querySelector('.icon')
let temp = document.querySelector('.temp')
let img = document.querySelector('.img')
let humidity = document.querySelector('.humidity')
let forecast = document.querySelector('.forecast')
let warning = document.querySelector('.warning')
let form = document.querySelector('form')

async function getWeatherData(city){
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=QUADKQFK3TXRGGFJSJKUSPUW2`)
    if(response.ok){
        let data = await response.json()
        return data;
   } else {
        throw new Error('Weather Data Not found')
    }
}

const icons = {
    'partially cloudy': ['http://openweathermap.org/img/wn/02d@2x.png','http://openweathermap.org/img/wn/02n@2x.png',]
}

let defaultcity = 'London';
(async () => {
    let data = await getWeatherData(defaultcity);
    console.log(data);
    loc.textContent = data.resolvedAddress;
    date.textContent = data.currentConditions.datetime
    let conditions = data.currentConditions.icon
    img.src = `Icons/${data.currentConditions.icon}.png`
    img.style.width = '100px'
    temp.textContent = `${((data.currentConditions.temp-32)*0.5555).toFixed(2)}°C`
    humidity.textContent = `${data.currentConditions.humidity}%`
    data.days.forEach(day => {
        let date = day.datetime.slice(5)
        let iconSrc = `Icons/${day.icon}.png`
        let temp = `${((day.temp-32)*0.55555).toFixed(2)}°C `
        let humidity = `${day.humidity}%`

        let dateDiv = document.createElement('div')
        let icon = document.createElement('img')
        let tempDiv = document.createElement('div')
        let humidityDiv = document.createElement('div')

        dateDiv.textContent = date
        icon.src = iconSrc
        icon.style.width = '50px'
        tempDiv.textContent = temp
        humidityDiv.textContent = humidity

        let containerDiv = document.createElement('div')
        containerDiv.classList.add('scroll-container')
        containerDiv.appendChild(dateDiv)
        containerDiv.appendChild(icon)
        containerDiv.appendChild(tempDiv)
        containerDiv.appendChild(humidityDiv)

        forecast.appendChild(containerDiv);
    });
    
})();

btn.addEventListener('click', async (event) => {
    event.preventDefault();
    try{
        let data = await getWeatherData(input.value);
        console.log(data)
        loc.textContent = data.resolvedAddress;
        date.textContent = data.currentConditions.datetime
        let conditions = data.currentConditions.icon
        img.src = `Icons/${data.currentConditions.icon}.png`
        temp.textContent = `${((data.currentConditions.temp-32)*0.5555).toFixed(2)}°C`
        humidity.textContent = `${data.currentConditions.humidity}%`
        while(forecast.firstChild){
            forecast.removeChild(forecast.firstChild)
        }
        data.days.forEach(day => {

            let date = day.datetime.slice(5)
            let iconSrc = `Icons/${day.icon}.png`
            let temp = `${((day.temp-32)*0.55555).toFixed(2)}°C `
            let humidity = `${day.humidity}%`
    
            let dateDiv = document.createElement('div')
            let icon = document.createElement('img')
            let tempDiv = document.createElement('div')
            let humidityDiv = document.createElement('div')
    
            dateDiv.textContent = date
            icon.src = iconSrc
            icon.style.width = '50px'
            tempDiv.textContent = temp
            humidityDiv.textContent = humidity
    
            let containerDiv = document.createElement('div')
            containerDiv.classList.add('scroll-container')
            containerDiv.appendChild(dateDiv)
            containerDiv.appendChild(icon)
            containerDiv.appendChild(tempDiv)
            containerDiv.appendChild(humidityDiv)
    
            forecast.appendChild(containerDiv);
        });
        warning.style.display = 'none'

    }
    catch(error){
        console.log(error)
        warning.style.display = 'block'
        warning.textContent = 'Error fetching Weather data'
    }
})