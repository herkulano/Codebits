/**
 * @class codebits.views.Panel
 * @extends Ext.List
 * @xtype twitterView
 */
codebits.views.Twitter = Ext.extend(Ext.Panel, {
  id: 'twitterView',
  layout: 'fit',
  
  initComponent: function() {
    this.list = new Ext.DataView({
      scroll:'vertical',
      disableSelection: true,
      itemSelector: 'div.tweet',
      cls: 'list-view',
      
      loadingText: G_LOADING,
      emptyText: G_EMPTY,
      
      store: new Ext.data.Store({
        model: 'Tweet',
        autoload: false
      }),
      
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="tweet">',
            '<img src="{profile_image_url}" />',
            '<div class="tweet-bubble">',
              '<div class="tweet-content">',
                '<p class="user">{from_user}</p>',
                '<p class="date">{[this.formatDate(values.created_at)]}</p>',
                '<h1>{[this.linkify(values.text)]}</h1>',
              '</div>',
            '</div>',
          '</div>',
        '</tpl>',
        {
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
            return txt;
          }
        }
      )
    });
    
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'projects',
        refresh: true
      },
      items: [this.list]
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.updateDataHandler, this);

    codebits.views.Twitter.superclass.initComponent.apply(this, arguments);
  },
  updateDataHandler: function(data, refresh) {
    try {
      this.list.store.read();
    }
    catch(err) {
      console.log(err);
    }
  }
});

Ext.reg('twitterView', codebits.views.Twitter);