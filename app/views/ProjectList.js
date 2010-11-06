/**
 * @class codebits.views.ProjectList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.ProjectList = Ext.extend(Ext.Panel, {
  id:'projectListView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      cls: 'list-view',
      scroll:'vertical',
      singleSelect: true,
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Project',
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="projectlist-item">',
            '<div class="title">{title}</div>',
            '<div class="right-box {status}">{id}</div>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'projects',
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
    
    codebits.views.ProjectList.superclass.initComponent.apply(this, arguments);
  },
  
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    this.list.store.read({
      scope:this,
      params:{
        url: 'projects/',
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
      action: 'projects',
      next: true,
      id: record.data.id,
      historyUrl: 'projects/' + record.data.id
    });
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
});

Ext.reg('projectListView', codebits.views.ProjectList);