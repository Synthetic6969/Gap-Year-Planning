import { places } from './places';
console.log(places)

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        mapId: "99b8730fe823e746",
        zoom: 13,
        center: { lat: 52.3730357, lng: 4.8932469 },
    });

    // Add marker for each place
    for (const place of places) {
        const markerContent = document.createElement("div");
        markerContent.classList.add("place");
        markerContent.innerHTML = place.content;

        const marker =
            new AdvancedMarkerElement({
                map,
                content: markerContent,
                position: place.position,
                title: place.description,
            });

        marker.addListener("click", () => {
            if (marker.content.classList.contains("highlight")) {
                marker.content.classList.remove("highlight");
                marker.zIndex = null;
            } else {
                marker.content.classList.add("highlight");
                marker.zIndex = 1;
            }
        });
    }
}

initMap();