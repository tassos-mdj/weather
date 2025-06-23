function geoFind() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
}

export default async function getCoords() {
    const position = await geoFind();
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    return [latitude, longitude];
}
