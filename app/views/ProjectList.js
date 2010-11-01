/**
 * @class codebits.views.ProjectList
 * @extends Ext.List
 * @xtype projectListView
 */
codebits.views.ProjectList = Ext.extend(Ext.List, {
  id:'projectListView',

  scroll:'vertical',
  singleSelect: true,
  cls: 'list-view',
  itemSelector: 'div.projectlist-item',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'Project',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'projects',
        refresh: true
      },
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap
      }
    });
    
    this.tpl = Ext.XTemplate.from('projectlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.ProjectList.superclass.initComponent.apply(this, arguments);
  },
  
  onUpdateData: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    var that = this;
    this.scroller.scrollTo({x: 0, y: 0});
    
    this.store.read({
      params:{
        url: 'projects/',
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
      action: 'projects',
      next: true,
      id: record.data.id,
      historyUrl: 'projects/' + record.data.id
    });
  }
});

Ext.reg('projectListView', codebits.views.ProjectList);