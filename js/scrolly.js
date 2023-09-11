       // instantiate the scrollama
       const scroller = scrollama();

       // setup the instance, pass callback functions
       scroller
           .setup({
               step: ".step",
           })
           .onStepEnter((response) => {
               var screenWidth = window.screen.width
               console.log(response)
               if (response.index == 0 && response.direction == 'down') {
                   staticMap = document.getElementById("staticMap")
                   staticMap.src = "pic/distances_render-min.png"
               } else if (response.index == 1) {
                   staticMapWrapper = document.getElementById("staticMap")
                   staticMapWrapper.src = "pic/shellings_render-min.png"
               } else if (response.index == 2) {
                   staticMapWrapper = document.getElementById("staticMap")
                   staticMapWrapper.src = "pic/ru_shelling_zone_render-min.png"
               } else if (response.index == 3) {
                   staticMapWrapper = document.getElementById("staticMap")
                   staticMapWrapper.src = "pic/fires_now_render-min.png"
               } else if (response.index == 4) {
                   staticMapWrapper = document.getElementById("staticMap")
                   staticMapWrapper.src = "pic/fires_previos_render-min.png"
               } else if (response.index == 5) {
                   staticMapWrapper = document.getElementById("staticMap")
                   staticMapWrapper.src = "pic/ua_shelling_zone_render-min.png"
               } else if (response.index == 6) {

                   map.flyTo([46.70950052897342, 32.41241455078126], 12)
               } else if (response.index == 8) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.748256613681406, 32.310576438903816], 16);
                   } else {
                       map.flyTo([46.748315425279316, 32.30854868888856], 17);
                   }
               } else if (response.index == 9) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.7367430076866, 32.248950004577644], 15);
                   } else {
                       map.flyTo([46.7370444808237, 32.24112610244752], 16);
                   }

               } else if (response.index == 10) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.73541944714171, 32.27081537246705], 16);
                   } else {
                       map.flyTo([46.73540474073094, 32.268884181976325], 17);
                   }
               } else if (response.index == 11) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.96956444840468, 32.65231132507325], 15); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.96941802389087, 32.64308452606202], 16); //
                   }
               } else if (response.index == 12) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.76870447810992, 32.90022253990174], 16); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.76889554304747, 32.89696097373963], 17); //
                   }
               } else if (response.index == 13) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.93071129730967, 32.45832324028016], 17); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.93083584821279, 32.45646715164185], 17); //
                   }
               } else if (response.index == 14) {
                   map.flyTo([46.6673622366812, 32.25723983463976], 12);
               } else if (response.index == 15) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.72354271447431, 32.18935132026673], 17); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.7234765210204, 32.184276580810554], 17); //
                   }
               } else if (response.index == 16) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.730235188879945, 32.20083117485047], 17); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.73018371147653, 32.19735503196717], 17); //
                   }
               } else if (response.index == 17) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.66391365909663, 32.31797933578492], 16); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.66392838499259, 32.310372591018684], 16); //
                   }
               } else if (response.index == 18) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.93149523052133, 32.55686759948731], 16); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.93471876050394, 32.55411028862], 16); //
                   }
               } else if (response.index == 19) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.74413229035123, 32.816247940063484], 17); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.74421316246913, 32.812954187393196], 17); //
                   }
               } else if (response.index == 20) {
                   map.flyTo([46.93075525648501, 32.45782434940339], 17); //
               } else if (response.index == 21) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.68183210646615, 32.50841617584229], 14); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.683098099041715, 32.494640350341804], 15);
                   }

               } else if (response.index == 22) {
                   if (screenWidth < 1023) {
                       console.log(screenWidth)
                       map.flyTo([46.801080306695276, 32.41592288017274], 16); //
                   } else {
                       console.log('for pc')
                       map.flyTo([46.80094076583634, 32.41108417510987], 17);
                   }


               } else if (response.index == 23) {
                   elem = document.getElementsByClassName("shelling-points")
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "1"
                   }
                   console.log(elem)
               } else if (response.index == 24) {
                   elem = document.getElementsByClassName("shelling-triangle-2")
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "1"
                   }
                   console.log(elem)
               } else if (response.index == 25) {
                   map.flyTo([46.804010581131735, 32.412977814674385], 17);
               } else if (response.index == 26) {
                   map.flyTo([46.730213127141624, 32.19878196716309], 17); //
                   elem = document.getElementsByClassName("shellingTriangle")
                   console.log(elem)
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "1"
                   }
               } else if (response.index == 27) {
                   map.flyTo([46.663103728640706, 32.72026777267457], 17);
               } else if (response.index == 28) {
                   map.flyTo([46.74444842612227, 32.80956387519837], 17); //
               } else if (response.index == 29) {
                   map.flyTo([46.741978106557006, 32.814729809761054], 17); //
               } else if (response.index == 30) {
                   map.flyTo([46.72620877218586, 32.69769430160523], 17); //
               } else if (response.index == 31) {
                   map.flyTo([46.70950052897342, 32.41241455078126], 12)
               } else if (response.index == 99) {
                   map.flyTo([46.72967628872848, 32.19966709613801], 17);
                   elem = document.getElementsByClassName("shellingTriangle")
                   console.log(elem)
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "1"
                   }
               }
               // { element, index, direction }
           })
           .onStepExit((response) => {
               if (response.index == 1 && response.direction == 'up') {
                   staticMap = document.getElementById("staticMap")
                   staticMap.src = "pic/distances_render-min.png"
               } else if (response.index == 6 && response.direction == 'up') {
                   map.flyTo([46.6673622366812, 32.25723983463976], 12)
               } else if (response.index == 23) {
                   elem = document.getElementsByClassName("shelling-points")
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "0"
                   }
                   console.log(elem)
               } else if (response.index == 24) {
                   elem = document.getElementsByClassName("shelling-triangle-2")
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "0"
                   }
               } else if (response.index == 26) {
                   map.flyTo([46.730213127141624, 32.19878196716309], 17);
                   elem = document.getElementsByClassName("shellingTriangle")
                   console.log(elem)
                   for (var i = 0; i < elem.length; i++) {
                       elem[i].style.opacity = "0"
                   }
               }
           });