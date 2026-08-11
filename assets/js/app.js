var map;

$(window).resize(function() {
  sizeLayerControl();
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  //highlight.clearLayers();
}

/* Basemap Layers */
var maptilerBasicJA = L.tileLayer("https://tile.openstreetmap.jp/styles/maptiler-basic-ja/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "OpenStreetMap contributors, OpenStreetMap Foundation Japan (CC-BY)"
}
);
var gsiStd = L.tileLayer("http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
    opacity: 0.8
}
);
var gsiPale = L.tileLayer("http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
    opacity: 0.8
}
);
var gsiPhoto = L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg", {
    maxZoom: 18,
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
    opacity: 0.8
}
);

var bicycle_lane = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#1971ff",
      fill: false,
      weight: 3,
      opacity: 1,
      clickable: false
    };
  }
  /*
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
}*/
});
$.getJSON("data/01_chiba_city_bicycle_lane.geojson", function (data) {
  bicycle_lane.addData(data);
});
var bicyclemap_blueline = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#00b06b",
      fill: false,
      weight: 3,
      opacity: 1,
      clickable: false
    };
  }
  /*
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
}*/
});
$.getJSON("data/11_chiba_city_bicyclemap_blueline.geojson", function (data) {
    bicyclemap_blueline.addData(data);
});
var bicyclemap_greenline = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#f6aa00",
      fill: false,
      weight: 3,
      opacity: 1,
      clickable: false
    };
  }
  /*
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
}*/
});
$.getJSON("data/12_chiba_city_bicyclemap_greenline.geojson", function (data) {
    bicyclemap_greenline.addData(data);
});
var bicyclemap_pinkline = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#990099",
      fill: false,
      weight: 3,
      opacity: 1,
      clickable: false,
      dashArray: "5,5"
    };
  }
  /*
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
}*/
});
$.getJSON("data/14_chiba_city_bicyclemap_pinkline.geojson", function (data) {
    bicyclemap_pinkline.addData(data);
});
var bicyclemap_orengeline = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#ff4b00",
      fill: false,
      weight: 3,
      opacity: 1,
      clickable: false,
      dashArray: "5,5"
    };
  }
  /*
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
}*/
});
$.getJSON("data/15_chiba_city_bicyclemap_orengeline.geojson", function (data) {
    bicyclemap_orengeline.addData(data);
});

var contour_10_layer = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#1f78b4",
      fill: false,
      weight: 1,
      opacity: 0.8,
      clickable: false
    };
  }
  /*
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
}*/
});
/*
$.getJSON("data/chiba_contour_10.geojson", function (data) {
    contour_10_layer.addData(data);
});
*/

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var bicycleShopLayer = L.geoJson(null);
var bicycleShop = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/bicycle_shops.png",
        iconSize: new L.Point(30, 30),
        opacity: 1
      }),
      title: feature.properties.name
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.name + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          //highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
    }
  }
});
$.getJSON("data/bicycle_shop_map.geojson", function (data) {
    bicycleShop.addData(data);
    bicycleShop.addTo(bicycleShopLayer);
    //map.addLayer(bicycleShopLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var parkingLayer = L.geoJson(null);
var parkings = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/bicycle_parking.svg",
        iconSize: [30, 30]
      }),
      title: feature.properties.name
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>住所</th><td>" + feature.properties.address + "</td></tr>" + "<tr><th>一時利用最大台数</th><td>" + feature.properties.capacity + "台"+ "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          //highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/bicycle_parking.svg"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      featureLayers[L.stamp(layer)] = layer;
    }
  }
});
$.getJSON("data/parking.geojson", function (data) {
  parkings.addData(data);
  parkings.addTo(parkingLayer);
  //map.addLayer(parkingLayer);
});


map = L.map("map", {
  zoom: 10,
  center: [35.600252, 140.098042],
  layers: [maptilerBasicJA, bicycle_lane, bicyclemap_blueline, bicyclemap_greenline, bicyclemap_pinkline, bicyclemap_orengeline, parkingLayer, bicycleShopLayer],
  zoomControl: false,
  attributionControl: true
});

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Maptiler-Basic-JA": maptilerBasicJA,
  "地理院タイル空中写真(シームレス)": gsiPhoto,
  "地理院タイル標準地図": gsiStd,
  "地理院タイル淡色地図": gsiPale,
};

var groupedOverlays = {
  "Points of Interest": {
    "駐輪場": parkingLayer,
    "自転車屋": bicycleShopLayer
    },
  "走りやすさ": {
    "自転車用道路": bicycle_lane,
    "○": bicyclemap_blueline,
    "△": bicyclemap_greenline,
    "✕　幅の広い歩道なし": bicyclemap_pinkline,
    "✕　幅の広い歩道あり": bicyclemap_orengeline
}/* ,
  "地形": {
    "等高線(10m)": contour_10_layer
}*/
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);


/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  map.fitBounds(bicycleShopLayer.getBounds());

  featureList = new List('features', {
    valueNames: ['feature-name']
  });

  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

var featureList;
var featureLayers = {};

/* Sidebar feature row click -> center map only, no modal */
$("#feature-list").on("click", ".feature-row", function() {
  var layer = featureLayers[this.id];
  if (layer) {
    map.flyTo(layer.getLatLng(), 17);
  }
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
