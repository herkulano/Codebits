/**
 * @class codebits.views.Twitter
 * @extends Ext.List
 * @xtype twitterView
 */
codebits.views.Twitter = Ext.extend(Ext.List, {
  id: 'twitterView',
  
  scroll:'vertical',
  singleSelect: false,
  cls: 'list-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'Tweet',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'projects',
        refresh: true
      }
    });

    this.tpl = Ext.XTemplate.from('twitterlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);

    codebits.views.Twitter.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    this.store.read();
  }
});

Ext.reg('twitterView', codebits.views.Twitter);