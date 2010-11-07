/**
 * @class codebits.views.GPS
 * @extends Ext.Panel
 * @xtype GPS
 */
codebits.views.GPS = Ext.extend(Ext.Panel, {
  id:'gpsView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.main = new Ext.Panel({
      id: 'gpscontainer',
      layout: 'fit',
      scroll: false,
      html: '<div id="gpspoint" style="position:absolute;z-index:10;background:url(res/imgs/marker.png) center no-repeat;width:30px;height:30px;"></div><div id="gpsmap" style="background:url(res/imgs/planta2010.jpg) center no-repeat;"></div>',
    });
    
    this.coords = new Ext.Panel({
      dock: 'bottom',
      scroll: false,
      cls:'gps-coords',
      html:'#coords='
    });
    
    Ext.apply(this, {
      dockedItems:[
        {
          xtype:'navBar',
          title:'gps'
        },
        this.coords
      ],
      items: [this.main]
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.GPS.superclass.initComponent.apply(this, arguments);
  },
  
  onUpdateData: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.mapDrag = new Ext.util.Draggable('gpsmap', {
      constrain: Ext.get("gpscontainer"),
      listeners: {
        scope: this,
        offsetchange: function(dragObj, offset) {
          var ox = Math.abs(offset.x),
              oy = Math.abs(offset.y),
              coords;
              
          if(ox > 328) {
            coords = ('#coord=-328,0,'+ (ox - 328) +','+ oy ); 
          }
          else {
            coords = ('#coord=-0,0,'+ ox +','+ oy );
          }
          //328,0,0,612
          this.coords.getEl().setHTML(coords);
        }
      }
    });
    
    this.container = Ext.get("gpscontainer");
    this.map = Ext.get("gpsmap");
    this.point = Ext.get('gpspoint');
    
    this.point.setTop(this.container.getHeight()*0.5-15);
    this.point.setLeft(this.container.getWidth()*0.5-15);
    
    this.map.setWidth(this.container.getWidth() + 1200-30);
    this.map.setHeight(this.container.getHeight() + 640-30);
    
    var mapPoint = new Ext.util.Point(
      (this.container.getWidth()*0.5) - (this.map.getWidth()*0.5),
      (this.container.getHeight()*0.5) - (this.map.getHeight()*0.5)
    );
    
    this.mapDrag.setOffset(mapPoint);
    
    this.dataUpdated = true;
  },
  
});

Ext.reg('gpsView', codebits.views.GPS);