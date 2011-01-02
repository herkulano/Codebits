Ext.regApplication({
  name: "codebits",
  
  defaultUrl: 'home',
  defaultTarget: 'viewport',
  
  icon: 'resources/imgs/icon.png',
  glossOnIcon: false,
  statusBarStyle: 'black',
  phoneStartupScreen: 'res/imgs/phone_startup.png',
  
  //useLoadMask: true,
  
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