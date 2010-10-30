/**
 * @class codebits.views.Home
 * @extends Ext.form.FormPanel
 * @xtype loginView
 */
codebits.views.Login = Ext.extend(Ext.form.FormPanel, {
  id:'loginView',
  scroll:'vertical',
  standardSubmit:true,
  
  initComponent: function(){
    Ext.apply(this, {
      items:[{
        xtype:'fieldset',
        defaults: {
          required: true
        },
        items:[
          {
            xtype: 'emailfield',
            name : 'user',
            placeHolder: 'email'
          },
          {
            xtype: 'passwordfield',
            name : 'password',
            placeHolder: 'password'
          },
          {
            xtype: 'button',
            text: 'LOGIN',
            ui: 'default',
            listeners:{
              scope: this,
              tap: this.onTryLogin
            }
          },
        ]
      }]
    });
    
    codebits.views.Login.superclass.initComponent.apply(this, arguments);
  },
  onTryLogin: function(){
    var that = this;
    that.getEl().mask(false, '<div>Checking...</div>');
    
    Ext.Ajax.request({
      url: G_URL,
      params: {
        url: 'gettoken',
        user: that.getValues().user,
        password: that.getValues().password
      },
      success: function(response){
        var result = JSON.parse(response.responseText);
        if(!result.error){
          localStorage['token'] = result.token;
          localStorage['uid'] = result.uid;
          
          Ext.dispatch({
            controller: 'viewport',
            action: 'home',
            historyUrl: 'home'
          });
        }
        else {
          alert(G_TRY_AGAIN);
        }
        that.getEl().unmask();
      },
      failure: function(){
        alert(G_NO_CONN);
        that.getEl().unmask();
      }
    });
  }
});

Ext.reg('loginView', codebits.views.Login);
