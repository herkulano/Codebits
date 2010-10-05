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
    this.loginForm = new app.LoginForm({
      listeners: {
        setCard: this.onSetCard,
        scope: this
      }
    });
    this.sessionListView = new app.SessionListView({
      listeners: {
        setCard: this.onSetCard,
        scope: this
      }
    });
    this.sessionDetailView = new app.SessionDetailView({
      listeners: {
        setCard: this.onSetCard,
        scope: this
      }
    });
    // add items to main
    this.items = [
      this.loginForm, 
      this.sessionListView, 
      this.sessionDetailView
    ];
    
    this.addEvents('setCard');
    this.on('setCard', this.onSetCard, this);
    
    app.Main.superclass.initComponent.call(this);
  },
  onSetCard: function(card, data, anim){
    var cardIndex = 0;
    switch(card) {
      case 'LoginForm':
        cardIndex = 0;
        break;
      case 'SessionListView':
        cardIndex = 1;
        this.sessionListView.fireEvent('updateSessionListView', data);
        break;
      case 'SessionDetailView':
        cardIndex = 2;
        this.sessionDetailView.fireEvent('updateSessionDetailView', data);
        break;
    }
    console.log('onSetCard',cardIndex,data,anim);
    this.setCard(cardIndex, anim);
  }
});