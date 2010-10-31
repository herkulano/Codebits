/**
 * @class codebits.views.UserList
 * @extends Ext.List
 * @xtype UserListView
 */
codebits.views.UserList = Ext.extend(Ext.List, {
  id:'userListView',
  
  scroll:'vertical',
  singleSelect: true,
  cls:'list-view',
  itemSelector:'div.userlist-item',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'User',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'skill'
      },
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap
      }
    });
    
    this.tpl = Ext.XTemplate.from('userlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.UserList.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    if (data) {
      this.data = data;
      this.dockedItems.items[0].setTitle(data);
    }
    
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    
    this.store.read({
      params:{
        url: 'users/' + this.data,
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
      action: 'users',
      next: true,
      id: record.data.id,
      historyUrl: 'skills/'+ this.data +'/'+ record.data.id
    });
  }
});

Ext.reg('userListView', codebits.views.UserList);