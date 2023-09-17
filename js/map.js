mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNsZGQyY2w5dDBjb2gzcG8xeXQ3c2EzczEifQ.lYkv8Hg7kFKNdNJF7wx4mg";

var map_center = [35.5, 47.1];
var main_zoom = 13;
const bounds = [
  [30.5121, 50.2234], // Southwest coordinates
  [33.4476, 52.6351], // Northeast coordinates
];

// "./data/osm_liberty.json",

const map = new mapboxgl.Map({
  container: "map",
  style: "data/positron2.json",
  //style: 'mapbox://styles/mapbox/satellite-streets-v9',
  center: map_center,
  zoom: main_zoom,
  minZoom: 7,
  maxZoom: 14,
  pitch: 0,
  bearing: 0,
  antialias: true,
  maxBounds: bounds,
});

map.addControl(new mapboxgl.NavigationControl(), "top-right");

map.scrollZoom.disable(); // отключает зум с помощью колеса мыши
map.dragPan.disable(); // отключает перемещение с помощью перетаскивания

map.on("style.load", () => {
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });
  // add the DEM source as a terrain layer with exaggerated height
  map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
});

map.on("load", function () {

  map.addSource("custom-tiles", {
    type: "raster",
    tiles: [
      "https://raw.githubusercontent.com/texty/rus_tranches_2_web/main/tiles/{z}/{x}/{y}.png",
    ],
    tileSize: 256,
  });

  map.addLayer({
    id: "custom-layer",
    type: "raster",
    source: "custom-tiles",
  });

  // Добавление GeoJSON слоев
  fetch("data/front_line.geojson")
    .then((response) => response.json())
    .then((data) => {
      map.addSource("front_line", {
        type: "geojson",
        data: data,
      });
      map.addLayer({
        id: "front_line-layer",
        type: "line",
        source: "front_line",
        paint: {
          "line-color": "#f3a6b2",
          "line-width": 5,
        },
      });
    });

  fetch("data/tranches.geojson")
    .then((response) => response.json())
    .then((data) => {
      map.addSource("tranches", {
        type: "geojson",
        data: data,
      });
      map.addLayer({
        id: "tranches-layer",
        type: "line",
        source: "tranches",
        paint: {
          "line-color": "transparent",
        },
      });
    });

  fetch("data/points.geojson")
    .then((response) => response.json())
    .then((data) => {
      map.addSource("points", {
        type: "geojson",
        data: data,
      });
      map.addLayer({
        id: "points-layer",
        type: "circle",
        source: "points",
        paint: {
          "circle-radius": 5,
          "circle-color": "red",
          "circle-opacity": 0.8,
          "circle-stroke-color": "darkred",
          "circle-stroke-width": 2,
        },
      });
    });

  fetch("data/lines.geojson")
    .then((response) => response.json())
    .then((data) => {
      map.addSource("lines", {
        type: "geojson",
        data: data,
      });
      map.addLayer({
        id: "lines-layer",
        type: "line",
        source: "lines",
        paint: {
          "line-color": "darkred",
          "line-width": 2,
          "line-opacity": 1,
        },
      });
    });
});

map.on("click", function (event) {
  console.log(
    "Вы кликнули на координатах: " + event.lngLat.lat + ", " + event.lngLat.lng
  );
});
