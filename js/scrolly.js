// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: ".step",
  })
  .onStepEnter((response) => {
    var screenWidth = window.screen.width; // если эта переменная не используется, можно удалить эту строку
    console.log(response.element.attributes.datacoords.value);
    let coords = response.element.attributes.datacoords.value;
    let zoom = response.element.attributes.datazoom.value;
    map.flyTo(coords.split(","), zoom);

    let elems = response.element.attributes.dataobject.value.split(",");
    console.log(elems);
    for (let i = 0; i < elems.length; i++) {
      let paths = document.getElementsByClassName(elems[i]);
      for (let j = 0; j < paths.length; j++) {
        paths[j].setAttribute("stroke-opacity", "1"); // или '0' для полной прозрачности
      }
    }
  })
  .onStepExit((response) => {
    let elems = response.element.attributes.dataobject.value.split(",");
    console.log(elems);
    for (let i = 0; i < elems.length; i++) {
      let paths = document.getElementsByClassName(elems[i]);
      for (let j = 0; j < paths.length; j++) {
        paths[j].setAttribute("stroke-opacity", "0"); // или '0' для полной прозрачности
      }
    }
  });
