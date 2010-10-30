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
      ]
    });

    codebits.Viewport.superclass.initComponent.apply(this, arguments);
  }
  
});

