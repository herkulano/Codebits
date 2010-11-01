/**
 * @class codebits.views.SessionDetail
 * @extends Ext.Panel
 * @xtype sessionDetailView
 */
codebits.views.SessionDetail = Ext.extend(Ext.Panel, {
  id:'sessionDetailView',
  
  scroll:'vertical',
  cls:'detail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'session'
      },
    });
    
    this.tpl = Ext.XTemplate.from('sessiondetail');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.SessionDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(session_id) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'session/' + session_id,
      callbackKey: 'callback',
      scope: this,
      
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

Ext.reg('sessionDetailView', codebits.views.SessionDetail);