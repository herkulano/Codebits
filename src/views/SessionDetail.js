app.SessionDetailView = Ext.extend(Ext.DataView, {
  name:'SessionDetailView',
  cls: 'session-detail',
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'SessionDetail',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('sessiondetail');
    this.tpl.compile();
    
    this.addEvents('updateSessionDetailView');
    this.on('updateSessionDetailView', this.onUpdateData, this);
    
    app.SessionDetailView.superclass.initComponent.call(this);
  },
  onUpdateData: function(session_id) {
    this.store.read({
      params:{
        url: 'session/' + session_id
      },
      callback: function(result, success, response) {
        if(!result.error){
          console.log('updateSessionDetailView', result);
          console.log(result, success, response);
          console.log(this.store.getAt(0));
        }
        else {
          console.log('TOKEN EXPIRED!');
        }
      }
    });
  }
});

Ext.reg('SessionDetailView', app.SessionDetailView);