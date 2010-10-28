app.SessionListView = Ext.extend(Ext.List, {
  id:'SessionListView',
  cls: 'list-view',
  itemSelector: 'div.sessionlist-item',
  scroll:'vertical',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.user_id;
    this.dataUpdated = false;
    
    this.store = new Ext.data.Store({
      model: 'Session',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('sessionlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.SessionListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    if(data === null)
      data = this.user_id;
    else
      this.user_id = data;
      
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'usersessions/' + this.user_id,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = JSON.parse(operation.response.responseText);
        if (result.error) {
          alert('Token expired!');
          that.fireEvent('setCard', 'LoginView', null, SLIDE_UP);
        }
        else {
          that.dataUpdated = true;
        }
      }
    });
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    this.fireEvent('setCard', 'SessionDetailView', record.data.id, 'slide');
  }
});

Ext.reg('SessionListView', app.SessionListView);