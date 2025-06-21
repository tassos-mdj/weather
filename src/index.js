import { style } from "./style.css";
import apiHandler from "./apiHandler";
import renderContent from "./renderContent";

let data;

apiHandler("Kalamata, Messinia, GR")
    .then(value => renderContent(value));
