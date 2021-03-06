$.get('data/countries.json', init);


function init (geodata) {
  var acetateUrl = 'http://acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png',
      acetateAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | Imagery &copy; <a href="http://fortiusone.com">FortiusOne</a> and <a href="http://stamen.com">Stamen</a>',
      acetateLayer = L.tileLayer(acetateUrl, { attribution: acetateAttrib });

  var satelliteId = "ryanmullins.i0ag89ph",
      satelliteAccessToken = "pk.eyJ1Ijoicnlhbm11bGxpbnMiLCJhIjoieVNEWlg0byJ9.rmd658DISvQVDbU7x0iI1Q",
      satelliteUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" + satelliteAccessToken,
      satelliteAttrib = '&copy; <a href="http://mapbox.com">Mapbox</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, &copy; <a href="https://www.digitalglobe.com">DigitalGlobe</a>'
      satelliteLayer = L.tileLayer(satelliteUrl, { id:satelliteId, attribution:satelliteAttrib })

  // var evacCentersLayer = L.geoJson(geodata.evaccenters, {
  //   'onEachFeature' : function (feature, layer) {
  //     var popup = L.popup(),
  //         icon = L.divIcon({ className: 'fa fa-fw fa-home' });

  //     popup.setContent("Name: " + feature.properties.EC_NAME + "<br/>" +
  //                      "Address: " +feature.properties.ADDRESS + "<br/>" +
  //                      "Coordinates: " + feature.geometry.coordinates);

  //     layer
  //       .setIcon(icon)
  //       .bindPopup(popup);
  //   }
  // });

  // var evacZoneLayer = L.geoJson(geodata.evaczones, {
  //   style: function (feature) {
  //     var style = {
  //       'fillOpacity' : 0.6,
  //       'stroke' : false,
  //       'weight' : 3
  //     };

  //     if (feature.properties.Zone === "6") {
  //       style.fillColor = "#feedde";
  //     } else if (feature.properties.Zone === "5") {
  //       style.fillColor = "#fdd0a2";
  //     } else if (feature.properties.Zone === "4") {
  //       style.fillColor = "#fdae6b";
  //     } else if (feature.properties.Zone === "3") {
  //       style.fillColor = "#fd8d3c";
  //     } else if (feature.properties.Zone === "2") {
  //       style.fillColor = "#e6550d";
  //     } else if (feature.properties.Zone === "1") {
  //       style.fillColor = "#a63603";
  //     } else {
  //       style.fill = false;
  //     }

  //     return style;
  //   }
  // });

  // var hospitalsLayer = L.geoJson(geodata.hospitals, {
  //   onEachFeature: function (feature, layer) {
  //     var popup = L.popup(),
  //         icon = L.divIcon({ className: 'fa fa-fw fa-h-square' });

  //     popup.setContent("Name: " + feature.properties.Name + "<br/>" +
  //                      "Address: " + feature.properties.Address + "<br/>" +
  //                      "Capacity: " + feature.properties.Capacity);

  //     layer
  //       .setIcon(icon)
  //       .bindPopup(popup);
  //   }
  // });

  var gccLayer = L.geoJson(geodata, {
    style: function (feature) {
      var gccStyle = { stroke:true, weight:1, color:'#666', opacity:1, fillOpacity:0.7 };

      if (feature.properties.ABBREV === 'USAFRICOM') {
        gccStyle.fillColor = "#66c2a5";
      } else if (feature.properties.ABBREV === 'USCENTCOM') {
        gccStyle.fillColor = "#ffd92f";
      } else if (feature.properties.ABBREV === 'USEUCOM') {
        gccStyle.fillColor = "#fc8d62";
      } else if (feature.properties.ABBREV === 'USNORTHCOM') {
        gccStyle.fillColor = "#e78ac3";
      } else if (feature.properties.ABBREV === 'USPACOM') {
        gccStyle.fillColor = "#8da0cb";
      } else if (feature.properties.ABBREV === 'USSOUTHCOM') {
        gccStyle.fillColor = "#a6d854";
      }

      return gccStyle;
    }
  });

  // ---- Creating a Layer Control ----

  var baseMaps = {
    "Streets THIS IS ARBITRARY": acetateLayer,
    "Satellite": satelliteLayer
  };

  var overlayMaps = {
    "Lots of Vertices": gccLayer
    // "Evacuation Centers": evacCentersLayer,
    // "Hospitals": hospitalsLayer,
    // "Evacuation Zones": evacZoneLayer
  };

  var layerControl = L.control.layers(baseMaps, overlayMaps);

  // ---- Initializing the Map ----

  var map = L.map("map", { center:L.latLng(40.7127, -74.0059), zoom:11, minZoom:3 })
    .addLayer(acetateLayer)
    .addControl(layerControl);
}