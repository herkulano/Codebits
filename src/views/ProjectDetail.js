app.ProjectDetailView = Ext.extend(Ext.DataView, {
  id:'ProjectDetailView',
  cls:'projectdetail-view',
  scroll:'vertical',
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'ProjectDetail',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('projectdetail');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    app.ProjectDetailView.superclass.initComponent.call(this);
  },
  onUpdateData: function(project_id) {
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'project/' + project_id,
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
  }
});

Ext.reg('ProjectDetailView', app.ProjectDetailView);