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
    
    app.UserDetailView.superclass.initComponent.call(this);
  },
  onUpdateData: function(user_id) {
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'user/' + user_id,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = Ext.util.JSON.decode(operation.response.responseText);
        if(result.error){
          alert('Token expired!');
          that.fireEvent('setCard', 'LoginForm', null, SLIDE_UP);
        }
      }
    });
  }
});

Ext.reg('UserDetailView', app.UserDetailView);