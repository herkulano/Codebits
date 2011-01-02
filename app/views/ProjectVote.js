/**
 * @class codebits.views.ProjectVote
 * @extends Ext.Panel
 * @xtype projectVoteView
 */
codebits.views.ProjectVote = Ext.extend(Ext.Panel, {
  id:'projectVoteView',
  layout: 'fit',
  
  initComponent: function() {
    this.timeout = null;
    this.doUpdateVotes = false;
    this.updateInterval = 5000;
    
    this.detail = new Ext.Panel({
      cls:'detail-view',
      scroll: 'vertical',
      
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
    
    this.yesVotes = new Ext.Container({
      html: '00',
      cls: 'vote-txt',
      flex:2
    });
    this.noVotes = new Ext.Container({
      html: '00',
      cls: 'vote-txt',
      flex:2
    });
    this.voteYes = new Ext.Button({
      name: 'voteYes',
      text:'YES',
      ui: 'plain',
      cls: 'vote-yes-bt',
      listeners: {
        scope: this,
        tap: this.voteHandler
      },
      flex:3
    });
    this.voteNo = new Ext.Button({
      name: 'voteNo',
      text:'NO',
      ui: 'plain',
      cls: 'vote-no-bt',
      listeners: {
        scope: this,
        tap: this.voteHandler
      },
      flex:3,
      
    });
    
    this.voteBar = new Ext.Toolbar({
      cls: 'vote-bar',
      dock:'bottom',
      items: [
        this.yesVotes,
        this.voteYes,
        {xtype:'spacer', flex:1},
        this.voteNo,
        this.noVotes
      ]
    });
    
    Ext.apply(this, {
      dockedItems:[
        {
          xtype:'navBar',
          title:'vote',
          refresh: true,
        },
        this.voteBar
      ],
      items: [this.detail],
      
      listeners: {
        scope: this,
        hide: this.hideHandler
      }
    });
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    codebits.views.ProjectVote.superclass.initComponent.apply(this, arguments);
  },
  
  onUpdateData: function(data) {
    this.detail.scroller.scrollTo({x: 0, y: 0});
    this.detail.setLoading({msg:G_LOADING}, true);
    
    clearTimeout(this.timeout);
    this.voteNo.enable();
    this.voteYes.enable();
    
    Ext.util.JSONP.request({
      url: G_URL + 'votes',
      callbackKey: 'callback',
      scope: this,
      
      callback: function(result) {
        if (!result.error) {
          Ext.defer(getDetail, 10, this, [result.project]);
          
          this.doUpdateVotes = true;
          this.updateVotesHTML(result);
          this.timeout = Ext.defer(this.updateVotes, this.updateInterval, this);
        }
      }
    });
    
    var getDetail = function(project) {
      Ext.util.JSONP.request({
        url: G_URL + 'project/' + project,
        callbackKey: 'callback',
        scope: this,
        
        params:{
          token: localStorage['token']
        },
        
        callback: function(result) {
          if (!result.error) {
            this.detail.update(this.detail.tpl.applyTemplate(result));
			this.doLayout();
          }
          else {
            alert('Token expired!');
            Ext.redirect('login');
          }
          this.detail.setLoading(false);
        }
      });
    }
  },
  
  updateVotes: function() {
    if(this.doUpdateVotes) {
      Ext.util.JSONP.request({
        url: G_URL + 'votes',
        callbackKey: 'callback',
        scope: this,
        
        callback: function(result) {
          if (!result.error) {
            this.updateVotesHTML(result);
            this.timeout = Ext.defer(this.updateVotes, this.updateInterval, this);
          }
        }
      });
    }
  },
  
  updateVotesHTML: function(data) {
    //console.log(data.yes, data.no);
    this.yesVotes.getEl().setHTML(data.yes);
    this.noVotes.getEl().setHTML(data.no);
  },
  
  voteHandler: function(el, e) {
    var vote = el.name == 'voteYes' ? 1 : 0;
    
    if (vote) {
      this.voteNo.enable();
      this.voteYes.disable();
    }
    else {
      this.voteYes.enable();
      this.voteNo.disable();
    }
    
    Ext.util.JSONP.request({
      url: G_URL + 'vote/' + vote,
      callbackKey: 'callback',
      
      params:{
        token: localStorage['token']
      },
      callback: function(result) {
        //console.log(result);
      }
    });
  },
  
  hideHandler: function() {
    clearTimeout(this.timeout);
    this.doUpdateVotes = false;
  }
  
});

Ext.reg('projectVoteView', codebits.views.ProjectVote);