const country = window.location.href.split('/')[window.location.href.split('/').length - 2].replace(/-/g, ' ');

const mapCenters = {
    Netherlands: {
        zoom: 13,
        center: { lat: 52.3730357, lng: 4.8932469 }
    }
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        mapId: "99b8730fe823e746",
        zoom: mapCenters[country]?.zoom || 4.45,
        center: mapCenters[country]?.center || { lat: 49.2492459, lng: 14.303387 },
    });

    // Show pins for each individual country
    if (mapCenters[country] != undefined) {
        const places = await (await fetch('../places.json')).json()
        console.log(places)

        // Add marker for each place
        for (const place of places) {
            if ((place.country != country) && (mapCenters[country] != undefined)) continue;
            const marker =
                new AdvancedMarkerElement({
                    map,
                    content: buildContent(place),
                    position: place.coordinates,
                    title: place.name,
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
    } else {
        // Otherwise, show an overview of the trip
        
    }
}

function getIconFromType(type) {
    switch (type) {
        case "Museum":
            return "fa-solid fa-landmark";
        case "Tour":
            return "fa-solid fa-person-walking";
        case "Shop":
            return "fa-solid fa-shop";

        default:
            return null;
    }
}

function buildContent(place) {
    const content = document.createElement("div");
    content.classList.add("place");
    var innerHTML = ''

    innerHTML += `
        <div class="icon">
            <i aria-hidden="true" class="${getIconFromType(place.type)}"></i>
            <span class="fa-sr-only">${place.type}</span>
        </div>
        <div class="details">
            <div class="place_name">${place.name}</div>
            <div class="notes">${place.description}</div>
            <div class="features">
                <div>
                    <i aria-hidden="true" class="fa-solid fa-euro-sign" style="color: #32b517" title="Price"></i>
                    <span class="fa-sr-only">Price</span>
                    <span>${place.price}</span>
                </div>
                <div>
                    <i aria-hidden="true" class="fa-regular fa-calendar" title="Open Times"></i>
                    <span class="fa-sr-only">Open Times</span>
                    <span>${place.open}</span>
                </div>
                <div>
                    <i aria-hidden="true" class="fa-regular fa-clock" title="Estimated Time"></i>
                    <span class="fa-sr-only">Estimated Time</span>
                    <span>${place.time}</span>
                </div>
            </div>
        </div>
      `

    content.innerHTML = innerHTML;
    return content;
}

initMap();