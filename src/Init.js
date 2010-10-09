Ext.ns('app', 'model', 'view', 'proxy');

Ext.setup({
  tabletStartupScreen: 'res/imgs/tablet_startup.png',
  phoneStartupScreen: 'res/imgs/phone_startup.png',
  icon: 'res/imgs/icon.png',
  glossOnIcon: true,
  onReady: function() {
    var main = new app.Main({
      scope:this
    });
    
    if(localStorage['uid'] && localStorage['token']){
      //main.fireEvent('setCard', 'SessionListView', localStorage['uid'], null);
      //main.fireEvent('setCard', 'SessionListView', 3, null);
      //main.fireEvent('setCard', 'SessionDetailView', 110, null);
      main.fireEvent('setCard', 'HomeView', null, null);
    }
    else {
      main.fireEvent('setCard', 'LoginForm', null, null);
    }
  }
});