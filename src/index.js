import { style } from "./style.css";
import { apiHandler, reverseGeocode } from "./apiHandler";
import renderContent from "./renderContent";
import getCoords from "./getCoords";

apiHandler("Platy, Messinia, GR")
    .then(value => renderContent(value));

const findMe = document.getElementById('findme');
findMe.addEventListener('click', () => {
    getCoords()
        .then((response) => {
            reverseGeocode(response)
                .then((response) => {
                console.log(response.address.town,',',response.address.state,',',response.address.country);
                console.log(response);
                apiHandler(`${response.address.town},${response.address.state},${response.address.country}`)
                    .then(value => renderContent(value));
                })
        })
        
});

