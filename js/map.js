mapboxgl.accessToken =
  "pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNsZGQyY2w5dDBjb2gzcG8xeXQ3c2EzczEifQ.lYkv8Hg7kFKNdNJF7wx4mg";

const MAP_SETTINGS = {
  container: "map",
  style: "./data/osm_liberty.json",
  center: [35.5, 47.1],
  zoom: 9,
  minZoom: 8,
  maxZoom: 18,
  pitch: 0,
  bearing: 0,
  antialias: true,
};

const map = new mapboxgl.Map(MAP_SETTINGS);
map.addControl(new mapboxgl.NavigationControl(), "top-right");

map.scrollZoom.disable();
map.dragPan.disable();

map.on("style.load", setupTerrain);
map.on("load", setupLayers);
map.on("load", animateLayers);
map.on("click", logClick);

// function setupTerrain() {
//   map.addSource("mapbox-dem", {
//     type: "raster-dem",
//     url: "mapbox://mapbox.mapbox-terrain-dem-v1",
//     tileSize: 512,
//     maxzoom: 18,
//   });
//   map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
// }

// addSource(
//   "custom-tiles",
//   "raster",
//   "https://raw.githubusercontent.com/texty/rus_tranches_2_web/main/tiles/{z}/{x}/{y}.png"
// );
// addLayer("custom-layer", "raster", "custom-tiles");

function setupTerrain() {
  map.addSource("custom-tiles", {
    type: "raster", // Используем тип "raster" для растровых тайлов
    tiles: [
      "https://raw.githubusercontent.com/texty/rus_tranches_2_web/main/tiles/{z}/{x}/{y}.png",
    ],
    tileSize: 256,
    maxzoom: 18,
  });

  map.addLayer({
    id: "custom-tiles-layer",
    type: "raster",
    source: "custom-tiles",
  });
}

function addSource(id, type, sourceData) {
  let sourceConfig = { type };

  switch (type) {
    case "raster":
      sourceConfig.tiles = [sourceData];
      break;
    case "vector":
      sourceConfig.url = sourceData;
      break;
    default:
      sourceConfig.data = sourceData;
      break;
  }

  map.addSource(id, sourceConfig);
}

function addLayer(id, type, source, paint = {}) {
  map.addLayer({ id, type, source, paint });
}

function setupLayers() {
  const sources = [
    { id: "front_line", type: "geojson", data: "data/front_line.geojson" },
    { id: "points", type: "geojson", data: "data/points.geojson" },
    { id: "lines", type: "geojson", data: "data/lines.geojson" },
  ];
  sources.forEach(({ id, type, data }) => addSource(id, type, data));

  addLayer("front_line-layer", "line", "front_line", {
    "line-color": "#f3a6b2",
    "line-width": 5,
  });
  addLayer("points-layer", "circle", "points", {
    "circle-radius": 5,
    "circle-color": "red",
    "circle-opacity": 0.8,
    "circle-stroke-color": "darkred",
    "circle-stroke-width": 2,
  });
  addLayer("lines-layer", "line", "lines", {
    "line-color": "darkred",
    "line-width": 2,
    "line-opacity": 1,
  });

  map.setFilter("lines-layer", ["==", ["get", "id"], ""]);
  map.setFilter("points-layer", ["==", ["get", "id"], ""]);
}

function logClick(event) {
  console.log(
    `Вы кликнули на координатах: ${event.lngLat.lat}, ${event.lngLat.lng}`
  );
}

// Анимационные функции (animatePoint и animateLine) остаются без изменений.

function animateLayers() {
  animateLine();
  animatePoint();
}

// Оставляем Scrollama код без изменений, так как он уже достаточно чист и аккуратен.

let pulse = true;
let pulseSize = 5;

function animatePoint() {
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
  requestAnimationFrame(animatePoint);
}

let pulseDirection = 1; // 1 для увеличения, -1 для уменьшения
let minLineWidth = 2;
let maxLineWidth = 5;

function animateLine() {
  // Текущая ширина линии
  let currentLineWidth = map.getPaintProperty("lines-layer", "line-width");

  // Изменение ширины линии
  if (pulseDirection === 1) {
    currentLineWidth += 0.1;
    if (currentLineWidth > maxLineWidth) pulseDirection = -1;
  } else {
    currentLineWidth -= 0.1;
    if (currentLineWidth < minLineWidth) pulseDirection = 1;
  }

  // Примените обновленную ширину к слою
  map.setPaintProperty("lines-layer", "line-width", currentLineWidth);

  // Запланировать следующую итерацию
  requestAnimationFrame(animateLine);
}

function createMatchFilter(valueList) {
  // Если список пуст, возвращаем фильтр, который всегда возвращает false
  if (!valueList || valueList.length === 0) {
    return ["==", ["get", "id"], "nonexistent_value"];
  }

  // В противном случае создаем фильтр "match"
  const matchFilter = ["match", ["get", "id"]];
  valueList.forEach((value) => {
    matchFilter.push(value, true);
  });
  matchFilter.push(false); // Это наш fallback output

  return matchFilter;
}

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

    console.log(points);

    map.setFilter("lines-layer", createMatchFilter(lines));
    map.setFilter("points-layer", createMatchFilter(points));

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

    map.setFilter("lines-layer", createMatchFilter(lines));
    map.setFilter("points-layer", createMatchFilter(points));
  });
