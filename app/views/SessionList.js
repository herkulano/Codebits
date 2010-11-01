/**
 * @class codebits.views.SessionList
 * @extends Ext.List
 * @xtype sessionListView
 */
codebits.views.SessionList = Ext.extend(Ext.List, {
  id:'sessionListView',
  
  scroll:'vertical',
  singleSelect: true,
  cls: 'list-view',
  itemSelector: 'div.sessionlist-item',
  
  loadingText: G_LOADING,
  emptyText: G_NO_FAV,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'Session',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'favorites',
        refresh: true
      },
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap
      }
    });
    
    this.tpl = Ext.XTemplate.from('sessionlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.SessionList.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    
    this.store.read({
      params:{
        url: 'usersessions/' + localStorage['uid'],
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        var result = JSON.parse(operation.response.responseText);
        if (result.error) {
          alert('Token expired!');
          Ext.redirect('login');
        }
        else {
          that.dataUpdated = true;
        }
      }
    });
  },
  
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'favorites',
      next: true,
      id: record.data.id,
      historyUrl: 'favorites/' + record.data.id
    });
  },
  
});

Ext.reg('sessionListView', codebits.views.SessionList);