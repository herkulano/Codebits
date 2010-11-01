/**
 * @class codebits.views.UserList
 * @extends Ext.List
 * @xtype UserListView
 */
codebits.views.UserList = Ext.extend(Ext.List, {
  id:'userListView',
  
  grouped:true,
  scroll:'vertical',
  singleSelect:true,
  cls:'list-view',
  itemSelector:'div.userlist-item',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'User',
        sorters: 'name',
        getGroupString : function(record) {
            return record.get('name')[0];
        },
        autoload: false
      }),
      
      dockedItems: [
        {
          xtype:'navBar',
          title:'skill'
        },
        {
          xtype:'toolbar',
          dock:'top',
          cls:'searchBar',
          items:[
            {
              xtype: 'searchfield',
              showClear: true,
              placeHolder: 'Search...',
              listeners: {
                scope: this,
                keyup: this.onFilterSearch
              },
              flex: 1
            }
          ]
        }
      ],
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap
      },
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
      action: 'users',
      next: true,
      id: record.data.id,
      historyUrl: 'skills/'+ this.data +'/'+ record.data.id
    });
  },
  
  onFilterSearch: function(field) {
    var value = field.getValue();
                  
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
  }
  
});

Ext.reg('userListView', codebits.views.UserList);