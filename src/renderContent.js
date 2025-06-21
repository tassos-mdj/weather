export default function renderContent(data) {
    const currentTemp = document.querySelector('.current-temp');
    const currentIcon = document.querySelector('.current-icon');
    const location = document.querySelector('.location');
    const details = document.querySelector('.details');

    console.log(data);
    currentTemp.textContent = data.currentConditions.temp;
    location.textContent = data.resolvedAddress;
}