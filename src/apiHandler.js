export function apiHandler(location) {
    const apiKey = 'WCN4EDG2UXXN7SJLD5CPW7MQL';
    const encodedLocation = encodeURIComponent(location);
    console.log(encodedLocation);
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encodedLocation + '?unitGroup=metric&key=' + apiKey + '&contentType=json';

    return getData(url);
}

export function reverseGeocode(coords) {
    let lat = coords[0];
    let lon = coords[1];
    const apiKey = 'pk.c8db7815124fa4df3af7b91df0de474c';
    const url = `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;
    console.log(getData.url);
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
