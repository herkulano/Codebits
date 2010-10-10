app.Main = Ext.extend(Ext.Panel, {
  name: 'Main',
  cls: 'main',
  fullscreen: true,
  scroll: 'vertical',
  layout: 'card',
  activeItem: 0,
  initComponent: function() {
    this.cardPath = [];
    
    this.backBt = new Ext.Button({
      text: 'Back',
      ui: 'back',
      handler: this.onBackBtTap,
      hidden: true,
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
      title: 'CODEBITS 2010',
      dock: 'top',
      items: [this.backBt, {flex: 1, xtype: 'spacer'}, this.refreshBt]
    });
    
    this.dockedItems = [this.navBar];
    
    // init items
    var cardOptions = {
      listeners: {
        setCard: this.onSetCard,
        scope: this
      }
    };
    this.loginForm = new app.LoginForm(cardOptions);
    this.homeView = new app.HomeView(cardOptions);
    this.sessionListView = new app.SessionListView(cardOptions);
    this.sessionDetailView = new app.SessionDetailView(cardOptions);
    this.userSkillListView = new app.UserSkillListView(cardOptions);
    this.userListView = new app.UserListView(cardOptions);
    this.userDetailView = new app.UserDetailView(cardOptions);
    
    // add items to main
    this.items = [
      this.loginForm,
      this.homeView,
      this.sessionListView,
      this.sessionDetailView,
      this.userSkillListView,
      this.userListView,
      this.userDetailView,
    ];
    
    this.addEvents('setCard');
    this.on('setCard', this.onSetCard, this);
    
    app.Main.superclass.initComponent.call(this);
  },
  onSetCard: function(cardName, data, anim, back){
    // choose card to set
    switch(cardName) {
      case 'LoginForm':
        card = this.loginView;
        break;
      case 'HomeView':
        card = this.homeView;
        this.homeView.select(null);
        break;
      case 'SessionListView':
        card = this.sessionListView;
        //this.sessionListView.fireEvent('updateData', data);
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
      default:
        card = this.loginView;
        break;
    }
    
    // hide or show backBt
    if(this.items.indexOf(card) > 1)
      this.backBt.show();
    else
      this.backBt.hide('fade');
    
    // hide or show refreshBt
    if(card == this.sessionListView)
      this.refreshBt.show();
    else
      this.refreshBt.hide('fade');
    
    // add or remove to card path
    // choose anim according to view and backBt
    if(back !== true && card != this.loginForm) {
      this.cardPath.push(cardName); 
    }
    else {
      this.cardPath.pop();
      
      if (card == this.homeView)
        anim = 'fade';
      else
        anim = {type: 'slide', reverse: true};
    }
    console.log('cardPath', this.cardPath);
    console.log('onSetCard',card,data,anim);
    this.setCard(card, anim);
  },
  onBackBtTap: function(){
    this.fireEvent(
      'setCard', this.cardPath[this.cardPath.length-2],
      null, null, true
    );
    console.log('backBt');
  },
  onRefreshTap: function(){
    this.getActiveItem().fireEvent('updateData', 3, true);
  }
});