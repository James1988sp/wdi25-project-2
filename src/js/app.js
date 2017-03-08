/* global google */
$(() => {

  function initMap() {
    var london = {lat: 51.5073509, lng: -0.12775829999998223};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: london
    });

    new google.maps.Marker({
      position: london,
      map: map
    });
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
        $weatherInfo.append(`<p>Wind (mph) ${res.current.wind_mph}%</p>`);

      });
  }
});
