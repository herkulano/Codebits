app.MapView = Ext.extend(Ext.Panel, {
  id: 'MapView',
  cls: 'map-view',
  scroll: false,
  layout: {
    type:'vbox',
    align: 'stretch'
  },
  initComponent: function() {
    var map = new Ext.Map({
      title: 'Map',
      getLocation: true,
      mapOptions: {
        zoom: 11
      },
      listeners: {
        maprender: function(mapC, map) {
          refresh(this.geo.coords);
          this.geo.on('update', refresh);
        }
      },
      flex: 1
    });
    
    var where = new Ext.DataView({
      cls: 'list-view',
      scroll: 'vertical',
      itemSelector: 'div.direction-item',
      singleSelect: true,
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      html: '<div>insert directions here...</div>',
      flex: 2
    });
    
    this.items = [map, where];
    
    var refresh = function() {
      var coords = map.geo.coords;
      if (coords) {
        map.update(coords);
      }
    }

    app.MapView.superclass.initComponent.call(this);
  }
});

Ext.reg('MapView', app.MapView);