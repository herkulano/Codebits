app.MapView = Ext.extend(Ext.Panel, {
  id: 'MapView',
  cls: 'map-view',
  scroll: false,
  layout: {
    type:'vbox',
    align: 'stretch'
  },
  initComponent: function() {
    var codebits = new google.maps.LatLng(38.775098,-9.095564);
    
    
    var map = new Ext.Map({
      title: 'Map',
      getLocation: true,
      mapOptions: {
        navigationControl: false,
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: codebits
      },
      listeners: {
        maprender: function(mapC, map) {
          initMap();
          this.geo.on('locationupdate', getDirections);
        }
      },
      flex: 1
    });
    
    var mapUpdated = false;
    var directionsService;
    var directionsDisplay;
    
    var initMap = function() {
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map.map);
    }
    
    var where = new Ext.Panel({
      cls: 'list-view',
      scroll: 'vertical',
      itemSelector: 'div.direction-item',
      singleSelect: true,
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      html: '<div id="mapview-panel"></div>',
      listeners: {
        afterrender: function() {
          initPanel();
        }
      },
      flex: 1
    });
    
    var initPanel = function() {
      directionsDisplay.setPanel(document.getElementById("mapview-panel"));
    }
    
    var getDirections = function() {
      var coords = map.geo.coords;
      if (coords.latitude && coords.longitude) {
        var request = {
            origin: new google.maps.LatLng(coords.latitude, coords.longitude), 
            destination: codebits,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
        map.geo.un('locationupdate', getDirections);
      }
      else {
        var codebitsMarker = new google.maps.Marker({
          map: map.map,
          title: 'CODEBITS 2010',
          position: codebits
        });
        map.map.setCenter(codebits);
        map.map.setZoom(12);
      }
    }
    
    this.items = [map, where];
    
    app.MapView.superclass.initComponent.call(this);
  }
});

Ext.reg('MapView', app.MapView);