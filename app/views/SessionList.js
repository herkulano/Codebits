/**
 * @class codebits.views.SessionList
 * @extends Ext.Panel
 * @xtype sessionListView
 */
codebits.views.SessionList = Ext.extend(Ext.Panel, {
  id:'sessionListView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      cls: 'list-view',
      scroll:'vertical',
      singleSelect: true,
      
      loadingText: G_LOADING,
      emptyText: G_NO_FAV,
      
      store: new Ext.data.Store({
        model: 'Session',
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="sessionlist-item">',
            '<div class="date">{start}</div>',
            '<div class="place">{place}</div>',
            '<p class="title">{title}</p>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'favorites',
      refresh: true
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);
    
    codebits.views.SessionList.superclass.initComponent.apply(this, arguments);
  },
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    this.list.store.read({
      scope:this,
      params:{
        url: 'usersessions/' + localStorage['uid'],
        token: localStorage['token']
      },
      callback: function(result, operation, success) {
        if (!operation.response.error) {
          this.dataUpdated = true;
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
      }
    });
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'favorites',
      next: true,
      id: record.data.id,
      historyUrl: 'favorites/' + record.data.id
    });
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
  
});

Ext.reg('sessionListView', codebits.views.SessionList);