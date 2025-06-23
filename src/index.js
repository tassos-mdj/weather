import { style } from "./style.css";
import apiHandler from "./apiHandler";
import renderContent from "./renderContent";

let data;

apiHandler("Platy, Messinia, GR")
    .then(value => renderContent(value));

console.log(Geolocation.getCurrentPosition());