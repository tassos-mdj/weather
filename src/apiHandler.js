export default function apiHandler(location) {
    const apiKey = 'WCN4EDG2UXXN7SJLD5CPW7MQL';
    const encodedLocation = encodeURIComponent(location);
    console.log(encodedLocation);
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encodedLocation + '?unitGroup=metric&key=' + apiKey + '&contentType=json';

    return getData(url);
}

async function getData(url) {
    let data;

    try {
        let response = await fetch(url);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
    
    return data;
    }
