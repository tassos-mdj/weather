export default function renderContent(data) {
    const currentTemp = document.querySelector('.current-temp');
    const currentIcon = document.querySelector('.current-icon');
    const location = document.querySelector('.location');
    const details = document.querySelector('.details');
    const maxminInfo = document.querySelector('.maxmin-info');
    const datetimeInfo = document.querySelector('.datetime-info');

    console.log(data);
    currentTemp.textContent = data.currentConditions.temp;
    location.textContent = data.address;
    
    const maxTemp = data.days[0].tempmax;
    const minTemp = data.days[0].tempmin;
    const realFeel = data.currentConditions.feelslike;

    const d = new Date;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const presDay = weekday[d.getDay()];
    const dataTime = data.currentConditions.datetime;

    maxminInfo.textContent = `${maxTemp} / ${minTemp} Feels like ${realFeel}`;
    datetimeInfo.textContent = `${presDay}, ${dataTime}`;

    details.appendChild(maxminInfo);
    details.appendChild(datetimeInfo);
}