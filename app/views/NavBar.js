/**
 * @class codebits.views.NavBar
 * @extends Ext.Toolbar
 * @xtype navBar
 */
codebits.views.NavBar = Ext.extend(Ext.Toolbar, {
  cls: 'navbar',
  dock: 'top',
  
  constructor: function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
      items: [
        {
          xtype: 'button',
          text: 'back',
          ui: 'plain',
          cls: 'back-bt',
          handler: this.onBackBtTap,
          scope: this
        },
        {
          flex: 1, 
          xtype: 'spacer'
        },
        {
          xtype: 'button',
          ui: 'plain',
          cls: 'refresh-bt',
          hidden: !config.refresh,
          handler: this.onRefreshTap,
          scope: this
        },
      ]
    });
    
    this.addEvents('updateData');
    this.enableBubble('updateData');
    
    codebits.views.NavBar.superclass.constructor.call(this, config);
  },
  
  onBackBtTap: function() {
    window.history.back();
  },
  
  onRefreshTap: function(){
    this.fireEvent('updateData', null, true);
  }
  
});

Ext.reg('navBar', codebits.views.NavBar);