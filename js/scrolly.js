// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: ".step",
  })
  .onStepEnter(
    (response) => {
      var screenWidth = window.screen.width;
      console.log(response.element.attributes.datacoords.value);
      coords = response.element.attributes.datacoords.value;
      zoom = response.element.attributes.datazoom.value;
      map.flyTo(coords.split(","), zoom);
    }
    // { element, index, direction }
  )
  .onStepExit((response) => {
    if (response.index == 1 && response.direction == "up") {
      staticMap = document.getElementById("staticMap");
      staticMap.src = "pic/distances_render-min.png";
    } else if (response.index == 6 && response.direction == "up") {
      map.flyTo([46.6673622366812, 32.25723983463976], 12);
    } else if (response.index == 23) {
      elem = document.getElementsByClassName("shelling-points");
      for (var i = 0; i < elem.length; i++) {
        elem[i].style.opacity = "0";
      }
      console.log(elem);
    } else if (response.index == 24) {
      elem = document.getElementsByClassName("shelling-triangle-2");
      for (var i = 0; i < elem.length; i++) {
        elem[i].style.opacity = "0";
      }
    } else if (response.index == 26) {
      map.flyTo([46.730213127141624, 32.19878196716309], 17);
      elem = document.getElementsByClassName("shellingTriangle");
      console.log(elem);
      for (var i = 0; i < elem.length; i++) {
        elem[i].style.opacity = "0";
      }
    }
  });
