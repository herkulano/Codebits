/**
 * @class codebits.views.ProjectList
 * @extends Ext.List
 * @xtype projectListView
 */
codebits.views.ProjectDetail = Ext.extend(Ext.DataView, {
  id:'projectDetailView',
  
  cls:'detail-view',
  scroll:'vertical',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'ProjectDetail',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'project'
      },
    });
    
    this.tpl = Ext.XTemplate.from('projectdetail');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.ProjectDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data) {
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    
    this.store.read({
      params:{
        url: 'project/' + data,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = JSON.parse(operation.response.responseText);
        if(result.error){
          alert('Token expired!');
          Ext.redirect('login');
        }
      }
    });
  }
});

Ext.reg('projectDetailView', codebits.views.ProjectDetail);