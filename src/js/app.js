/* global google */
$(() => {
  let map = null;
  let infowindow = null;
  const $map = $('#map');
  const beachData = $('#map').data('beaches');
  let location = null;

  if ($map.length) getBeachLocation();

  function getBeachLocation() {
    initMap();
    const geocoder = new google.maps.Geocoder();
    beachData.forEach((beach) => {
      geocoder.geocode({ address: `${beach.name}, ${beach.country}` }, (results) => {
        beach.lat = results[0].geometry.location.lat();
        beach.lng = results[0].geometry.location.lng();
        console.log(beach);
        addMarker(beach);
      });
    });
  }

  function addMarker(beach) {
    const latlng = { lat: beach.lat, lng: beach.lng };
    const marker = new google.maps.Marker({
      position: latlng,
      map
    });
    marker.addListener('click', () => {
      markerClick(marker, beach);
    });
  }

  function initMap() {
    var london = {lat: 51.5073509, lng: -0.12775829999998223};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: london
    });

    const marker = new google.maps.Marker({
      position: london,
      map: map
    });
    marker.setMap(map);

  }
  function markerClick(marker, beach) {
    console.log(beach);
    if(infowindow) infowindow.close();

    infowindow = new google.maps.InfoWindow({
      content:
       `<div class="infowindow">
         <a href="/beaches/${beach._id}"><h1>${beach.name}</h1></a>
         <p>${beach.country}</p>
       </div>`
    });

    infowindow.open(map, marker);
  }

  if($('#map').length > 0) initMap();

  const $weatherInfo = $('#weatherInfo');

  if($weatherInfo.length > 0) {
    // we're on the show page
    // make a request to the API
    const q = $weatherInfo.data('q');
    console.log(q);
    //{q} is the name of the object I pushed in !!!!
    $.get(`http://api.apixu.com/v1/current.json?key=a1ff65ee2ac1453e9db111848170803&q=${q}`)
      .done((res) => {
        $weatherInfo.append(`<p>Temp (ºC) ${res.current.temp_c}</p>`);
        $weatherInfo.append(`<p>Cloud Cover ${res.current.cloud}%</p>`);
        $weatherInfo.append(`<p>Humidity ${res.current.humidity}%</p>`);
        $weatherInfo.append(`<p>Wind (mph) ${res.current.wind_mph}</p>`);
      });
  }
});
