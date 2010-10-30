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
        }
      ],
      
      store: new Ext.data.Store({
        fields: ['card','title','img'],
        data: [
          {title:'favorite',    card:'favorite',      img:'favorites'},
          {title:'projects',    card:'projectList',   img:'projects'},
          {title:'calendar',    card:'calendarList',  img:'calendar'},
          {title:'#codebits',   card:'twitter',       img:'twitter'},
          {title:'users',       card:'userSkillList', img:'users'},
          {title:'where?',      card:'map',           img:'where'},
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
  },
  onListItemTap: function(view, index, item, e) {
    var record = this.getRecord(item);
    
    Ext.redirect(record.data.card);
  },
  hideHandler: function() {
    this.select(null);
  },
});

Ext.reg('homeView', codebits.views.Home);