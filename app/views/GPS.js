/**
 * @class codebits.views.GPS
 * @extends Ext.Panel
 * @xtype GPS
 */
codebits.views.GPS = Ext.extend(Ext.Panel, {
  id:'gpsView',
  layout: 'fit',
  
  initComponent: function() {
    this.gpsCoords = "";
    
    this.main = new Ext.Panel({
      id: 'gpscontainer',
      layout: 'fit',
      scroll: false,
      html: '<div id="gpspoint" style="position:absolute;z-index:10;background:url(http://codebits.eu/imgs/marker.png) center no-repeat;width:30px;height:30px;"></div><div id="gpsmap" style="background:url(http://codebits.eu/imgs/planta2010.jpg) center no-repeat;"></div>',
    });
    
    var coordsTxt = new Ext.Container({
      html:'<div id="gps-coords"><div>',
      flex:1,
    });
    
    this.coords = new Ext.Toolbar({
      dock: 'bottom',
      cls:'gps-coords',
      items: [coordsTxt]
    });
    
    this.navBar = new codebits.views.NavBar({
      title: 'gps'
    })
    
    Ext.apply(this, {
      dockedItems:[
        this.navBar,
        this.coords
      ],
      items: [this.main]
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.GPS.superclass.initComponent.apply(this, arguments);
  },
  
  onUpdateData: function(data, init) {
    console.log('GPS', init);
    
    if(init) {
      this.navBar.init = true;
      this.navBar.backBt.setText('home');
    }
    
    if (!this.mapDrag) {
      this.mapDrag = new Ext.util.Draggable('gpsmap', {
        constrain: Ext.get("gpscontainer"),
        listeners: {
          scope: this,
          offsetchange: function(dragObj, offset) {
            var ox = Math.abs(offset.x),
                oy = Math.abs(offset.y),
                coords;
                
            if(ox > 328) {
              coords = ( '-328,0,'+ (ox - 328) +','+ oy );
            }
            else {
              coords = ('-0,0,'+ ox +','+ oy );
            }
            //328,0,0,612
            this.gpsCoords = coords;
            var tweet = "i'm%20at%20%23codebits coords( " + this.gpsCoords + " ) http://codebits.herkulano.com/%23g/" + this.gpsCoords.substr(1,this.gpsCoords.length);
            var tweetLink = 'http://twitter.com/?status=' + tweet;
            Ext.get('gps-coords').setHTML('<a href="'+ tweetLink +'" target="_blank">tweet your coords( '+ coords +' )');
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
    }
    
    var mapPoint = new Ext.util.Point();
    
    if(data){
      var c = data.split(',');
      
      if(parseInt(c[0]) > 327) {
        mapPoint.x = -(parseFloat(c[2]) + 328);
      }
      else {
        mapPoint.x = -(parseInt(c[2]));
      }
      mapPoint.y = -(parseInt(c[3]));
    }
    else {
      mapPoint.x = (this.container.getWidth()*0.5) - (this.map.getWidth()*0.5);
      mapPoint.y = (this.container.getHeight()*0.5) - (this.map.getHeight()*0.5);
    }
    
    this.mapDrag.setOffset(mapPoint);
  },
  
});

Ext.reg('gpsView', codebits.views.GPS);