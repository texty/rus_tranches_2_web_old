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
  "https://raw.githubusercontent.com/texty/rus_tranches_2_web/main/tiles/{z}/{x}/{y}.png",
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

var tranchesStyles = {
  fillColor: "none",
  // "stroke-width": 5,
};

var frontLineStyles = {
  fillColor: "none",
  color: "#f3a6b2",
  "stroke-width": 5,
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

fetch("data/tranches.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoData = L.geoJSON(data, {
      style: tranchesStyles,
    });
    geoData.setStyle({ className: "tranches" });
    geoData.addTo(map);
  });

// fetch("data/tranches_routes.geojson")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     geoData = L.geoJSON(data, {
//       style: tranchesStyles,
//     });
//     geoData.setStyle({ className: "tranches_routes" });
//     geoData.addTo(map);
//   });

// fetch("data/tank_lines.geojson")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     geoData = L.geoJSON(data, {
//       style: tranchesStyles,
//     });
//     geoData.setStyle({ className: "tank_lines" });
//     geoData.addTo(map);
//   });

// fetch("data/pyramids.geojson")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     geoData = L.geoJSON(data, {
//       style: tranchesStyles,
//     });
//     geoData.setStyle({ className: "pyramids" });
//     geoData.addTo(map);
//   });
