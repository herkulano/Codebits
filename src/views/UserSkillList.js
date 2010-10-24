app.UserSkillListView = Ext.extend(Ext.List, {
  name:'UserSkillListView',
  cls:'list-view',
  itemSelector:'div.userskilllist-item',
  scroll:'vertical',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.store = new Ext.data.Store({
      fields: ['skill'],
      data: [
        {skill:'api'},{skill:'cc'},{skill:'cocoa'},
        {skill:'css'},{skill:'design'},{skill:'desktop'},
        {skill:'dotnet'},{skill:'embbeded'},{skill:'erlang'},
        {skill:'hardware'},{skill:'java'},{skill:'javascript'},
        {skill:'microformats'},{skill:'mobile'},{skill:'perl'},
        {skill:'php'},{skill:'python'},{skill:'ruby'},
        {skill:'security'},{skill:'sysadmin'},{skill:'web'}
      ]
    });
    
    this.tpl = Ext.XTemplate.from('userskilllist');
    this.tpl.compile();
    
    this.on('itemtap', this.onListItemTap);
    
    app.UserSkillListView.superclass.initComponent.call(this);
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    this.fireEvent('setCard', 'UserListView', record.data.skill, 'slide');
  }
});

Ext.reg('UserSkillListView', app.UserSkillListView);