var map = L.map("map", {
  scrollWheelZoom: false,
  zoomControl: false,
}).setView([47.414641, 35.84587538436732], 12);

new L.Control.Zoom({ position: "topright" }).addTo(map);

("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
("https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}");
("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png");

L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  {
    maxZoom: 17,
    minZoom: 11,
    attribution: "© OpenStreetMap",
  }
).addTo(map);

// https://raw.githubusercontent.com/HubashovD/project_mykolaiv_shelling_web/main/tiles/tileset/{z}/{x}/{y}.png

L.tileLayer(
  //   "https://texty.org.ua/d/2022/mykolaiv_shelling_tiles/tiles_webp/ts/{z}/{x}/{y}.webp",
  "https://raw.githubusercontent.com/texty/rus_tranches_2_web/main/tiles/tiles/{z}/{x}/{y}.png",
  {
    maxZoom: 17,
    minZoom: 11,
    attribution: "© Planet.com",
  }
).addTo(map);

var southWest = L.latLng(47.1715612851653816, 35.595561905493966),
  northEast = L.latLng(47.5127811161710554, 36.128494862082043);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: true });
});

var frontLineStyles = {
  color: "#f3a6b2",
  fillColor: "none",
  "stroke-width": 10,
};

fetch("data/front_line.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoData = L.geoJSON(data, {
      style: frontLineStyles,
    });
    geoData.setStyle({ className: "frontline" });
    geoData.addTo(map);
  });

var positiosStyles = {
  color: "transperent",
  fillColor: "transperent",
  "stroke-width": 1,
};

fetch("data/artilerry position.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var positions = L.geoJSON(data, {
      style: positiosStyles,
    });
    positions.addTo(map);

    positions.on("click", function (e) {
      console.log(e.latlng); // e is an event object (MouseEvent in this case)
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var zoom = 17;
      map.setView([lat, lng], zoom);
    });
  });

var shellingTrianglesStyles = {
  color: "black",
  opacity: 0.9,
  "stroke-width": 1,
};

var shelling_points = {
  color: "#f3a6b2",
  opacity: 0.9,
  "stroke-width": 1,
};

var shellingTriangle2 = {
  color: "black",
  opacity: 0.9,
  "stroke-width": 1,
};

fetch("data/shelling_triangles.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoData = L.geoJSON(data, {
      style: shellingTrianglesStyles,
    });
    geoData.setStyle({ className: "shellingTriangle" });
    geoData.addTo(map);
  });

fetch("data/shelling_points.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoData = L.geoJSON(data, {
      style: shellingTrianglesStyles,
    });
    geoData.setStyle({ className: "shelling-points" });
    geoData.addTo(map);
  });

fetch("data/shelling_triangles_2.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoData = L.geoJSON(data, {
      style: shellingTrianglesStyles,
    });
    geoData.setStyle({ className: "shelling-triangle-2" });
    geoData.addTo(map);
  });
