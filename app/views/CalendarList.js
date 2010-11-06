/**
 * @class codebits.views.CalendarList
 * @extends Ext.Panel
 * @xtype calendarListView
 */
codebits.views.CalendarList = Ext.extend(Ext.Panel, {
  id: 'calendarListView',
  layout: 'fit',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    this.list = new Ext.List({
      cls: 'list-view',
      scroll:'vertical',
      singleSelect: true,
      grouped: true,
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Calendar',
        sorters: 'day',
        getGroupString : function(record) {
          return record.get('day') +' '+ record.get('dayname');
        },
        autoload: false
      }),
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="calendarlist-item">',
            '<tpl if="id">',
              '<div class="date">{hour}<p class="session-id x-hidden-display">{id}</p></div>',
              '<div class="right-cell">',
                '<div class="title">{title}</div>',
                '<p class="info"><span class="place">{placename}</span> <tpl for="speakers">{name} </tpl></p>',
              '</div>',
            '</tpl>',
            '<tpl if="!id">',
              '<div class="date">{hour}</div>',
                '<div class="right-cell">',
                  '<div class="title">{title}</div>',
              '</div>',
            '</tpl>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'calendar'
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
    
    codebits.views.CalendarList.superclass.initComponent.apply(this, arguments);
  },
  
  updateDataHandler: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.list.scroller.scrollTo({x: 0, y: 0});
    this.list.store.read({
      scope:this,
      params:{
        url: 'calendar'
      },
      callback: function(result, operation, success) {
        console.log(this);
        if (!operation.response.error) {
          this.dataUpdated = true;    
        }
      }
    });
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    if (record.data.id > 0) {
      Ext.dispatch({
        controller: 'viewport',
        action: 'calendar',
        next: true,
        id: record.data.id,
        historyUrl: 'calendar/' + record.data.id
      });
    }
    else {
      subList.getSelectionModel().deselectAll();
    }
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
});

Ext.reg('calendarListView', codebits.views.CalendarList);