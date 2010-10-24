app.CalendarListView = Ext.extend(Ext.List, {
  name:'CalendarListView',
  cls: 'list-view',
  itemSelector: 'div.calendarlist-item',
  singleSelect: true,
  grouped: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.dataUpdated = false;
    
    this.store = new Ext.data.Store({
      model: 'Calendar',
      proxy: 'CodebitsProxy',
      sorters: 'day',
      getGroupString : function(record) {
        return record.get('day') +' '+ record.get('dayname');
      },
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('calendarlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.CalendarListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(empty, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
    
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'calendar'
      }
    });
    this.dataUpdated = true;
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    console.log(record.data.id);
    this.fireEvent('setCard', 'SessionDetailView', record.data.id, 'slide');
  }
});

Ext.reg('CalendarListView', app.CalendarListView);