/**
 * @class codebits.Viewport
 * @extends Ext.Panel
 */
codebits.Viewport = Ext.extend(Ext.Panel, {
  id: 'viewport',
  layout: 'card',
  fullscreen: true,

  initComponent: function() {
    Ext.apply(this, {
      items: [
        {xtype: 'homeView'},
        {xtype: 'loginView'},
        {xtype: 'sessionListView'},
        {xtype: 'sessionDetailView'},
        {xtype: 'projectListView'},
        {xtype: 'projectDetailView'},
        {xtype: 'calendarListView'},
        {xtype: 'twitterView'},
        {xtype: 'userSkillListView'},
        {xtype: 'userListView'},
        {xtype: 'userDetailView'},
        {xtype: 'mapView'},
      ]
    });

    codebits.Viewport.superclass.initComponent.apply(this, arguments);
  }
  
});

