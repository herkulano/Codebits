var G_URL = 'https://services.sapo.pt/Codebits/';
var G_LOADING = 'Loading...';
var G_CHECK = 'Checking...';
var G_EMPTY = '<div class="msg">No data</div>';
var G_NO_FAV = '<div class="msg">You have not selected any favorite sessions!</div>';
var G_TRY_AGAIN = 'Oops, wrong one. Try again.';
var G_NO_CONN = '<div class="msg">Can\'t connect. Try again.</div>';

Ext.regApplication({
  name: "codebits",
  
  defaultUrl: 'home',
  defaultTarget: 'viewport',
  
  icon: 'resources/imgs/icon.png',
  glossOnIcon: false,
  statusBarStyle: 'black',
  phoneStartupScreen: 'res/imgs/phone_startup.png',
  
  //useLoadMask: true,
  
  /**
   * This is called automatically when the page loads. 
   * Here we set up the main component on the page - the Viewport
   */
  launch: function() {
    this.viewport = new codebits.Viewport({
      application: this
    });
    
    Ext.defer(function() {
      if (!localStorage['uid'] || !localStorage['token']) {
        Ext.redirect('login');
      }
    }, 10, Ext);
  },
  
  
  
});
Ext.Router.draw(function(map) {
    map.connect("home", {controller: 'viewport', action: 'home'});
    map.connect("login", {controller: 'viewport', action: 'login'});
    
    map.connect("favorites", {controller: 'viewport', action: 'favorites'});
    map.connect("favorites/:id", {controller: 'viewport', action: 'favorites'});
    
    map.connect("projects", {controller: 'viewport', action: 'projects'});
    map.connect("projects/:id", {controller: 'viewport', action: 'projects'});
    
    map.connect("calendar", {controller: 'viewport', action: 'calendar'});
    map.connect("calendar/:id", {controller: 'viewport', action: 'calendar'});
    
    map.connect("twitter", {controller: 'viewport', action: 'twitter'});
    map.connect("twitterfind", {controller: 'viewport', action: 'twitterfind'});
    
    map.connect("skills", {controller: 'viewport', action: 'skills'});
    
    map.connect("skills/:skill", {controller: 'viewport', action: 'users'});
    map.connect("skills/:skill/:id", {controller: 'viewport', action: 'users'});
    
    map.connect("map", {controller: 'viewport', action: 'map'});
    
    map.connect("vote", {controller: 'viewport', action: 'vote'});
    
    map.connect("gps", {controller: 'viewport', action: 'gps'});
    map.connect("gps/:coords", {controller: 'viewport', action: 'gps'});
    
    map.connect("g/:coords", {controller: 'viewport', action: 'coords'});

});
Ext.data.CodebitsProxy = Ext.extend(Ext.data.ScriptTagProxy, {
  url: G_URL,
  noCache : false,
  
  default_url: G_URL,
  
  constructor: function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
      extraParams: {
        //format: 'jsonp' // not needed now. keeping it just in case.
      }
    });
    
    Ext.data.CodebitsProxy.superclass.constructor.call(this, config);
  },
  
  buildRequest: function(operation) {
    var request = Ext.data.CodebitsProxy.superclass.buildRequest.apply(this, arguments),
        params  = request.params;
    
    request.url = this.default_url + params.url;
    request.url = this.buildUrl(request);
    
    return request;
  }
});

Ext.data.ProxyMgr.registerType('CodebitsProxy', Ext.data.CodebitsProxy);
Ext.data.TwitterProxy = Ext.extend(Ext.data.ScriptTagProxy, {
    url: 'http://search.twitter.com/search.json',
    reader: {
      type: 'json',
      root: 'results',
    },
    
    /**
     * @property defaultQuery
     * @type String
     * The search query to run if none is specified (defaults to 'extjs')
     */
    defaultQuery: '#codebits',
    
    constructor: function(config) {
      config = config || {};
      
      Ext.applyIf(config, {
        extraParams: {
          q: this.defaultQuery,
          rpp: 50,
          suppress_response_codes: true
        }
      });
      Ext.data.TwitterProxy.superclass.constructor.call(this, config);
    }
});

Ext.data.ProxyMgr.registerType('TwitterProxy', Ext.data.TwitterProxy);

/**
 * @class searches
 * @extends Ext.Controller
 * 
 */
Ext.regController("viewport", {
  
  home: function(options) {
    this.setCard(options.action, 
      null, 
      'fade'
    );
  },
  
  coords: function(options) {
    this.setCard('gps', 
      options.coords,
      this.anims.POP,
      true
    );
  },
  
  login: function(options) {
    this.setCard(options.action, 
      null,
      this.anims.SLIDE_UP
    );
  },
  
  favorites: function(options) {
    if (!options.id) {
      this.setCard('sessionList', 
        null, 
        options.next ? this.anims.POP : this.anims.SLIDE_BACK 
      );
    }
    else if (options.id) {
      this.setCard('sessionDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  projects: function(options) {
    if (!options.id) {
      this.setCard('projectList', 
        null, 
        options.next ? this.anims.POP : this.anims.SLIDE_BACK 
      );
    }
    else if (options.id) {
      this.setCard('projectDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  calendar: function(options) {
    if (!options.id) {
      this.setCard('calendarList', 
        null, 
        options.next ? this.anims.POP : this.anims.SLIDE_BACK 
      );
    }
    else if (options.id) {
      this.setCard('sessionDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  twitter: function(options) {
    this.setCard('twitter', 
      null, 
      options.next ? this.anims.POP : this.anims.SLIDE_BACK
    );
  },
  
  twitterfind: function(options) {
    this.setCard('twitterFind', 
      null, 
      options.next ? this.anims.POP : this.anims.SLIDE_BACK
    );
  },
  
  map: function(options) {
    this.setCard('map', 
      null, 
      this.anims.POP
    );
  },
  
  gps: function(options) {
    if (!options.coords) {
      this.setCard('gps', 
        null, 
        this.anims.POP,
        false
      );
    }
    else if (options.coords) {
      this.setCard('gps', 
        options.coords,
        'slide',
        false
      );
    }
  },
  
  vote: function(options) {
    this.setCard('projectVote',
      null, 
      this.anims.POP
    );
  },
  
  skills: function(options) {
    this.setCard('userSkillList', 
      null,
      options.next ? this.anims.POP : this.anims.SLIDE_BACK
    );
  },
  
  users: function(options) {
    if (options.skill && !options.id) {
      this.setCard('userList', 
        options.skill, 
        options.next ? 'slide' : this.anims.SLIDE_BACK,
        options.next ? true : false
      );
    }
    else if (options.id) {
      this.setCard('userDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  setCard: function(cardName, data, anim, refresh) {
  	// Analytics
  	_gaq.push(['_trackPageview', cardName]);
  	// Control Card Views
    var card = Ext.getCmp(cardName + 'View');
    Ext.getCmp('viewport').setActiveItem(card, anim);
    card.fireEvent('updateData', data, refresh);
  },
  
  anims: {
    SLIDE_UP: {
      type: 'slide',
      cover: true,
      direction:'up',
      easing:'ease-out'
    },
    SLIDE_DOWN: {
      type: 'slide',
      reveal: true,
      direction:'down',
      easing:'ease-out'
    },
    SLIDE_BACK: {
      type: 'slide',
      reverse: true
    },
    POP: {
      type: 'pop',
      scaleOnExit: false
    }
  }
});


Ext.regModel('Calendar', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'start',       type: 'string'},
    {name: 'end',         type: 'string'},
    {name: 'hour',        type: 'string'},
    {name: 'day',         type: 'string'},
    {name: 'dayname',     type: 'string'},
    {name: 'colspan',     type: 'int'},
    {name: 'title',       type: 'string'},
    {name: 'placename',   type: 'string'},
    {name: 'speakers',    type: 'array'}
  ],
  
  //hasMany: {model: 'Speaker', name: 'speakers'},
  
  proxy: {
    type: 'CodebitsProxy'
  }
});
Ext.regModel('Project', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'owner_id',    type: 'int'},
    {name: 'title',       type: 'string'},
    {name: 'regdate',     type: 'string'},
    {name: 'status',      type: 'string'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
    }
});
Ext.regModel('ProjectDetail', {
  fields: [
    {name: 'id',                    type: 'int'},
    {name: 'title',                 type: 'string'},
    {name: 'owner_id',              type: 'int'},
    {name: 'abstract',              type: 'string'},
    {name: 'description',           type: 'string'},
    {name: 'url',                   type: 'string'},
    {name: 'date_created',          type: 'string'},
    {name: 'date_modified',         type: 'string'},
    {name: 'status',                type: 'string'},
    {name: 'presentation_position', type: 'string'},
    {name: 'location',              type: 'string'},
    {name: 'edition',               type: 'string'},
    {name: 'video_offset',          type: 'string'},
    {name: 'users',                 type: 'array'},
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
  
});
Ext.regModel('Session', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'title',       type: 'string'},
    {name: 'place',       type: 'string'},
    {name: 'start',       type: 'string'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});
Ext.regModel('SessionDetail', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'title',       type: 'string'},
    {name: 'description', type: 'string'},
    {name: 'place',       type: 'string'},
    {name: 'placename',   type: 'string'},
    {name: 'start',       type: 'string'},
    {name: 'slideshare',  type: 'string'},
    {name: 'pfile',       type: 'string'},
    {name: 'video',       type: 'string'},
    {name: 'lang',        type: 'string'},
    {name: 'speakers',    type: 'array'},
  ],
  
  //hasMany: {model: 'Speaker', name: 'speakers'},
  /*
  proxy: {
    type: 'CodebitsProxy'
  }
  */
});
Ext.regModel('Speaker', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'karma',       type: 'string'},
    {name: 'name',        type: 'string'},
    {name: 'twitter',     type: 'string'},
    {name: 'blog',        type: 'string'},
    {name: 'md5mail',     type: 'string'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});
Ext.regModel('Tweet', {
  fields: [
    {name: 'id',                type: 'int'},
    {name: 'profile_image_url', type: 'string'},
    {name: 'from_user',         type: 'string'},
    {name: 'text',              type: 'string'},
    {name: 'created_at',        type: 'string'},
  ],
  
  proxy: {
    type: 'TwitterProxy'
  }
});
Ext.regModel('User', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'nick',        type: 'string'},
    {name: 'name',        type: 'string'},
    {name: 'twitter',     type: 'string'},
    {name: 'blog',        type: 'string'},
    {name: 'status',      type: 'string'},
    {name: 'owner',       type: 'int'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});
Ext.regModel('UserDetail', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'nick',        type: 'string'},
    {name: 'name',        type: 'string'},
    {name: 'karma',       type: 'string'},
    {name: 'bio',         type: 'string'},
    {name: 'twitter',     type: 'string'},
    {name: 'blog',        type: 'string'},
    {name: 'skills',      type: 'array'},
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});

/**
 * @class codebits.views.CalendarList
 * @extends Ext.Panel
 * @xtype calendarListView
 */
codebits.views.CalendarList = Ext.extend(Ext.Panel, {
  id: 'calendarListView',
  layout: 'fit',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      cls: 'list-view',
      scroll:'vertical',
      singleSelect: true,
      grouped: true,
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Calendar',
        sorters: 'day',
        getGroupString : function(record) {
          return record.get('day') +' '+ record.get('dayname');
        },
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="calendarlist-item">',
            '<tpl if="id">',
              '<div class="date">{hour}<p class="session-id x-hidden-display">{id}</p></div>',
              '<div class="right-cell">',
                '<div class="title">{title}</div>',
                '<p class="info"><span class="place">{placename}</span> <tpl for="speakers">{name} </tpl></p>',
              '</div>',
            '</tpl>',
            '<tpl if="!id">',
              '<div class="date">{hour}</div>',
                '<div class="right-cell">',
                  '<div class="title">{title}</div>',
              '</div>',
            '</tpl>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'calendar'
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);
    
    codebits.views.CalendarList.superclass.initComponent.apply(this, arguments);
  },
  
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    this.list.store.read({
      scope:this,
      params:{
        url: 'calendar'
      },
      callback: function(result, operation, success) {
        if (!operation.response.error) {
          this.dataUpdated = true;    
        }
      }
    });
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    if (record.data.id > 0) {
      Ext.dispatch({
        controller: 'viewport',
        action: 'calendar',
        next: true,
        id: record.data.id,
        historyUrl: 'calendar/' + record.data.id
      });
    }
    else {
      subList.getSelectionModel().deselectAll();
    }
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
});

Ext.reg('calendarListView', codebits.views.CalendarList);
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
/**
 * @class student.views.Home
 * @extends Ext.Panel
 * @xtype homeView
 */
codebits.views.Home = Ext.extend(Ext.Panel, {
  id:'homeView',
  
  scroll: false,
  cls:'home-view',
  
  initComponent: function() {
    this.list = new Ext.DataView({
      scroll: true,
      singleSelect: true,
      itemSelector:'li.home-item > div',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        fields: ['card','title','img'],
        data: [
          {title:'favorites',   card:'favorites',   img:'favorites'},
          {title:'projects',    card:'projects',    img:'projects'},
          {title:'calendar',    card:'calendar',    img:'calendar'},
          {title:'#codebits',   card:'twitter',     img:'twitter'},
          {title:'users',       card:'skills',      img:'users'},
          {title:'where?',      card:'map',         img:'where'},
          {title:'vote',        card:'vote',        img:'vote'},
          {title:'gps',         card:'gps',         img:'gps'},
          {title:'find them',   card:'twitterfind', img:'gps'},
        ]
      }),
      
      listeners:{
        scope: this,
        itemtap: this.itemTapHandler,
      },
      
      tpl: new Ext.XTemplate(
        '<ul class="home-container">',
          '<tpl for=".">',
            '<li class="home-item">',
              '<div>',
                '<img src="resources/imgs/home_{img}.png"/>',
                '<p>{title}</p>',
              '</div>',
            '</li>',
          '</tpl>',
         '</ul>'
      ),
    });
    
    Ext.apply(this, {
      dockedItems: [
        {
          dock: 'top',
          xtype: 'toolbar',
          cls: 'home-toolbar',
          html:'<div class="home-toolbar-img"></div>'
        },
        {
          dock: 'bottom',
          xtype: 'toolbar',
          cls: 'info-toolbar',
          items: [
            { xtype:'spacer' },
            {
              xtype: 'button',
              ui: 'plain',
              cls: 'info-bt',
              listeners: {
                scope: this,
                tap: this.showInfo
              }
            },
            { xtype:'spacer' }
          ]
        }
      ],
      
      items: [ this.list ],
      
      listeners:{
        scope: this,
        hide: this.hideHandler,
      }      
    });
    
    codebits.views.Home.superclass.initComponent.apply(this, arguments);
    
    this.aboutOverlay = new Ext.Panel({
      floating: true,
      modal: true,
      centered: false,
      width: 270,
      height: 220,
      styleHtmlContent: true,
      dockedItems: {
        xtype: 'toolbar',
        dock: 'top',
        title: 'about'
      },
      scroll: 'vertical',
      contentEl: 'more-info',
      cls: 'info-content',
    });
    
    if (Ext.is.iOS && !localStorage['addToHomeScreenInfo']) {
      this.addOverlay = new Ext.Panel({
        floating: true,
        modal: true,
        centered: false,
        width: 300,
        height: 165,
        styleHtmlContent: true,
        dockedItems: {
          xtype: 'toolbar',
          dock: 'top',
          title: 'Add to Home Screen'
        },
        scroll: 'vertical',
        contentEl: 'add-info',
        cls: 'info-content',
      });
      
      this.addOverlay.setCentered(true);
      this.addOverlay.show();
      
      localStorage['addToHomeScreenInfo'] = true;
    }
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: record.data.card,
      next: true,
      historyUrl: record.data.card
    });
  },
  
  hideHandler: function() {
    this.list.getSelectionModel().deselectAll();
  },
  
  showInfo: function() {
    this.aboutOverlay.setCentered(true);
    this.aboutOverlay.show();
  }
});

Ext.reg('homeView', codebits.views.Home);
/**
 * @class codebits.views.Login
 * @extends Ext.form.FormPanel
 * @xtype loginView
 */
codebits.views.Login = Ext.extend(Ext.form.FormPanel, {
  id:'loginView',
  
  scroll:'vertical',
  cls:'form-view',
  
  initComponent: function(){
    Ext.apply(this, {
      items:[
        {
          xtype:'fieldset',
          title: 'CODEBITS IV',
          defaults: {
            required: true,
            showClear: true
          },
          items:[
            {
              xtype: 'emailfield',
              name : 'user',
              placeHolder: 'email'
            },
            {
              xtype: 'passwordfield',
              name : 'password',
              placeHolder: 'password'
            },
          ]
        },
        {
          xtype: 'button',
          text: 'LOGIN',
          ui: 'default',
          listeners:{
            scope: this,
            tap: this.onTryLogin
          }
        },
      ]
    });
    
    codebits.views.Login.superclass.initComponent.apply(this, arguments);
  },
  onTryLogin: function(){
    this.setLoading({msg:G_CHECK}, this.getEl());
    
    Ext.util.JSONP.request({
      url: G_URL + 'gettoken',
      callbackKey: 'callback',
      scope: this,
      
      params:{
        user: this.getValues().user,
        password: this.getValues().password
      },
      
      callback: function(result) {
        if (!result.error) {
          localStorage['token'] = result.token;
          localStorage['uid'] = result.uid;
          
          Ext.redirect('home');
        }
        else {
          alert(G_TRY_AGAIN);
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('loginView', codebits.views.Login);

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
/**
 * @class codebits.views.NavBar
 * @extends Ext.Toolbar
 * @xtype navBar
 */
codebits.views.NavBar = Ext.extend(Ext.Toolbar, {
  cls: 'navbar',
  dock: 'top',
  
  constructor: function(config) {
    config = config || {};
    
    this.backBt = new Ext.Button({
      text: 'back',
      ui: 'plain',
      cls: 'back-bt',
      handler: this.onBackBtTap,
      scope: this
    })
    
    Ext.applyIf(config, {
      items: [
        this.backBt,
        {
          flex: 1, 
          xtype: 'spacer'
        },
        {
          xtype: 'button',
          ui: 'plain',
          cls: 'refresh-bt',
          hidden: !config.refresh,
          handler: this.onRefreshTap,
          scope: this
        },
      ],
    });
    
    this.addEvents('updateData');
    this.enableBubble('updateData');
    
    codebits.views.NavBar.superclass.constructor.call(this, config);
  },
  
  onBackBtTap: function() {
    if(this.init) {
      Ext.redirect('home');
    }
    else {
      window.history.back();
    }
    
  },
  
  onRefreshTap: function(){
    this.fireEvent('updateData', null, true);
  }
  
});

Ext.reg('navBar', codebits.views.NavBar);
/**
 * @class codebits.views.ProjectList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.ProjectDetail = Ext.extend(Ext.Panel, {
  id:'projectDetailView',
  
  cls:'detail-view',
  scroll: 'vertical',
  
  initComponent: function() {
    
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'project'
      },
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="projectdetail-item dataview-item">',
            '<div class="date">',
              '<p>{date_modified}</p>',
              '<p>{location}</p>',
            '</div>',
            '<div class="right-box {status}">{id}</div>',
            '<p class="title">{title}</p>',
            '<br/>',
            '<p><b>Abstract</b></p>',
            '<p class="info">{abstract}</p>',
            '<br/>',
            '<p><b>Description</b></p>',
            '<p class="info">{description}</p>',
            '<br/>',
            '<div class="info">',
              '<tpl if="url">',
                '<p><a target="_blank" href="{url}">{url}</a></p>',
              '</tpl>',
              '<p>Position: {presentation_position}</p>',
              '<p>Edition: {edition} ~ Video Offset: {video_offset}</p>',
            '</div>',
            '<tpl for="users">',
              '<div class="users-item detail-item">',
                '<p class="name">{name} <tpl if="owner == 1">[owner]</tpl></p>',
                '<tpl if="status">',
                  '<p>{status}</p>',
                '</tpl>',
              '</div>',
            '</tpl>',
          '</div>',
        '</tpl>'
      ),
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.ProjectDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'project/' + data,
      callbackKey: 'callback',
      scope: this,
      
      params:{
        token: localStorage['token']
      },
      
      callback: function(result) {
        if (!result.error) {
          this.update(this.tpl.applyTemplate(result));
		  this.doLayout();
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('projectDetailView', codebits.views.ProjectDetail);
/**
 * @class codebits.views.ProjectList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.ProjectList = Ext.extend(Ext.Panel, {
  id:'projectListView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      cls: 'list-view',
      scroll:'vertical',
      singleSelect: true,
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Project',
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="projectlist-item">',
            '<div class="title">{title}</div>',
            '<div class="right-box {status}">{id}</div>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'projects',
      refresh: true
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);
    
    codebits.views.ProjectList.superclass.initComponent.apply(this, arguments);
  },
  
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    this.list.store.read({
      scope:this,
      params:{
        url: 'projects/',
        token: localStorage['token']
      },
      callback: function(result, operation, success) {
        if (!operation.response.error) {
          this.dataUpdated = true;
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
      }
    });
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'projects',
      next: true,
      id: record.data.id,
      historyUrl: 'projects/' + record.data.id
    });
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
});

Ext.reg('projectListView', codebits.views.ProjectList);
/**
 * @class codebits.views.ProjectVote
 * @extends Ext.Panel
 * @xtype projectVoteView
 */
codebits.views.ProjectVote = Ext.extend(Ext.Panel, {
  id:'projectVoteView',
  layout: 'fit',
  
  initComponent: function() {
    this.timeout = null;
    this.doUpdateVotes = false;
    this.updateInterval = 5000;
    
    this.detail = new Ext.Panel({
      cls:'detail-view',
      scroll: 'vertical',
      
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="projectdetail-item dataview-item">',
            '<div class="date">',
              '<p>{date_modified}</p>',
              '<p>{location}</p>',
            '</div>',
            '<div class="right-box {status}">{id}</div>',
            '<p class="title">{title}</p>',
            '<br/>',
            '<p><b>Abstract</b></p>',
            '<p class="info">{abstract}</p>',
            '<br/>',
            '<p><b>Description</b></p>',
            '<p class="info">{description}</p>',
            '<br/>',
            '<div class="info">',
              '<tpl if="url">',
                '<p><a target="_blank" href="{url}">{url}</a></p>',
              '</tpl>',
              '<p>Position: {presentation_position}</p>',
              '<p>Edition: {edition} ~ Video Offset: {video_offset}</p>',
            '</div>',
            '<tpl for="users">',
              '<div class="users-item detail-item">',
                '<p class="name">{name} <tpl if="owner == 1">[owner]</tpl></p>',
                '<tpl if="status">',
                  '<p>{status}</p>',
                '</tpl>',
              '</div>',
            '</tpl>',
          '</div>',
        '</tpl>'
      ),
    });
    
    this.yesVotes = new Ext.Container({
      html: '00',
      cls: 'vote-txt',
      flex:2
    });
    this.noVotes = new Ext.Container({
      html: '00',
      cls: 'vote-txt',
      flex:2
    });
    this.voteYes = new Ext.Button({
      name: 'voteYes',
      text:'YES',
      ui: 'plain',
      cls: 'vote-yes-bt',
      listeners: {
        scope: this,
        tap: this.voteHandler
      },
      flex:3
    });
    this.voteNo = new Ext.Button({
      name: 'voteNo',
      text:'NO',
      ui: 'plain',
      cls: 'vote-no-bt',
      listeners: {
        scope: this,
        tap: this.voteHandler
      },
      flex:3,
      
    });
    
    this.voteBar = new Ext.Toolbar({
      cls: 'vote-bar',
      dock:'bottom',
      items: [
        this.yesVotes,
        this.voteYes,
        {xtype:'spacer', flex:1},
        this.voteNo,
        this.noVotes
      ]
    });
    
    Ext.apply(this, {
      dockedItems:[
        {
          xtype:'navBar',
          title:'vote',
          refresh: true,
        },
        this.voteBar
      ],
      items: [this.detail],
      
      listeners: {
        scope: this,
        hide: this.hideHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.ProjectVote.superclass.initComponent.apply(this, arguments);
  },
  
  onUpdateData: function(data) {
    this.detail.scroller.scrollTo({x: 0, y: 0});
    this.detail.setLoading({msg:G_LOADING}, true);
    
    clearTimeout(this.timeout);
    this.voteNo.enable();
    this.voteYes.enable();
    
    Ext.util.JSONP.request({
      url: G_URL + 'votes',
      callbackKey: 'callback',
      scope: this,
      
      callback: function(result) {
        if (!result.error) {
          Ext.defer(getDetail, 10, this, [result.project]);
          
          this.doUpdateVotes = true;
          this.updateVotesHTML(result);
          this.timeout = Ext.defer(this.updateVotes, this.updateInterval, this);
        }
      }
    });
    
    var getDetail = function(project) {
      Ext.util.JSONP.request({
        url: G_URL + 'project/' + project,
        callbackKey: 'callback',
        scope: this,
        
        params:{
          token: localStorage['token']
        },
        
        callback: function(result) {
          if (!result.error) {
            this.detail.update(this.detail.tpl.applyTemplate(result));
			this.doLayout();
          }
          else {
            alert('Token expired!');
            Ext.redirect('login');
          }
          this.detail.setLoading(false);
        }
      });
    }
  },
  
  updateVotes: function() {
    if(this.doUpdateVotes) {
      Ext.util.JSONP.request({
        url: G_URL + 'votes',
        callbackKey: 'callback',
        scope: this,
        
        callback: function(result) {
          if (!result.error) {
            this.updateVotesHTML(result);
            this.timeout = Ext.defer(this.updateVotes, this.updateInterval, this);
          }
        }
      });
    }
  },
  
  updateVotesHTML: function(data) {
    //console.log(data.yes, data.no);
    this.yesVotes.getEl().setHTML(data.yes);
    this.noVotes.getEl().setHTML(data.no);
  },
  
  voteHandler: function(el, e) {
    var vote = el.name == 'voteYes' ? 1 : 0;
    
    if (vote) {
      this.voteNo.enable();
      this.voteYes.disable();
    }
    else {
      this.voteYes.enable();
      this.voteNo.disable();
    }
    
    Ext.util.JSONP.request({
      url: G_URL + 'vote/' + vote,
      callbackKey: 'callback',
      
      params:{
        token: localStorage['token']
      },
      callback: function(result) {
        //console.log(result);
      }
    });
  },
  
  hideHandler: function() {
    clearTimeout(this.timeout);
    this.doUpdateVotes = false;
  }
  
});

Ext.reg('projectVoteView', codebits.views.ProjectVote);
/**
 * @class codebits.views.SessionDetail
 * @extends Ext.Panel
 * @xtype sessionDetailView
 */
codebits.views.SessionDetail = Ext.extend(Ext.Panel, {
  id:'sessionDetailView',
  
  scroll:'vertical',
  cls:'detail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'session'
      },
    });
    
    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<div class="sessiondetail-item dataview-item">',
          '<div class="date">{start}</div>',
          '<div class="place">{placename}</div>',
          '<p class="title">{title} [{lang}]</p>',
          '<br/>',
          '<p class="info">{description}</p>',
          '<br/>',
          '<div class="info">',
            '<tpl if="slideshare">',
              '<p>{slideshare}</p>',
            '</tpl>',
            '<tpl if="slideshare">',
              '<p><a target="_blank" href="{slideshare}">{slideshare}</a></p>',
            '</tpl>',
            '<tpl if="pfile">',
              '<p><a target="_blank" href="{pfile}">{pfile}</a></p>',
            '</tpl>',
            '<tpl if="video">',
              '<p><a target="_blank" href="{video}">{video}</a></p>',
            '</tpl>',
            '<tpl for="speakers">',
              '<div class="speakers-item detail-item">',
                '<img src="http://www.gravatar.com/avatar/{md5mail}?s=100&d=retro" />',
                '<p class="name">{name}</p>',
                '<p>Karma: {karma}</p>',
                '<tpl if="twitter">',
                  '<p>Twitter: <a target="_blank" href="http://twitter.com/{twitter}">@{twitter}</a></p>',
                '</tpl>',
                '<tpl if="blog">',
                  '<p>Blog: <a target="_blank" href="{blog}">{blog}</a></p>',
                '</tpl>',
              '</div>',
            '</tpl>',
          '</div>',
        '</div>',
      '</tpl>'
    );
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.SessionDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(session_id) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'session/' + session_id,
      callbackKey: 'callback',
      scope: this,
      
      callback: function(result) {
        if (!result.error) {
          this.update(this.tpl.applyTemplate(result));
		  this.doLayout();
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('sessionDetailView', codebits.views.SessionDetail);
/**
 * @class codebits.views.SessionList
 * @extends Ext.Panel
 * @xtype sessionListView
 */
codebits.views.SessionList = Ext.extend(Ext.Panel, {
  id:'sessionListView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      cls: 'list-view',
      scroll:'vertical',
      singleSelect: true,
      
      loadingText: G_LOADING,
      emptyText: G_NO_FAV,
      
      store: new Ext.data.Store({
        model: 'Session',
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="sessionlist-item">',
            '<div class="date">{start}</div>',
            '<div class="place">{place}</div>',
            '<p class="title">{title}</p>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'favorites',
      refresh: true
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);
    
    codebits.views.SessionList.superclass.initComponent.apply(this, arguments);
  },
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    this.list.store.read({
      scope:this,
      params:{
        url: 'usersessions/' + localStorage['uid'],
        token: localStorage['token']
      },
      callback: function(result, operation, success) {
        if (!operation.response.error) {
          this.dataUpdated = true;
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
      }
    });
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'favorites',
      next: true,
      id: record.data.id,
      historyUrl: 'favorites/' + record.data.id
    });
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
  
});

Ext.reg('sessionListView', codebits.views.SessionList);
/**
 * @class codebits.views.Panel
 * @extends Ext.List
 * @xtype twitterView
 */
codebits.views.Twitter = Ext.extend(Ext.Panel, {
  id: 'twitterView',
  layout: 'fit',
  
  initComponent: function() {
    this.list = new Ext.DataView({
      scroll:'vertical',
      disableSelection: true,
      itemSelector: 'div.tweet',
      cls: 'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Tweet',
        autoload: false
      }),
      
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="tweet">',
            '<img src="{profile_image_url}" />',
            '<div class="tweet-bubble">',
              '<div class="tweet-content">',
                '<p class="user">{from_user}</p>',
                '<p class="date">{[this.formatDate(values.created_at)]}</p>',
                '<h1>{[this.linkify(values.text)]}</h1>',
              '</div>',
            '</div>',
          '</div>',
        '</tpl>',
        {
          /**
           * Simply wraps a link tag around each detected url
           */
          linkify: function(value) {
            var coords = new RegExp(/\#codebits\ coords\(\ \-(0|328)\,(0)\,([0-9]{1,3})\,([0-9]{1,3})\ \)/g);
            if(value.match(coords) == null) {
              return value.replace(/(http[s]*:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
            }
            else {
              return value.replace(coords, "#codebits <a class=\"gps-link\" target=\"_self\" href=\"#gps/$1,$2,$3,$4\">view me on the map</a>");
            }
            
          },
          
          /**
           * Format Date to twitter style
           */
          formatDate: function(value) {
            var dt = new Date(value),
                now = new Date(),
                diff = 0,
                minutes = 0, 
                hours = 0,
                days = 0,
                txt = '';
                
            diff = now.getTime() - dt.getTime();
            
            minutes = Math.round(diff/1000/60);
            hours = Math.round(diff/1000/60/60);
            days = Math.round(diff/1000/60/60/24);
            
            if (minutes >= 60) {
              if (hours >= 24) {
                txt = dt.format('j M');
              }
              else {
                txt = hours + ' '+ (hours == 1 ? 'hour' : 'hours') +' ago';
              }
            }
            else {
              txt = minutes + ' '+ (minutes == 1 ? 'minute' : 'minutes') +' ago';
            }
            return txt;
          }
        }
      )
    });
    
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'#codebits',
        refresh: true
      },
      items: [this.list]
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);

    codebits.views.Twitter.superclass.initComponent.apply(this, arguments);
  },
  updateDataHandler: function(data, refresh) {
    try {
      this.list.store.read();
    }
    catch(err) {
      console.log(err);
    }
  }
});

Ext.reg('twitterView', codebits.views.Twitter);
/**
 * @class codebits.views.Panel
 * @extends Ext.List
 * @xtype twitterFindView
 */
codebits.views.TwitterFind = Ext.extend(Ext.Panel, {
  id: 'twitterFindView',
  layout: 'fit',
  
  initComponent: function() {
    this.list = new Ext.DataView({
      scroll:'vertical',
      disableSelection: true,
      itemSelector: 'div.tweet',
      cls: 'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Tweet',
        autoload: false
      }),
      
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="tweet">',
            '<img src="{profile_image_url}" />',
            '<div class="tweet-bubble">',
              '<div class="tweet-content">',
                '<p class="user">{from_user}</p>',
                '<p class="date">{[this.formatDate(values.created_at)]}</p>',
                '<h1>{[this.linkify(values.text)]}</h1>',
              '</div>',
            '</div>',
          '</div>',
        '</tpl>',
        {
          /**
           * Simply wraps a link tag around each detected url
           */
          linkify: function(value) {
            var coords = new RegExp(/\#codebits\ coords\(\ \-(0|328)\,(0)\,([0-9]{1,3})\,([0-9]{1,3})\ \)/g);
            if(value.match(coords) == null) {
              return value.replace(/(http[s]*:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
            }
            else {
              return value.replace(coords, "#codebits <a class=\"gps-link\" target=\"_self\" href=\"#gps/$1,$2,$3,$4\">view me on the map</a>");
            }
            
          },
          
          /**
           * Format Date to twitter style
           */
          formatDate: function(value) {
            var dt = new Date(value),
                now = new Date(),
                diff = 0,
                minutes = 0, 
                hours = 0,
                days = 0,
                txt = '';
                
            diff = now.getTime() - dt.getTime();
            
            minutes = Math.round(diff/1000/60);
            hours = Math.round(diff/1000/60/60);
            days = Math.round(diff/1000/60/60/24);
            
            if (minutes >= 60) {
              if (hours >= 24) {
                txt = dt.format('j M');
              }
              else {
                txt = hours + ' '+ (hours == 1 ? 'hour' : 'hours') +' ago';
              }
            }
            else {
              txt = minutes + ' '+ (minutes == 1 ? 'minute' : 'minutes') +' ago';
            }
            return txt;
          }
        }
      )
    });
    
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'find them',
        refresh: true
      },
      items: [this.list]
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);

    codebits.views.TwitterFind.superclass.initComponent.apply(this, arguments);
  },
  updateDataHandler: function(data, refresh) {
    try {
      this.list.store.read({
        params: {
          q: '#codebits coords'
        } 
      });
    }
    catch(err) {
      console.log(err);
    }
  }
});

Ext.reg('twitterFindView', codebits.views.TwitterFind);
/**
 * @class codebits.views.UserDetail
 * @extends Ext.Panel
 * @xtype userDetailView
 */
codebits.views.UserDetail = Ext.extend(Ext.Panel, {
  id:'userDetailView',
  
  scroll:'vertical',
  cls: 'detail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'user info'
      },
    });
    
    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<div class="userdetail-item dataview-item">',
          '<div class="date">{nick}</div>',
          '<div class="place">{id}</div>',
          '<p class="title">{name} [{nick}]</p>',
          '<br/>',
          '<p class="info">{bio}</p>',
          '<br/>',
          '<div class="info">',
            '<tpl if="slideshare">',
              '<p>{slideshare}</p>',
            '</tpl>',
            '<tpl if="slideshare">',
              '<p><a target="_blank" href="{slideshare}">{slideshare}</a></p>',
            '</tpl>',
            '<tpl if="pfile">',
              '<p><a target="_blank" href="{pfile}">{pfile}</a></p>',
            '</tpl>',
            '<tpl if="video">',
              '<p><a target="_blank" href="{video}">{video}</a></p>',
            '</tpl>',
            '<p>Karma: {karma}</p>',
            '<tpl if="twitter">',
              '<p>Twitter: <a target="_blank" href="http://twitter.com/{twitter}">@{twitter}</a></p>',
            '</tpl>',
            '<tpl if="blog">',
              '<p>Blog: <a target="_blank" href="{blog}">{blog}</a></p>',
            '</tpl>',
            '<br/>',
            '<p><tpl for="skills">{.} </tpl></p>',
          '</div>',
        '</div>',
      '</tpl>'
    );
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.UserDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'user/' + data,
      callbackKey: 'callback',
      scope: this,
      
      params:{
        token: localStorage['token']
      },
      
      callback: function(result) {
        if (!result.error) {
          this.update(this.tpl.applyTemplate(result));
		  this.doLayout();
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('userDetailView', codebits.views.UserDetail);
/**
 * @class codebits.views.UserList
 * @extends Ext.Panel
 * @xtype UserListView
 */
codebits.views.UserList = Ext.extend(Ext.Panel, {
  id:'userListView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      grouped:true,
      scroll:'vertical',
      singleSelect:true,
      cls: 'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'User',
        sorters: 'name',
        getGroupString : function(record) {
            return record.get('name')[0];
        },
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="userlist-item">',
            '<p>{name}</p>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'skill',
    });
    
    this.searchField = new Ext.form.Search({
      showClear: true,
      placeHolder: 'Search...',
      listeners: {
        scope: this,
        change: this.searchChangeHandler,
        keyup: this.searchKeyHandler,
        blur: this.searchBlurHandler
      },
      flex: 1
    });
    
    Ext.apply(this, {
      dockedItems: [
        this.toolbar,
        {
          xtype:'form',
          dock:'top',
          cls:'searchBar',
          items:[this.searchField]
        }
      ],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler,
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);
    
    codebits.views.UserList.superclass.initComponent.apply(this, arguments);
  },
  
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
      
    this.searchField.reset();
    
    if (data) {
      this.data = data;
      this.toolbar.setTitle(data);
    }
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    
    this.list.store.read({
      scope:this,
      params:{
        url: 'users/' + this.data,
        token: localStorage['token']
      },
      callback: function(result, operation, success) {
        if (!operation.response.error) {
          this.dataUpdated = true;
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
      }
    });
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'users',
      next: true,
      id: record.data.id,
      historyUrl: 'skills/'+ this.data +'/'+ record.data.id
    });
  },
  
  searchKeyHandler: function (field, e) {
    var key = e.browserEvent.keyCode;
    
    // blur field when user presses enter/search which will trigger a change if necessary.
    if (key === 13) {
        field.blur();
    }
    
    Ext.defer(this.doFilterStore, 100, this, [field, this.list.store]);
  },
  
  searchChangeHandler: function(field, newVal, oldVal) {
    Ext.defer(this.doFilterStore, 100, this, [field, this.list.store]);
  },
  
  searchBlurHandler: function(e) {
    Ext.defer(this.doFilterStore, 100, this, [this.searchField, this.list.store]);
  },
  
  doFilterStore: function(field, store) {
    var value = field.getValue();
    
    if (!value) {
      store.filterBy(function() {
        return true;
      });
    } 
    else {
      var searches = value.split(' '),
        regexps  = [],
        i;
    
      for (i = 0; i < searches.length; i++) {
        if (!searches[i]) 
          return;
        regexps.push(new RegExp(searches[i], 'i'));
      };
      
      store.filterBy(function(record) {
        var matched = [];
        
        for (i = 0; i < regexps.length; i++) {
          var search = regexps[i];
          
          if (record.get('name').match(search))
            matched.push(true);
          else 
            matched.push(false);
        };
        
        if (regexps.length > 1 && matched.indexOf(false) != -1) {
          return false;
        } else {
          return matched[0];
        }
      });
    }
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
  
});

Ext.reg('userListView', codebits.views.UserList);
/**
 * @class codebits.views.UserSkillList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.UserSkillList = Ext.extend(Ext.Panel, {
  id:'userSkillListView',
  layout: 'fit',
  
  initComponent: function() {
    this.list = new Ext.List({
      scroll:'vertical',
      singleSelect: true,
      cls:'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        fields: ['skill'],
        data: [
          {skill:'api'},{skill:'cc'},{skill:'cocoa'},
          {skill:'css'},{skill:'design'},{skill:'desktop'},
          {skill:'dotnet'},{skill:'embbeded'},{skill:'erlang'},
          {skill:'hardware'},{skill:'java'},{skill:'javascript'},
          {skill:'microformats'},{skill:'mobile'},{skill:'perl'},
          {skill:'php'},{skill:'python'},{skill:'ruby'},
          {skill:'security'},{skill:'sysadmin'},{skill:'web'}
        ]
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="userskilllist-item">',
            '<p>{skill}</p>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'users by skill'
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    codebits.views.UserSkillList.superclass.initComponent.apply(this, arguments);
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'users',
      next: true,
      skill: record.data.skill,
      historyUrl: 'skills/' + record.data.skill
    });
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
});

Ext.reg('userSkillListView', codebits.views.UserSkillList);
/**
 * @class codebits.Viewport
 * @extends Ext.Panel
 */
codebits.Viewport = Ext.extend(Ext.Panel, {
  id: 'viewport',
  layout: 'card',
  fullscreen: true,

  initComponent: function() {
    Ext.apply(this, {
      items: [
        {xtype: 'homeView'},
        {xtype: 'loginView'},
        {xtype: 'sessionListView'},
        {xtype: 'sessionDetailView'},
        {xtype: 'projectListView'},
        {xtype: 'projectDetailView'},
        {xtype: 'calendarListView'},
        {xtype: 'twitterView'},
        {xtype: 'userSkillListView'},
        {xtype: 'userListView'},
        {xtype: 'userDetailView'},
        {xtype: 'mapView'},
        {xtype: 'projectVoteView'},
        {xtype: 'gpsView'},
        {xtype: 'twitterFindView'},
      ]
    });

    codebits.Viewport.superclass.initComponent.apply(this, arguments);
  }
  
});




