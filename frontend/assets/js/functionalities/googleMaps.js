var mymap = L.map('mapid').setView([51.505, -0.09], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmVudGhlc2hhcmsiLCJhIjoiY2twcjBqZHFrMG9zODJuczR1ZXRxbDV0MyJ9.l-prluKHRq1hCdOPDeSJ6A', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

findBusStops();

function findBusStops(stations) {
    for (let i = 0; i < stations.length; i++) {
        fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + stations[i] + " Maribor", { method: "GET" }).then((response) => { return response.json(); }).then((location) => {
            if (location.length == 0) {
                return
            }

            let busStop = location[0];
            console.log(busStop);
            L.marker([busStop.lat, busStop.lon]).addTo(mymap);
            mymap.setView([busStop.lat, busStop.lon], 13);
        });
    }

}