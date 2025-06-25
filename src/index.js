import { style } from "./style.css";
import { apiHandler, reverseGeocode } from "./apiHandler";
import renderContent from "./renderContent";
import getCoords from "./getCoords";

const defaultLocation = 'Kalamata, Messinia, GR';

function getData(location) {
    apiHandler(location)
    .then(value => renderContent(value));
}

const findMe = document.getElementById('findme');
findMe.addEventListener('click', () => {
    getCoords()
        .then((response) => {
            reverseGeocode(response)
                .then((response) => {
                getData(`${response.address.city},${response.address.county},${response.address.country}`);
                console.log(`${response.address.city},${response.address.county},${response.address.country}`);
                })
        })
        
});

const search = document.getElementById('search-button');
const searchItems = document.querySelectorAll('.search');
search.addEventListener('click', () => {
    formReveal();
});

function formReveal() {
    searchItems.forEach((item => item.classList.contains('hidden') ? item.classList.remove('hidden') : item.classList.add('hidden')));
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!form.elements[0].value) {
        e.preventDefault();
        formReveal();
    } else {
        e.preventDefault();
        getData(form.elements[0].value);
        form.elements[0].value = '';
        formReveal();
    }
})

getData(defaultLocation);



