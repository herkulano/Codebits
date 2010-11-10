/**
 * @class searches
 * @extends Ext.Controller
 * 
 */
Ext.regController("viewport", {
  
  home: function(options) {
    this.setCard(options.action, 
      null, 
      'fade'
    );
  },
  
  login: function(options) {
    this.setCard(options.action, 
      null, 
      this.anims.SLIDE_UP
    );
  },
  
  favorites: function(options) {
    if (!options.id) {
      this.setCard('sessionList', 
        null, 
        options.next ? this.anims.POP : this.anims.SLIDE_BACK 
      );
    }
    else if (options.id) {
      this.setCard('sessionDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  projects: function(options) {
    if (!options.id) {
      this.setCard('projectList', 
        null, 
        options.next ? this.anims.POP : this.anims.SLIDE_BACK 
      );
    }
    else if (options.id) {
      this.setCard('projectDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  calendar: function(options) {
    if (!options.id) {
      this.setCard('calendarList', 
        null, 
        options.next ? this.anims.POP : this.anims.SLIDE_BACK 
      );
    }
    else if (options.id) {
      this.setCard('sessionDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  twitter: function(options) {
    this.setCard('twitter', 
      null, 
      this.anims.POP
    );
  },
  
  map: function(options) {
    this.setCard('map', 
      null, 
      this.anims.POP
    );
  },
  
  gps: function(options) {
    this.setCard('gps', 
      null, 
      this.anims.POP
    );
  },
  
  vote: function(options) {
    this.setCard('projectVote',
      null, 
      this.anims.POP
    );
  },
  
  skills: function(options) {
    this.setCard('userSkillList', 
      null,
      options.next ? this.anims.POP : this.anims.SLIDE_BACK
    );
  },
  
  users: function(options) {
    if (options.skill && !options.id) {
      this.setCard('userList', 
        options.skill, 
        options.next ? 'slide' : this.anims.SLIDE_BACK,
        options.next ? true : false
      );
    }
    else if (options.id) {
      this.setCard('userDetail', 
        options.id, 
        options.next ? 'slide' : this.anims.SLIDE_BACK
      );
    }
  },
  
  setCard: function(cardName, data, anim, refresh) {
  	// Analytics
  	_gaq.push(['_trackPageview', cardName]);
  	// Control Card Views
    var card = Ext.getCmp(cardName + 'View');
    Ext.getCmp('viewport').setActiveItem(card, anim);
    card.fireEvent('updateData', data, refresh);
  },
  
  anims: {
    SLIDE_UP: {
      type: 'slide',
      cover: true,
      direction:'up',
      easing:'ease-out'
    },
    SLIDE_DOWN: {
      type: 'slide',
      reveal: true,
      direction:'down',
      easing:'ease-out'
    },
    SLIDE_BACK: {
      type: 'slide',
      reverse: true
    },
    POP: {
      type: 'pop',
      scaleOnExit: false
    }
  }
});
