Ext.regApplication({
  name: "codebits",
  
  defaultUrl: 'home',
  defaultTarget: 'viewport',
  
  icon: 'res/imgs/icon.png',
  glossOnIcon: false,
  phoneStartupScreen: 'res/imgs/phone_startup.png',
  //tabletStartupScreen: 'res/imgs/tablet_startup.png', //not ready for tablet
  
  /**
   * This is called automatically when the page loads. 
   * Here we set up the main component on the page - the Viewport
   */
  launch: function() {
    this.viewport = new codebits.Viewport({
      application: this
    });
    
    Ext.defer(function() {
      if (!localStorage['uid'] || !localStorage['token']) {
        Ext.redirect('login');
      }
    }, 10, Ext);
  },
  
  
  
});