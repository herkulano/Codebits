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
    
    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<div class="sessionlist-item">',
          '<div class="date">{start}</div>',
          '<div class="place">{place}</div>',
          '<p class="title">{title}</p>',
        '</div>',
      '</tpl>'
    );
    
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
      callback: function(result, operation, success) {
        if (result) {
          that.dataUpdated = true;
        }
        else if (operation.response.error) {
          alert('Token expired!');
          Ext.redirect('login');
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