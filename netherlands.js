async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        mapId: "99b8730fe823e746",
        zoom: 13,
        center: { lat: 52.3730357, lng: 4.8932469 },
    });

    for (const place of places) {
        const marker =
            new AdvancedMarkerElement({
                map,
                content: buildContent(place),
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

const places = [
    {
        notes: "Dam Square, Amsterdam",
        title: "InstAdam Tour",
        price: "2 EUR",
        type: "tour",
        open: "Sat 13:30",
        time: "2 hrs",
        position: { lat: 52.3728, lng: 4.8932469 },
    },
    {
        notes: "Dam Square, Amsterdam",
        title: "Classic Tour",
        price: "2 EUR",
        type: "tour",
        open: "10:00-16:00",
        time: "2 hrs",
        position: { lat: 52.3729, lng: 4.894 },
    },
    {
        notes: "Dam Square, Amsterdam",
        title: "Food Tour",
        price: "2 EUR",
        type: "tour",
        open: "10:30",
        time: "2 hrs",
        position: { lat: 52.3729, lng: 4.8936 },
    },
    {
        notes: "Dam Square, Amsterdam",
        title: "Dark Side Tour",
        price: "2 EUR",
        type: "tour",
        open: "16:00",
        time: "2 hrs",
        position: { lat: 52.3730357, lng: 4.8934 },
    },
    {
        notes: "Dam Square, Amsterdam",
        title: "Anne Frank House Tour",
        price: "17 EUR",
        type: "museum",
        open: "9:00-22:00",
        time: "1-2 hrs",
        position: { lat: 52.3752182, lng: 4.8839765 },
    },
    {
        notes: `Very in demand. Pre-book VERY early.<br>Watch a documentary on Van Gogh and try to discover more about him.`,
        title: "Van Gogh Museum",
        price: "2 EUR",
        type: "museum",
        open: "9:00-18:00",
        time: "1-2 hrs",
        position: { lat: 52.3580757, lng: 4.8812053 },
    },
    {
        notes: `May be good for a **short** stop in before or after Anne Frank Museum.<br>You can taste test different cheeses from all over the world. It would be polite to buy something afterwards but you don't haaaaave toooooo`,
        title: "Cheese Museum",
        price: "0 EUR",
        type: "shop",
        open: "9:00-20:00",
        time: "0.25 hrs",
        position: { lat: 52.376389, lng: 4.884251 },
    },
    {
        notes: `To make the most of this, definitely check out this page: https://www.rijksmuseum.nl/en/visit/inside-the-museum<br>Watch some documentaries on the topics listed on that page, and do some extra research on whatever peaks your interest!`,
        title: "Rijksmuseum",
        price: "22.50 EUR",
        type: "museum",
        open: "9:00-17:00",
        time: "3-5 hrs",
        position: { lat: 52.3599976, lng: 4.8852188 },
    },
    {
        notes: `May be good for a **short** stop in before or after Anne Frank Museum.<br>You can taste test different cheeses from all over the world. It would be polite to buy something afterwards but you don't haaaaave toooooo`,
        title: "Hash Marijuana & Hemp Museum",
        price: "2 EUR",
        type: "museum",
        open: "10:00-22:00",
        time: "1 hr",
        position: { lat: 52.3717805, lng: 4.8969197 },
    },
    {
        notes: `May be good for a **short** stop in before or after Anne Frank Museum.<br>You can taste test different cheeses from all over the world. It would be polite to buy something afterwards but you don't haaaaave toooooo`,
        title: "Sex Museum",
        price: "10 EUR",
        type: "museum",
        open: "10:00-18:00",
        time: "1 hr",
        position: { lat: 52.3766117, lng: 4.897228699999999 },
    },
];

function getIconFromType(type) {
    switch (type) {
        case "museum":
            return "fa-solid fa-landmark";
        case "tour":
            return "fa-solid fa-person-walking";
        case "shop":
            return "fa-solid fa-shop";

        default:
            return null;
    }
}

function buildContent(place) {
    const content = document.createElement("div");

    content.classList.add("place");
    innerHTML = ''

    innerHTML += `
        <div class="icon">
            <i aria-hidden="true" class="${getIconFromType(place.type)}"></i>
            <span class="fa-sr-only">${place.type}</span>
        </div>
        <div class="details">
            <div class="place_name">${place.title}</div>
            <div class="notes">${place.notes}</div>
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