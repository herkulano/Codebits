/**
 * @class codebits.views.UserDetail
 * @extends Ext.Panel
 * @xtype userDetailView
 */
codebits.views.UserDetail = Ext.extend(Ext.Panel, {
  id:'userDetailView',
  
  scroll:'vertical',
  cls: 'detail-view',
  
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  
  initComponent: function() {
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'user info'
      },
    });
    
    this.tpl = new Ext.XTemplate(
      '<tpl for=".">',
        '<div class="userdetail-item dataview-item">',
          '<div class="date">{nick}</div>',
          '<div class="place">{id}</div>',
          '<p class="title">{name} [{nick}]</p>',
          '<br/>',
          '<p class="info">{bio}</p>',
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
            '<p>Karma: {karma}</p>',
            '<tpl if="twitter">',
              '<p>Twitter: <a target="_blank" href="http://twitter.com/{twitter}">@{twitter}</a></p>',
            '</tpl>',
            '<tpl if="blog">',
              '<p>Blog: <a target="_blank" href="{blog}">{blog}</a></p>',
            '</tpl>',
            '<br/>',
            '<p><tpl for="skills">{.} </tpl></p>',
          '</div>',
        '</div>',
      '</tpl>'
    );
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.UserDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data, refresh) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'user/' + data,
      callbackKey: 'callback',
      scope: this,
      
      params:{
        token: localStorage['token']
      },
      
      callback: function(result) {
        if (!result.error) {
          this.update(this.tpl.applyTemplate(result));
		  this.doLayout();
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

Ext.reg('userDetailView', codebits.views.UserDetail);