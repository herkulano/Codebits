app.UserDetailView = Ext.extend(Ext.DataView, {
  name:'UserDetailView',
  cls: 'userdetail-view',
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'UserDetail',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('userdetail');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.SessionListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(user_id) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'user/' + user_id,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        //console.log(operation.response.responseText, success);
        /*if(!result.error){
          console.log('updateSessionListView', result); 
          console.log(result, success, response);
          console.log(this.response.responseText);
        }
        else {
          console.log('TOKEN EXPIRED!');
        }*/
      }
    });
  },
  onListItemTap: function(item, index, el, e){
    var store   = item.getStore(),
        record  = store.getAt(index);

    console.log(record.data.id);
   //this.fireEvent('setCard', 'SessionDetailView', record.data.id, 'slide');
  }
});

Ext.reg('UserDetailView', app.UserDetailView);