app.Main = Ext.extend(Ext.Panel, {
  name: 'Main',
  cls: 'main',
  fullscreen: true,
  layout: 'card',
  activeItem: 0,
  initComponent: function() {
    this.cardPath = [];
    
    this.backBt = new Ext.Button({
      text: 'back',
      ui: 'plain',
      cls: 'back-bt',
      handler: this.onBackBtTap,
      scope: this
    });
    
    this.refreshBt = new Ext.Button({
        iconCls: 'refresh',
        ui: 'plain',
        handler: this.onRefreshTap,
        hidden: true,
        iconMask: true,
        scope: this
    });
    
    this.navBar = new Ext.Toolbar({
      cls: 'navbar',
      dock: 'top',
      items: [this.backBt, {flex: 1, xtype: 'spacer'}, this.refreshBt]
    });
    
    // init items
    var cardListeners = {
      setCard: this.onSetCard,
      updateTitle: this.onUpdateTitle,
      scope: this
    };
    var cardOptions = {
       listeners:cardListeners,
    };
    //
    this.loginView = new app.LoginView({listeners:cardListeners});
    this.homeView = new app.HomeView(cardOptions);
    //
    this.sessionListView = new app.SessionListView(cardOptions);
    this.sessionDetailView = new app.SessionDetailView(cardOptions);
    this.userSkillListView = new app.UserSkillListView(cardOptions);
    this.userListView = new app.UserListView(cardOptions);
    this.userDetailView = new app.UserDetailView(cardOptions);
    this.calendarListView = new app.CalendarListView(cardOptions);
    
    this.innerPanel = new Ext.Panel({
      name: 'InnerPanel',
      cls: 'inner',
      fullscreen: true,
      layout: 'card',
      activeItem: 0,
      items: [
        this.sessionListView,
        this.sessionDetailView,
        this.userSkillListView,
        this.userListView,
        this.userDetailView,
        this.calendarListView,
      ],
      dockedItems: [this.navBar]
    });
    
    // add items to main
    this.items = [
      this.loginView,
      this.homeView,
      this.innerPanel,
    ];
    
    this.addEvents('setCard', 'updateTitle');
    this.on('setCard', this.onSetCard, this);
    this.on('updateTitle', this.onUpdateTitle, this);
    
    app.Main.superclass.initComponent.call(this);
  },
  onSetCard: function(cardName, data, anim, back){
    // choose card to set
    switch(cardName) {
      case 'LoginView':
        card = this.loginView;
        break;
      case 'HomeView':
        card = this.homeView;
        this.homeView.select(null);
        break;
      case 'SessionListView':
        card = this.sessionListView;
        this.sessionListView.fireEvent('updateData', data);
        break;
      case 'SessionDetailView':
        card = this.sessionDetailView;
        this.sessionDetailView.fireEvent('updateData', data);
        break;
      case 'UserSkillListView':
        card = this.userSkillListView;
        break;
      case 'UserListView':
        card = this.userListView;
        if(back !== true)
          this.userListView.fireEvent('updateData', data);
        break;
      case 'UserDetailView':
        card = this.userDetailView;
        this.userDetailView.fireEvent('updateData', data);
        break;
      case 'CalendarListView':
        card = this.calendarListView;
        this.calendarListView.fireEvent('updateData', data);
        break;
        
      default:
        card = this.loginView;
        break;
    }
    
    // add or remove to card path
    // choose anim according to view and backBt
    if(back !== true && card != this.loginView) {
      this.cardPath.push(cardName); 
    }
    else {
      this.cardPath.pop();
      
      if (card == this.homeView)
        anim = 'fade';
      else
        anim = {type: 'slide', reverse: true};
    }
    
    console.log('cardPath', this.cardPath, this.cardPath.length);
    console.log('onSetCard',card,data,anim);
    
    if(this.cardPath.length == 2 ) {
      this.setCard(this.innerPanel, anim);
      this.innerPanel.setCard(card, anim);
    }
    else if(this.cardPath.length > 2 ) {
      this.innerPanel.setCard(card, anim);
    }
    else if(this.cardPath.length == 1) {
      this.setCard(card, anim);
    }
    
    console.log('lastOnSetCard');
  },
  onBackBtTap: function(){
    console.log('backBt', this.cardPath[this.cardPath.length-2]);
    this.fireEvent(
      'setCard', this.cardPath[this.cardPath.length-2],
      null, null, true
    );
  },
  onRefreshTap: function(){
    this.getActiveItem().fireEvent('updateData', 3, true);
  },
  onUpdateTitle: function(title){
    this.navBar.setTitle(title);
  }
});