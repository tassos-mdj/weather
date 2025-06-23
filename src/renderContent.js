import precipIconSrc from './icons/precip.png';

export default function renderContent(data) {
    const currentTemp = document.querySelector('.current-temp');
    const currentIcon = document.querySelector('.current-icon');
    const location = document.querySelector('.location');
    const details = document.querySelector('.details');
    const maxminInfo = document.querySelector('.maxmin-info');
    const datetimeInfo = document.querySelector('.datetime-info');
    const hourly = document.querySelector('.hourly');
    const description = document.querySelector('.description');
    const daily = document.querySelector('.daily');
    const sunriseTime = document.getElementById('sunrise-time');
    const sunsetTime = document.getElementById('sunset-time');
    const uvIndex = document.getElementById('uv-index');
    const humIndex = document.getElementById('hum-index');
    const windIndex = document.getElementById('wind-index');

    hourly.innerHTML = '';
    daily.innerHTML = '';


    console.log(data);

    currentTemp.textContent = Math.round(data.currentConditions.temp) + '°';

    let fullLocation = [];
    fullLocation = data.address.split(', ');
    location.textContent = fullLocation[0];

    const maxTemp = Math.round(data.days[0].tempmax);
    const minTemp = Math.round(data.days[0].tempmin);
    const realFeel = Math.round(data.currentConditions.feelslike);

    const d = new Date;
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const presDay = weekday[d.getDay()].substring(0, 3);

    let hm = [];
    hm = data.currentConditions.datetime.split(':');
    const dataTime = `${hm[0]}:${hm[1]}`;

    maxminInfo.textContent = `${maxTemp}° / ${minTemp}°  Feels like ${realFeel}°`;
    datetimeInfo.textContent = `${presDay}, ${dataTime}`;
    details.appendChild(maxminInfo);
    details.appendChild(datetimeInfo);

    const iconSrc = require(`./icons/${data.currentConditions.icon}.svg`);
    currentIcon.src = iconSrc;

    let currenthour;
    d.getMinutes < 31 ? currenthour = d.getHours() : currenthour = d.getHours() + 1;
 
    if ((currenthour + 12) < 24) {
        for (let i = currenthour; i < currenthour + 12; i++) {
            createHourForecast(i, 0);
        }
    } else {
        for (let i = currenthour; i < 24; i++) {
            createHourForecast(i, 0);
        }
        const remainingHours = 12 - (24 - currenthour);
        for (let j = 0; j < remainingHours; j++) {
            createHourForecast(j, 1);
        }
    }

    function createHourForecast(hour, day) {
        const hourForc = document.createElement('div');
        hourForc.classList.add('hour-forecast');

        const hourTime = document.createElement('div');
        hourTime.setAttribute('id', 'hour-forecast-time');
        hourTime.textContent = data.days[day].hours[hour].datetime.substring(0, 5);

        const hourIconContainer = document.createElement('div');
        hourIconContainer.classList.add('hour-icon-container');
        const hourIcon = document.createElement('img');
        const hourIconSrc = require(`./icons/${data.days[day].hours[hour].icon}.svg`);
        hourIcon.src = hourIconSrc;
        hourIconContainer.appendChild(hourIcon);

        const hourTemp = document.createElement('div');
        hourTemp.classList.add('hour-forecast-temp');
        hourTemp.textContent = `${Math.round(data.days[day].hours[hour].temp)}°`;

        hourForc.appendChild(hourTime);
        hourForc.appendChild(hourIconContainer);
        hourForc.appendChild(hourTemp);
        hourly.appendChild(hourForc);

    }

    description.textContent = data.description;

    let renderedDays = 0;
    for (let i = d.getDay(); i < 7; i++) {
        createDayForecast(i, renderedDays);
        renderedDays++;
    }

    const remainingDays = 7 - renderedDays;

    for (let j = 0; j < remainingDays; j++) {
        createDayForecast(j, renderedDays);
        renderedDays++;
    }

    function createDayForecast(currDay, renderedDays) {
        const dailyForc = document.createElement('div');
        dailyForc.classList.add('day-forecast');

        const day = document.createElement('div');
        day.classList.add('day-forecast-day');
        currDay === d.getDay() ? day.textContent = 'Today' : day.textContent = weekday[currDay];
        dailyForc.appendChild(day);

        const precip = document.createElement('div');
        precip.classList.add('day-forecast-precip');
        const precipIcon = new Image;
        precipIcon.src = precipIconSrc;
        const precipValue = document.createElement('span');
        const precipValueRound = Math.round(data.days[renderedDays].precipprob);
        precipValue.textContent = `${precipValueRound} %`;
        precip.appendChild(precipIcon);
        precip.appendChild(precipValue);
        dailyForc.appendChild(precip);

        const dayIcon = document.createElement('img');
        dayIcon.src = require(`./icons/${data.days[renderedDays].icon}.svg`);
        dailyForc.appendChild(dayIcon);

        const dayRange = document.createElement('div');
        const tempmaxRound = Math.round(data.days[renderedDays].tempmax);
        const tempminRound = Math.round(data.days[renderedDays].tempmin);
        dayRange.textContent = `${tempmaxRound}° ${tempminRound}°`;
        dailyForc.appendChild(dayRange);

        daily.appendChild(dailyForc);
    }

    sunriseTime.textContent = data.currentConditions.sunrise.substring(0, 5);
    sunsetTime.textContent = data.currentConditions.sunset.substring(0, 5);

    let currentUVGrading;
    const currentUV = data.currentConditions.uvindex;
    if (currentUV < 3) {currentUVGrading = 'Low'};
    if (2 < currentUV && currentUV < 6) {currentUVGrading = 'Moderate'};
    if (5 < currentUV && currentUV < 8) {currentUVGrading = 'High'};
    if (7 < currentUV && currentUV < 11) {currentUVGrading = 'Very High'};
    if (10 < currentUV) {currentUVGrading = 'Extreme'};
    uvIndex.textContent = currentUVGrading;

    humIndex.textContent = `${Math.round(data.currentConditions.humidity)} %`;

    windIndex.textContent = `${Math.round(data.currentConditions.windgust)} km/h`;
}