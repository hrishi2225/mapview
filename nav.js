let map, userMarker;

function initMap() {
    // Initialize the map centered on a specific location (e.g., Googleplex)
    const initialLocation = { lat: 37.4219999, lng: -122.0840575 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 15,
    });

    // Add a marker at the initial location
    new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: "Initial Location"
      
    });

    // Try to get the user's current location 
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Update the user's marker position
                if (userMarker) {
                    userMarker.setPosition(userLocation);
                } else {
                    userMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Your Location",
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }
                    });
                }

                // Center the map on the user's location
                map.setCenter(userLocation);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    alert(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
}