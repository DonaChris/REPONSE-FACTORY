function locationMap(getSection, data = null) {

    let map, marker, dectectRsult;
    let dectectLongitude, dectectLatitude, drawCircleList = [];
    let initialLongitude = 2.4097945, initialLatitude = 6.3714947, initialLocation = "Etoile rouge, Littoral, Benin";
    let infoWindow = new google.maps.InfoWindow();
    let waitingLocationDetectContent = `
     <span class="spinner-border spinner-border-sm spin-progress text-danger mx-2" role="status"></span>`;


    function setLocation(longitude, latitude, location) {
        document.getElementById("location-longitude").value = longitude;
        document.getElementById("location-latitude").value = latitude;
        document.getElementById("location").value = location;
    }


    function saveDetectPostion(longitude, latitude, location) {
        dectectLongitude = longitude;
        dectectLatitude = latitude;
        dectectRsult = location;
    }


    function setCenter(longitude, latitude) {
        map.setCenter(new google.maps.LatLng(latitude, longitude));
        marker.setPosition(map.getCenter());
        drawCircle(marker);
    }


    function initMap(section) {

        let configJson = {
            zoom: 16,
            streetViewControl: false,
            zoomControl: true,
            gestureHandling: "greedy",
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(initialLatitude, initialLongitude)
        };

        // Map
        map = new google.maps.Map(document.getElementById(section), configJson);

        // Marker
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(initialLatitude, initialLongitude),
            icon: jsAsset('main/images/map-icon/map-bounce.png'),
            draggable: false
        });

        // Init map, marker, circle position in center
        marker.setMap(map);
        drawCircle(marker);

        let markerLng = marker.getPosition().lng();
        let markerLat = marker.getPosition().lat();
        saveDetectPostion(markerLng, markerLat, initialLocation);

        // On map ready
        google.maps.event.addListenerOnce(map, 'idle', function () {
            infoWindow.setContent(initialLocation);
            infoWindow.open(map, marker);
        });

        //  On drag, change marker position
        map.addListener('drag', function () {
            if (infoWindow.getContent() != waitingLocationDetectContent) {
                infoWindow.setContent(waitingLocationDetectContent);
            }
            marker.setPosition(map.getCenter());
            drawCircle(marker);
        });

        // on drag end, we get final address
        map.addListener('dragend', function () {
            infoWindow.setContent(waitingLocationDetectContent);
            saveDetectPostion(map.getCenter().lng(), map.getCenter().lat(), getAdressFromLngLat(map.getCenter().lng(), map.getCenter().lat()));
        });

        // Événement lors de la sélection de la localisation
        $('#selectLocationBtn').click(function () {
            if (dectectRsult != null) {
                setLocation(dectectLongitude, dectectLatitude, dectectRsult);
                $('#modal-location').modal('hide');
            } else {
                globalToastify("error")
            }

        });
    }


    function initAutocomplete() {
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('map-search-location')),
            { types: ['geocode', 'establishment'] });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            let selectedPlace = autocomplete.getPlace();
            if (selectedPlace.geometry && selectedPlace.geometry.location) {
                dectectLatitude = selectedPlace.geometry.location.lat();
                dectectLongitude = selectedPlace.geometry.location.lng();
                dectectRsult = autocomplete.getPlace().formatted_address;
                setCenter(dectectLongitude, dectectLatitude);
                infoWindow.setContent(dectectRsult);
                infoWindow.open(map, marker);
            }
        });
    }


    function drawCircle(marker) {
        // Remvoe previuw
        removeCircle(drawCircleList);

        // Add circle
        let circle = new google.maps.Circle({
            strokeColor: "#09624bbd",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#09624bbd",
            fillOpacity: 0.35,
            map,
            center: marker.getPosition(),
            radius: 10,
        });

        // save circle
        drawCircleList.push(circle);
    }


    function removeCircle(circles) {
        if (circles.length > 0) {
            for (let i in circles) {
                circles[i].setMap(null);
            }
        }
        drawCircleList = [];
    }


    function getAdressFromLngLat(longitude, latitude) {
        let result = "";
        let latlng = { lat: latitude, lng: longitude }; // Example coordinates
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    dectectRsult = results[0].formatted_address;
                    // set adress
                    if (infoWindow.getContent() == waitingLocationDetectContent) {
                        infoWindow.setContent(dectectRsult);
                        infoWindow.open(map, marker);
                    }
                } else {
                    globalToastify("error");
                }
            } else {
                globalToastify("error");
            }
        });
        return result;
    }


    // Run porcess
    initMap(getSection, data);
    initAutocomplete();


    // whend choose recent location
    let recentLocations = document.querySelectorAll(".btn-select-location");
    if (recentLocations != null) {
        recentLocations.forEach(recentLocation => {
            recentLocation.addEventListener("click", () => {
                setLocation(recentLocation.dataset.lng, recentLocation.dataset.lat, recentLocation.dataset.location);
                $("#modal-location").modal("hide");
            });
        })
    }
}