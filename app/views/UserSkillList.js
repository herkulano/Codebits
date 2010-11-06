/**
 * @class codebits.views.UserSkillList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.UserSkillList = Ext.extend(Ext.Panel, {
  id:'userSkillListView',
  layout: 'fit',
  
  initComponent: function() {
    this.list = new Ext.List({
      scroll:'vertical',
      singleSelect: true,
      cls:'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
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
      
      itemTpl: [
        '<tpl for=".">',
          '<div class="userskilllist-item">',
            '<p>{skill}</p>',
          '</div>',
        '</tpl>'
      ],
      
      listeners: {
        scope: this,
        itemtap: this.itemTapHandler,
      }
    });
    
    this.toolbar = new codebits.views.NavBar({
      title:'users by skill'
    });
    
    Ext.apply(this, {
      dockedItems: [this.toolbar],
      items: [this.list],
      listeners:{
        scope:this,
        deactivate: this.deactivateHandler
      }
    });
    
    codebits.views.UserSkillList.superclass.initComponent.apply(this, arguments);
  },
  
  itemTapHandler: function(subList, subIdx, el, e) {
    var record = subList.getRecord(el);
    
    Ext.dispatch({
      controller: 'viewport',
      action: 'users',
      next: true,
      skill: record.data.skill,
      historyUrl: 'skills/' + record.data.skill
    });
  },
  
  deactivateHandler: function(){
    this.list.getSelectionModel().deselectAll();
  }
});

Ext.reg('userSkillListView', codebits.views.UserSkillList);