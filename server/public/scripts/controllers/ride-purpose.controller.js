myApp.controller('RidePurposeController', function() {
    console.log('RidePurposeController created');
    var rpc = this;

    geolocate();

    var placeSearch, autocomplete;
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    // This example displays an address form, using the autocomplete feature
    // of the Google Places API to help users fill in the information.

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    function fillInAddress() {
      var geocoder = new google.maps.Geocoder();
      var place = autocomplete.getPlace();

      var lat = place.geometry.location.lat(),
          lng = place.geometry.location.lng();

      console.log("coordinates are:", place, lat, lng);
      // geocoder.geocode({'address': place})











// EXAMPLES FILL IN
      // // Get the place details from the autocomplete object.
      // var place = autocomplete.getPlace();
      // console.log('place is:', place);
      // var coordinates = place.geolocation;
      // console.log("coordinates", coordinates);
      //
      // for (var component in componentForm) {
      //   document.getElementById(component).value = '';
      //   document.getElementById(component).disabled = false;
      // }
      //
      // // Get each component of the address from the place details
      // // and fill the corresponding field on the form.
      // for (var i = 0; i < place.address_components.length; i++) {
      //   var addressType = place.address_components[i].types[0];
      //   if (componentForm[addressType]) {
      //     var val = place.address_components[i][componentForm[addressType]];
      //     document.getElementById(addressType).value = val;
      //   }
      // }
    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position);
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    };

});
