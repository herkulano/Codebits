app.UserListView = Ext.extend(Ext.List, {
  name:'UserListView',
  cls: 'userlist-view',
  itemSelector: 'div.userlist-item',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'User',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('userlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.SessionListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(skill) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'users/' + skill,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        
      }
    });
  },
  onListItemTap: function(item, index, el, e){
    var store   = item.getStore(),
        record  = store.getAt(index);

    this.fireEvent('setCard', 'UserDetailView', record.data.id, 'slide');
  }
});

Ext.reg('UserListView', app.UserListView);