/**
 * @class codebits.views.UserDetail
 * @extends Ext.DataView
 * @xtype userDetailView
 */
codebits.views.UserDetail = Ext.extend(Ext.DataView, {
  id:'userDetailView',
  
  scroll:'vertical',
  cls: 'userdetail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'UserDetail',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'user info'
      },
    });
    
    this.tpl = Ext.XTemplate.from('userdetail');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.UserDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    
    this.store.read({
      params:{
        url: 'user/' + data,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = JSON.parse(operation.response.responseText);
        if (result.error) {
          alert('Token expired!');
          Ext.redirect('login');
        }
      }
    });
  }
});

Ext.reg('userDetailView', codebits.views.UserDetail);