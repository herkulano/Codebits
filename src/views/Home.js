app.HomeView = Ext.extend(Ext.DataView, {
  name:'HomeView',
  cls: 'home-view',
  itemSelector:'li.home-item',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      fields: ['card','title','img'],
      data : [
        {title:'Favorite Sessions', card:'--', img:'00'},
        {title:'Users by Skill',    card:'--', img:'00'},
        {title:'Where?',            card:'--', img:'00'},
        
        {title:'Calendar',          card:'--', img:'00'},
        {title:'Blog',              card:'--', img:'00'},
        {title:'About',             card:'--', img:'00'},
        
        {title:'Projects',          card:'--', img:'00'},
        {title:'#codebits twits',   card:'--', img:'00'},
      ]
    });
    
    this.tpl = Ext.XTemplate.from('home');
    this.tpl.compile();
    
    this.on('itemtap', this.onListItemTap);
    
    app.HomeView.superclass.initComponent.call(this);
  },
  onListItemTap: function(item, index, el, e){
    var store   = item.getStore(),
        record  = store.getAt(index);
        
    console.log(record.data.title);
    //this.fireEvent('setCard', 'SessionDetailView', record.data.id, 'slide');
  }
});

Ext.reg('HomeView', app.HomeView);