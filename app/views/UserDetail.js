/**
 * @class codebits.views.UserDetail
 * @extends Ext.Panel
 * @xtype userDetailView
 */
codebits.views.UserDetail = Ext.extend(Ext.Panel, {
  id:'userDetailView',
  
  scroll:'vertical',
  cls: 'detail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
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
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'user/' + data,
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

Ext.reg('userDetailView', codebits.views.UserDetail);