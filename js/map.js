mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNsZGQyY2w5dDBjb2gzcG8xeXQ3c2EzczEifQ.lYkv8Hg7kFKNdNJF7wx4mg";

var map_center = [35.5, 47.1];
var main_zoom = 9;
const bounds = [
  [46, 34], // Southwest coordinates
  [48, 37], // Northeast coordinates
];

// "./data/osm_liberty.json",

const map = new mapboxgl.Map({
  container: "map",
  style: "./data/osm_liberty.json",
  center: map_center,
  zoom: main_zoom,
  minZoom: 8,
  maxZoom: 18,
  pitch: 0,
  bearing: 0,
  antialias: true,
  //   maxBounds: bounds,
});

map.addControl(new mapboxgl.NavigationControl(), "top-right");

map.scrollZoom.disable();
map.dragPan.disable();

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

  //   Додаємо джерела із файлів

  map.addSource("front_line", {
    type: "geojson",
    data: "data/front_line.geojson",
  });

  map.addSource("points", {
    type: "geojson",
    data: "data/points.geojson",
  });

  map.addSource("lines", {
    type: "geojson",
    data: "data/lines.geojson",
  });

  //   Додаємо шари

  map.addLayer({
    id: "front_line-layer",
    type: "line",
    source: "front_line",
    paint: {
      "line-color": "#f3a6b2",
      "line-width": 5,
    },
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

  //   Додаємо фільтри для шарів
});

map.on("click", function (event) {
  console.log(
    "Вы кликнули на координатах: " + event.lngLat.lat + ", " + event.lngLat.lng
  );
});

let pulse = true;
let pulseSize = 5;

function animate() {
  // Обновите размер и прозрачность точки в зависимости от текущего значения pulse
  if (pulse) {
    pulseSize += 0.1;
    if (pulseSize > 10) pulse = false; // Максимальный размер пульсации
  } else {
    pulseSize -= 0.1;
    if (pulseSize < 5) pulse = true; // Минимальный размер пульсации
  }

  // Примените обновленный размер к слою
  map.setPaintProperty("points-layer", "circle-radius", pulseSize);

  // Запланировать следующую итерацию
  requestAnimationFrame(animate);
}

// Запустите анимационный цикл после загрузки карты
map.on("load", function () {
  animate();
});

// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: ".step",
  })
  .onStepEnter((response) => {
    console.log(response.element.attributes.datacoords.value);
    let coords = response.element.attributes.datacoords.value.split(",");
    let zoom = parseInt(response.element.attributes.datazoom.value);
    console.log(coords);
    console.log(zoom);

    let polygons = response.element.attributes.datapoly
      ? response.element.attributes.datapoly.value.split(",")
      : [];

    console.log(polygons);
    let lines = response.element.attributes.datalines
      ? response.element.attributes.datalines.value.split(",")
      : [];

    console.log(lines);
    let points = response.element.attributes.datapoints
      ? response.element.attributes.datapoints.value.split(",")
      : [];

    console.log(lines);

    map.setFilter("lines-layer", [
      "match",
      ["get", "id"],
      ...lines,
      true,
      false,
    ]);
    map.setFilter("points-layer", [
      "match",
      ["get", "id"],
      ...points,
      true,
      false,
    ]);

    // Изменяем способ перелета к точке
    map.flyTo({
      center: [parseFloat(coords[1]), parseFloat(coords[0])],
      zoom: zoom,
      duration: 1.0,
    });
  })
  .onStepExit((response) => {
    let polygons = response.element.attributes.datapoly
      ? response.element.attributes.datapoly.value.split(",")
      : [];

    console.log(polygons);
    let lines = response.element.attributes.datalines
      ? response.element.attributes.datalines.value.split(",")
      : [];

    console.log(lines);
    let points = response.element.attributes.datapoints
      ? response.element.attributes.datapoints.value.split(",")
      : [];

    console.log(lines);

    map.setFilter("lines-layer", [
      "match",
      ["get", "id"],
      ...lines,
      true,
      false,
    ]);
    map.setFilter("points-layer", [
      "match",
      ["get", "id"],
      ...points,
      true,
      false,
    ]);
  });
