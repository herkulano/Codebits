/**
 * @class codebits.views.UserSkillList
 * @extends Ext.List
 * @xtype projectListView
 */
codebits.views.UserSkillList = Ext.extend(Ext.List, {
  id:'userSkillListView',
  
  scroll:'vertical',
  singleSelect: true,
  cls:'list-view',
  itemSelector:'div.userskilllist-item',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      store: new Ext.data.Store({
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
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'users by skill'
      },
      
      listeners:{
        scope: this,
        itemtap: this.onListItemTap
      }
    });
    
    this.tpl = Ext.XTemplate.from('userskilllist');
    this.tpl.compile();
    
    codebits.views.UserSkillList.superclass.initComponent.apply(this, arguments);
  },
  onListItemTap: function(view, index, item, e){
    var record = this.getRecord(item);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'users',
      next: true,
      skill: record.data.skill,
      historyUrl: 'skills/' + record.data.skill
    });
  }
});

Ext.reg('userSkillListView', codebits.views.UserSkillList);