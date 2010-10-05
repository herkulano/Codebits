app.SessionListView = Ext.extend(Ext.List, {
  name:'SessionListView',
  itemSelector: '.sessionlist-list-item',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'Session',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('sessionlist');
    this.tpl.compile();
    
    this.addEvents('updateSessionListView');
    this.on('updateSessionListView', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.SessionListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(user_id) {
    this.store.read({
      params:{
        url: 'usersessions/' + user_id,
        token: localStorage['token']
      },
      callback: function(result) {
        console.log('updateSessionListView', result);
      }
    });
  },
  onListItemTap: function(item, index, el, e){
    var store   = item.getStore(),
        record  = store.getAt(index);
        
    this.fireEvent('setCard', 'SessionDetailView', record.data.id, 'slide');
  }
});

Ext.reg('SessionListView', app.SessionListView);