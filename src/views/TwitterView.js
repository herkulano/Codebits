app.TwitterView = Ext.extend(Ext.List, {
  id: 'TwitterView',
  cls: 'list-view',
  scroll:'vertical',
  singleSelect: false,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      model: 'Tweet',
      proxy: 'TwitterProxy',
      autoLoad: false,
    });
    this.tpl = Ext.XTemplate.from('twitterlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);

    app.TwitterView.superclass.initComponent.call(this);
  },
  onUpdateData: function() {
    this.store.read();
  }
});

Ext.reg('TwitterView', app.TwitterView);