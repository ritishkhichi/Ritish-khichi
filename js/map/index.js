let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: new google.maps.LatLng(25.59, 78.96),
        mapTypeId: "terrain",
    });
    const script = document.createElement("script");

    script.src =
        "js/map/json_data.js";
    document.getElementsByTagName("head")[0].appendChild(script);
}

const eqfeed_callback = function(results) {
    for (let i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[0], coords[1]);

        const title = results.features[i].properties.place;
        const temp_data = results.features[i].properties.R2;
        const temp_data_1 = results.features[i].properties.βvalue;
        const temp_data_2 = results.features[i].properties.bvalue;
        const temp_data_3 = results.features[i].properties.bvalueR2;
        const temp_data_4 = results.features[i].properties.γr1;
        const temp_data_5 = results.features[i].properties.αvalue;
        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>' +
            '<div id="bodyContent">' +
            "<table>" +
            "<tr>" +
            " <th>" + "βvalue" + "</th>" +
            "  <th>" + "R2" + "</th>" +
            "  <th>" + "bvalue" + "</th>" +
            "  <th>" + "bvalueR2" + "</th>" +
            "  <th>" + "γr1" + "</th>" +
            "  <th>" + "αvalue" + "</th>" +
            " </tr>" +


            " <tr>" +
            "      <td>" + temp_data_1 + "</td>" +
            "       <td>" + temp_data + "</td>" +
            "       <td>" + temp_data_2 + "</td>" +
            "       <td>" + temp_data_3 + "</td>" +
            "       <td>" + temp_data_4 + "</td>" +
            "       <td>" + temp_data_5 + "</td>" +

            " </tr>" +


            "</table>" +
            "</div>" +
            "</div>";
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        const marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: title,
        });

        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
        var heatmapData = [
            new google.maps.LatLng(coords[0], coords[1]),
        ];
        const heatmap = new google.maps.visualization.HeatmapLayer({
            map: map,
            data: heatmapData,
            radius: 50,
            disspating: 0.5,
        });
    }
};
window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;