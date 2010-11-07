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
                '<img src="res/imgs/home_{img}.png"/>',
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