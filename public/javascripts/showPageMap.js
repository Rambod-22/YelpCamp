mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: restaurant.geometry.coordinates, // starting position [lng, lat]
    zoom: 4 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(restaurant.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${restaurant.name}</h3><p>${restaurant.address}</p>`
        )
    )
    .addTo(map)

    map.addControl(new mapboxgl.NavigationControl());