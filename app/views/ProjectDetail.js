/**
 * @class codebits.views.ProjectList
 * @extends Ext.Panel
 * @xtype projectListView
 */
codebits.views.ProjectDetail = Ext.extend(Ext.Panel, {
  id:'projectDetailView',
  
  cls:'detail-view',
  scroll: 'vertical',
  
  initComponent: function() {
    
    Ext.apply(this, {
      dockedItems: {
        xtype:'navBar',
        title:'project'
      },
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="projectdetail-item dataview-item">',
            '<div class="date">',
              '<p>{date_modified}</p>',
              '<p>{location}</p>',
            '</div>',
            '<div class="right-box {status}">{id}</div>',
            '<p class="title">{title}</p>',
            '<br/>',
            '<p><b>Abstract</b></p>',
            '<p class="info">{abstract}</p>',
            '<br/>',
            '<p><b>Description</b></p>',
            '<p class="info">{description}</p>',
            '<br/>',
            '<div class="info">',
              '<tpl if="url">',
                '<p><a target="_blank" href="{url}">{url}</a></p>',
              '</tpl>',
              '<p>Position: {presentation_position}</p>',
              '<p>Edition: {edition} ~ Video Offset: {video_offset}</p>',
            '</div>',
            '<tpl for="users">',
              '<div class="users-item detail-item">',
                '<p class="name">{name} <tpl if="owner == 1">[owner]</tpl></p>',
                '<tpl if="status">',
                  '<p>{status}</p>',
                '</tpl>',
              '</div>',
            '</tpl>',
          '</div>',
        '</tpl>'
      ),
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.ProjectDetail.superclass.initComponent.apply(this, arguments);
  },
  onUpdateData: function(data) {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setLoading({msg:G_LOADING}, true);
    
    Ext.util.JSONP.request({
      url: G_URL + 'project/' + data,
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

Ext.reg('projectDetailView', codebits.views.ProjectDetail);