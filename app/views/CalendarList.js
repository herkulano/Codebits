codebits.views.CalendarList = Ext.extend(Ext.List, {
  id:'calendarListView',
  
  scroll:'vertical',
  singleSelect: true,
  grouped: true,
  cls: 'list-view',
  itemSelector: 'div.calendarlist-item',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    this.dataUpdated = false;
    
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'Calendar',
        sorters: 'day',
        getGroupString : function(record) {
          return record.get('day') +' '+ record.get('dayname');
        },
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'calendar'
      },
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap
      }
    });
    
    this.tpl = Ext.XTemplate.from('calendarlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.CalendarList.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'calendar'
      },
      callback: function(result, opretation, success) {
        if (result) {
          this.dataUpdated = true;    
        }
      }
    });
  },
  onListItemTap: function(view, index, item, e){
    //var record = this.getRecord(item);
    
    // HACK : Ext should return record.data.id
    var el = new Ext.Element(item);
    var recordID = el.down('p.session-id').getHTML();
    
    if (recordID) {
      Ext.dispatch({
        controller: 'viewport',
        action: 'calendar',
        next: true,
        id: recordID,
        historyUrl: 'calendar/' + recordID
      });
    }
  }
});

Ext.reg('calendarListView', codebits.views.CalendarList);