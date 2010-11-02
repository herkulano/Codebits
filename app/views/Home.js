/**
 * @class codebits.views.Home
 * @extends Ext.DataView
 * @xtype homeView
 */
codebits.views.Home = Ext.extend(Ext.DataView, {
  id:'homeView',
  
  sroll:'vertical',
  singleSelect: true,
  cls:'home-view',
  itemSelector:'li.home-item > div',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
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
      
      store: new Ext.data.Store({
        fields: ['card','title','img'],
        data: [
          {title:'favorites',   card:'favorites',   img:'favorites'},
          {title:'projects',    card:'projects',    img:'projects'},
          {title:'calendar',    card:'calendar',    img:'calendar'},
          {title:'#codebits',   card:'twitter',     img:'twitter'},
          {title:'users',       card:'skills',      img:'users'},
          {title:'where?',      card:'map',         img:'where'},
        ]
      }),
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap,
        hide: this.hideHandler,
      }
    });
    
    this.tpl = Ext.XTemplate.from('home');
    this.tpl.compile();
    
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
  onListItemTap: function(view, index, item, e) {
    var record = this.getRecord(item);
    
    Ext.dispatch({
      controller: 'viewport',
      action: record.data.card,
      next: true,
      historyUrl: record.data.card
    });
  },
  hideHandler: function() {
    this.select(null);
  },
  showInfo: function() {
    this.aboutOverlay.setCentered(true);
    this.aboutOverlay.show();
  }
});

Ext.reg('homeView', codebits.views.Home);