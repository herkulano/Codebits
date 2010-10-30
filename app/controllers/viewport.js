/**
 * @class searches
 * @extends Ext.Controller
 * 
 */
Ext.regController("viewport", {
  
  home: function(options) {
    console.log(options.action);
    this.setCard(options.action);
  },
  
  login: function(options) {
    console.log(options.action, options);
    this.setCard(options.action, this.anims.SLIDE_UP);
  },
  
  favorite: function(options) {
    console.log(options.action, options.session);
    
    if (!options.session) {
      this.setCard('sessionList', null, this.anims.POP);
    }
    else if (options.session) {
      this.setCard('sessionDetail', options.session, 'slide');
    }
  },
  
  setCard: function(cardName, data, anim) {
    var card = Ext.getCmp(cardName + 'View');
    Ext.getCmp('viewport').setCard(card, anim);
    card.fireEvent('updateData', data);
  },
  
  anims: {
    SLIDE_UP: {
      type: 'slide',
      direction:'up',
      easing:'ease-out'
    },
    SLIDE_DOWN: {
      type: 'slide',
      reveal: true,
      direction:'down',
      easing:'ease-out'
    },
    POP: {
      type: 'pop',
      scaleOnExit: false
    }
  }
});
