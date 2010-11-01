/**
 * @class codebits.views.ProjectList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.ProjectDetail = Ext.extend(Ext.Panel, {
  id:'projectDetailView',
  
  cls:'detail-view',
  scroll:'vertical',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
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
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'project/' + data,
      callbackKey: 'callback',
      scope: this,
      
      params:{
        token: localStorage['token']
      },
      
      callback: function(result) {
        if (!result.error) {
          this.update(this.tpl.applyTemplate(result));
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('projectDetailView', codebits.views.ProjectDetail);