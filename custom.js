const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(nameCity.value === '' || nameCountry.value === '') {
        showError('Completar ambos campos');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);

    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

function callAPI(city, country) {
    const apiId = '673a6d6721b3cb80d9def60d1f708058' ;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
    
    fetch(url).then(data => {
        return data.json();
    })
    .then(dataJSON => {
        if (dataJSON.cod === '404') {
            showError("we can't find this city");
        } else {
            clearHTML();
            showWeather(dataJSON);
        }
        //console.log(dataJSON);
    })
    .catch(error => {
        console.log(error);
    })
}

function showWeather(data) {
    const {name, main:{temp, temp_min, temp_max, humidity}, weather:[arr] } = data;

    const degress = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>${name} Weather</h5>
        <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degress}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
        <p>Humidity: ${humidity}</p>
    `;

    result.appendChild(content);

    //console.log(name);
    //console.log(temp);
    //console.log(temp_min);
    //console.log(temp_max);
    //console.log(humidity);
    //console.log(arr.icon);
}

function showError(message) {
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}


function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
