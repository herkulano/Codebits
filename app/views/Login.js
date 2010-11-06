/**
 * @class codebits.views.Login
 * @extends Ext.form.FormPanel
 * @xtype loginView
 */
codebits.views.Login = Ext.extend(Ext.form.FormPanel, {
  id:'loginView',
  
  scroll:'vertical',
  cls:'form-view',
  
  initComponent: function(){
    Ext.apply(this, {
      items:[
        {
          xtype:'fieldset',
          title: 'CODEBITS IV',
          defaults: {
            required: true,
            showClear: true
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
          ]
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
    });
    
    codebits.views.Login.superclass.initComponent.apply(this, arguments);
  },
  onTryLogin: function(){
    this.setLoading({msg:G_CHECK}, this.getEl());
    
    Ext.util.JSONP.request({
      url: G_URL + 'gettoken',
      callbackKey: 'callback',
      scope: this,
      
      params:{
        user: this.getValues().user,
        password: this.getValues().password
      },
      
      callback: function(result) {
        if (!result.error) {
          localStorage['token'] = result.token;
          localStorage['uid'] = result.uid;
          
          Ext.redirect('home');
        }
        else {
          alert(G_TRY_AGAIN);
        }
        this.setLoading(false);
      }
    });
  }
});

Ext.reg('loginView', codebits.views.Login);
