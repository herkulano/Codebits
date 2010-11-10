/**
 * @class codebits.views.SessionDetail
 * @extends Ext.Panel
 * @xtype sessionDetailView
 */
codebits.views.SessionDetail = Ext.extend(Ext.Panel, {
  id:'sessionDetailView',
  
  scroll:'vertical',
  cls:'detail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'session'
      },
    });
    
    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<div class="sessiondetail-item dataview-item">',
          '<div class="date">{start}</div>',
          '<div class="place">{placename}</div>',
          '<p class="title">{title} [{lang}]</p>',
          '<br/>',
          '<p class="info">{description}</p>',
          '<br/>',
          '<div class="info">',
            '<tpl if="slideshare">',
              '<p>{slideshare}</p>',
            '</tpl>',
            '<tpl if="slideshare">',
              '<p><a target="_blank" href="{slideshare}">{slideshare}</a></p>',
            '</tpl>',
            '<tpl if="pfile">',
              '<p><a target="_blank" href="{pfile}">{pfile}</a></p>',
            '</tpl>',
            '<tpl if="video">',
              '<p><a target="_blank" href="{video}">{video}</a></p>',
            '</tpl>',
            '<tpl for="speakers">',
              '<div class="speakers-item detail-item">',
                '<img src="http://www.gravatar.com/avatar/{md5mail}?s=100&d=retro" />',
                '<p class="name">{name}</p>',
                '<p>Karma: {karma}</p>',
                '<tpl if="twitter">',
                  '<p>Twitter: <a target="_blank" href="http://twitter.com/{twitter}">@{twitter}</a></p>',
                '</tpl>',
                '<tpl if="blog">',
                  '<p>Blog: <a target="_blank" href="{blog}">{blog}</a></p>',
                '</tpl>',
              '</div>',
            '</tpl>',
          '</div>',
        '</div>',
      '</tpl>'
    );
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.SessionDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(session_id) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'session/' + session_id,
      callbackKey: 'callback',
      scope: this,
      
      callback: function(result) {
        if (!result.error) {
          this.update(this.tpl.applyTemplate(result));
        }
        else {
          alert('Token expired!');
          Ext.redirect('login');
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('sessionDetailView', codebits.views.SessionDetail);