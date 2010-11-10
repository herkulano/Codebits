/**
 * @class codebits.views.GMap
 * @extends Ext.Panel
 * @xtype mapView
 */
codebits.views.GMap = Ext.extend(Ext.Panel, {
  id: 'mapView',
  
  cls: 'map-view',
  scroll: false,
  
  layout: {
    type:'vbox',
    align: 'fit',
    pack: 'start'
  },
  
  initComponent: function() {
    this.codebitsPos = new google.maps.LatLng(38.775098,-9.095564);
    
    this.map = new Ext.Map({
      title: 'Map',
      mapOptions: {
        navigationControl: false,
        streetViewControl: true,
        scaleControl: false,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: this.codebitsPos
      },
      listeners: {
        scope: this,
        maprender: this.mapRenderHandler
      },
      flex: 1
    });
    
    
    this.toolbar = new codebits.views.NavBar({
      title:'where is it?',
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.map]
    });
    
    codebits.views.GMap.superclass.initComponent.apply(this, arguments);
  },
  
  mapRenderHandler: function(mapC, map) {
    var codebitsMarker = new google.maps.Marker({
      map: map,
      title: 'CODEBITS 2010',
      icon: 'http://codebits.eu/imgs/marker.png',
      position: this.codebitsPos
    });
    
    var infoContent = '<div style="color:#333">' +
      '<p>Pavilhão Atlântico, Sala Tejo<br/>'+
      'Parque das Nações<br/>'+
      '<a style="color:#00C" href="http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=38.775098,-9.095564&sll=41.165581,-8.625007&sspn=0.009466,0.018282&ie=UTF8&t=h&z=16">'+
      'Link to Google Maps</a>'
      '</div>';
    
    var infowindow = new google.maps.InfoWindow({
        content: infoContent
    });
    
    google.maps.event.addListener(codebitsMarker, 'click', function() {
      infowindow.open(map,codebitsMarker);
    });
  }
  
});

Ext.reg('mapView', codebits.views.GMap);