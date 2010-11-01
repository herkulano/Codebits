/**
 * @class codebits.views.Twitter
 * @extends Ext.List
 * @xtype twitterView
 */
codebits.views.Twitter = Ext.extend(Ext.List, {
  id: 'twitterView',
  
  itemSelector: 'div.tweet',
  scroll:'vertical',
  singleSelect: false,
  cls: 'list-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      store: new Ext.data.Store({
        model: 'Tweet',
        autoload: false
      }),
      
      dockedItems: {
        xtype:'navBar',
        title:'projects',
        refresh: true
      }
    });

    this.tpl = Ext.XTemplate.from('twitterlist', {
      /**
       * Simply wraps a link tag around each detected url
       */
      linkify: function(value) {
        return value.replace(/(http[s]*:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
      },
      /**
       * Format Date to twitter style
       */
      formatDate: function(value) {
        var dt = new Date(value),
            now = new Date(),
            diff = 0,
            minutes = 0, 
            hours = 0,
            days = 0,
            txt = '';
            
        diff = now.getTime() - dt.getTime();
        
        minutes = Math.round(diff/1000/60);
        hours = Math.round(diff/1000/60/60);
        days = Math.round(diff/1000/60/60/24);
        
        if (minutes >= 60) {
          if (hours >= 24) {
            txt = dt.format('j M');
          }
          else {
            txt = hours + ' '+ (hours == 1 ? 'hour' : 'hours') +' ago';
          }
        }
        else {
          txt = minutes + ' '+ (minutes == 1 ? 'minute' : 'minutes') +' ago';
        }
        
        console.log(minutes, hours, days);
        
        return txt;
      },
    });
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);

    codebits.views.Twitter.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    try {
      this.store.read();
    }
    catch(err) {
      console.log(err);
    }
  }
});

Ext.reg('twitterView', codebits.views.Twitter);