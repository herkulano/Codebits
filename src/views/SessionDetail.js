app.SessionDetailView = Ext.extend(Ext.DataView, {
  id:'SessionDetailView',
  cls:'sessiondetail-view',
  scroll:'vertical',
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'SessionDetail',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('sessiondetail');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    app.SessionDetailView.superclass.initComponent.call(this);
  },
  onUpdateData: function(session_id) {
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'session/' + session_id
      },
      callback: function(records, operation, success) {
        var result = JSON.parse(operation.response.responseText);
        if(result.error){
          alert('Token expired!');
          that.fireEvent('setCard', 'LoginView', null, SLIDE_UP);
        }
      }
    });
  }
});

Ext.reg('SessionDetailView', app.SessionDetailView);