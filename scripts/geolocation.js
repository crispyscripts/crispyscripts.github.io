function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorCallback);
    }
    else {
        infoParagraph.innerHTML = "Geolocation not supported";
    }
}

function showPosition(position) {
    infoParagraph.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function errorCallback(e) {
    infoParagraph.innerHTML = "Something went wrong";
}