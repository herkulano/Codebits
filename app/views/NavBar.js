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
    
    this.backBt = new Ext.Button({
      text: 'back',
      ui: 'plain',
      cls: 'back-bt',
      handler: this.onBackBtTap,
      scope: this
    })
    
    Ext.applyIf(config, {
      items: [
        this.backBt,
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
      ],
    });
    
    this.addEvents('updateData');
    this.enableBubble('updateData');
    
    codebits.views.NavBar.superclass.constructor.call(this, config);
  },
  
  onBackBtTap: function() {
    if(this.init) {
      Ext.redirect('home');
    }
    else {
      window.history.back();
    }
    
  },
  
  onRefreshTap: function(){
    this.fireEvent('updateData', null, true);
  }
  
});

Ext.reg('navBar', codebits.views.NavBar);