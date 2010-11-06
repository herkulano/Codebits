/**
 * @class codebits.views.UserList
 * @extends Ext.Panel
 * @xtype UserListView
 */
codebits.views.UserList = Ext.extend(Ext.Panel, {
  id:'userListView',
  layout: 'fit',
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      grouped:true,
      scroll:'vertical',
      singleSelect:true,
      cls: 'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'User',
        sorters: 'name',
        getGroupString : function(record) {
            return record.get('name')[0];
        },
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="userlist-item">',
            '<p>{name}</p>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'skill',
    });
    
    Ext.apply(this, {
      dockedItems: [
        this.toolbar,
        {
          xtype:'form',
          dock:'top',
          cls:'searchBar',
          items:[
            {
              xtype: 'textfield',
              showClear: true,
              placeHolder: 'Search...',
              listeners: {
                scope: this.list,
                keyup: this.filterSearchHandler
              },
              flex: 1
            }
          ]
        }
      ],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);
    
    codebits.views.UserList.superclass.initComponent.apply(this, arguments);
  },
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    if (data) {
      this.data = data;
      this.toolbar.setTitle(data);
    }
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    
    this.list.store.read({
      scope:this,
      params:{
        url: 'users/' + this.data,
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
      action: 'users',
      next: true,
      id: record.data.id,
      historyUrl: 'skills/'+ this.data +'/'+ record.data.id
    });
  },
  
  filterSearchHandler: function(field, e) {
    var value = field.getValue();
    var key = e.browserEvent.keyCode;
    
    // blur field when user presses enter/search which will trigger a change if necessary.
    if (key === 13) {
        field.blur();
    }
                  
    if (!value) {
      this.store.filterBy(function() {
        return true;
      });
    } 
    else {
      var searches = value.split(' '),
        regexps  = [],
        i;
    
      for (i = 0; i < searches.length; i++) {
        if (!searches[i]) 
          return;
        regexps.push(new RegExp(searches[i], 'i'));
      };
      
      this.store.filterBy(function(record) {
        var matched = [];
        
        for (i = 0; i < regexps.length; i++) {
          var search = regexps[i];
          
          if (record.get('name').match(search))
            matched.push(true);
          else 
            matched.push(false);
        };
        
        if (regexps.length > 1 && matched.indexOf(false) != -1) {
          return false;
        } else {
          return matched[0];
        }
      });
    }
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
  
});

Ext.reg('userListView', codebits.views.UserList);