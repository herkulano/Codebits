app.HomeView = Ext.extend(Ext.DataView, {
  name:'HomeView',
  cls:'home-view',
  itemSelector:'li.home-item',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      fields: ['card','title','img'],
      data: [
        {title:'Favorite Sessions', card:'SessionListView', img:'00'},
        {title:'Projects',          card:'HomeView', img:'00'},
        {title:'Calendar',          card:'CalendarListView', img:'00'},
        {title:'#codebits twits',   card:'HomeView', img:'00'},
        {title:'Users by Skill',    card:'UserSkillListView', img:'00'},
        {title:'?? Blog ??',        card:'HomeView', img:'00'},
        {title:'Where is it?',      card:'HomeView', img:'00'},
        {title:'About',             card:'HomeView', img:'00'},
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
  }
});

Ext.reg('HomeView', app.HomeView);