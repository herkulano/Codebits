app.Main = Ext.extend(Ext.Panel, {
  name: 'Main',
  cls: 'main',
  fullscreen: true,
  scroll: 'vertical',
  layout: 'card',
  activeItem: 0,
  initComponent: function() {
    this.toolbar = new Ext.Toolbar({
      title: 'CODEBITS 2010',
      dock: 'top',
      defaults: {
        scope: this,
        ui: 'plain',
        iconMask: true
      }
    });
    this.dockedItems = [this.toolbar];
    
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
    
    // add items to main
    this.items = [
      this.loginForm,
      this.homeView,
      this.sessionListView,
      this.sessionDetailView
    ];
    
    this.addEvents('setCard');
    this.on('setCard', this.onSetCard, this);
    
    app.Main.superclass.initComponent.call(this);
  },
  onSetCard: function(cardName, data, anim){
    var card = this.loginForm;
    switch(cardName) {
      case 'LoginForm':
        card = this.loginView;
        break;
      case 'HomeView':
        card = this.homeView;
        //this.homeView.fireEvent('updateHomeView', data);
        break;
      case 'SessionListView':
        card = this.sessionListView;
        this.sessionListView.fireEvent('updateSessionListView', data);
        break;
      case 'SessionDetailView':
        card = this.sessionDetailView;
        this.sessionDetailView.fireEvent('updateSessionDetailView', data);
        break;
    }
    console.log('onSetCard',card,data,anim);
    this.setCard(card, anim);
  }
});