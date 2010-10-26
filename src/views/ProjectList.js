app.ProjectListView = Ext.extend(Ext.List, {
  id:'ProjectListView',
  cls: 'list-view',
  itemSelector: 'div.projectlist-item',
  scroll:'vertical',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.dataUpdated = false;
    
    this.store = new Ext.data.Store({
      model: 'Project',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('projectlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.ProjectListView.superclass.initComponent.call(this);
  },
  onUpdateData: function() {
    if (this.dataUpdated === true)
      return false;
    
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'projects/',
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = Ext.util.JSON.decode(operation.response.responseText);
        if(result.error){
          alert('Token expired!');
          that.fireEvent('setCard', 'LoginView', null, SLIDE_UP);
        }
        else{
          that.dataUpdated = true;
        }
      }
    });
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    this.fireEvent('setCard', 'ProjectDetailView', record.data.id, 'slide');
  }
});

Ext.reg('ProjectListView', app.ProjectListView);