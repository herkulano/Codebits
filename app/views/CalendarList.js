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
    
    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<tpl if="colspan == 1">',
          '<div class="calendarlist-item">',
            '<div class="date">{hour}<p class="session-id x-hidden-display">{id}</p></div>',
            '<div class="right-cell">',
              '<div class="title">{title}</div>',
              '<p class="info"><span class="place">{placename}</span> <tpl for="speakers">{name} </tpl></p>',
            '</div>',
          '</div>',
        '</tpl>',
        '<tpl if="colspan == 4">',
          '<div class="calendarlist-break-item">',
            '<div class="date">{hour}</div>',
            '<div class="right-cell">',
              '<div class="title">{title}</div>',
            '</div>',
          '</div>',
        '</tpl>',
      '</tpl>'
    );
    
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
        if (!operation.response.error) {
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