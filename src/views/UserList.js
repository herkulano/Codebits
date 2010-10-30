app.UserListView = Ext.extend(Ext.List, {
  id:'UserListView',
  cls:'list-view',
  itemSelector:'div.userlist-item',
  scroll:'vertical',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'User',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('userlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.UserListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(skill) {
    if (skill == null)
      return false;
      
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'users/' + skill,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = JSON.parse(operation.response.responseText);
        if(result.error){
          alert('Token expired!');
          that.fireEvent('setCard', 'LoginView', null, SLIDE_UP);
        }
      }
    });
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    this.fireEvent('setCard', 'UserDetailView', record.data.id, 'slide');
  }
});

Ext.reg('UserListView', app.UserListView);