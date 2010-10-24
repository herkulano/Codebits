app.HomeView = Ext.extend(Ext.DataView, {
  name:'HomeView',
  cls:'home-view',
  itemSelector:'li.home-item>div',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.homeBar = new Ext.Toolbar({
      //baseCls: 'home-toolbar',
      cls: 'home-toolbar',
      ui: 'plain',
      dock: 'top',
      items: [{
          xtype:'container',
          html:'<div class="home-toolbar-img"></div>',
      }]
    });
    
    this.dockedItems = [this.homeBar];
    
    this.store = new Ext.data.Store({
      fields: ['card','title','img'],
      data: [
        {title:'favorite sessions', card:'SessionListView', img:'favorites'},
        {title:'projects',          card:'HomeView', img:'projects'},
        {title:'calendar',          card:'CalendarListView', img:'calendar'},
        {title:'#codebits',         card:'HomeView', img:'twitter'},
        {title:'users',             card:'UserSkillListView', img:'users'},
        //{title:'Blog ?',          card:'HomeView', img:'00'},
        {title:'where is it?',      card:'HomeView', img:'where'},
      ]
    });
    
    this.tpl = Ext.XTemplate.from('home');
    this.tpl.compile();
    
    this.on('itemtap', this.onListItemTap);
    
    app.HomeView.superclass.initComponent.call(this);
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item),
        anim   = {
          type: 'pop',
          scaleOnExit: false
        };
    this.fireEvent('setCard', record.data.card, 3, anim);
    this.fireEvent('updateTitle', record.data.title);
  }
});

Ext.reg('HomeView', app.HomeView);