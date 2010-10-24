app.LoginView = Ext.extend(Ext.form.FormPanel, {
  name:'LoginView',
  scroll:'vertical',
  standardSubmit:true,
  initComponent: function(){
    this.email = new Ext.form.EmailField({
      name : 'user',
      placeHolder: 'email'
    });
    
    this.pass = new Ext.form.PasswordField({
      name : 'password',
      placeHolder: 'password'
    });
    
    this.loginBt = new Ext.Button({
      text: 'LOGIN',
      ui: 'Default'
    });
    
    this.loginBt.on('tap', this.onTryLogin, this);
    
    this.fieldSet = new Ext.form.FieldSet({
      defaults: {
          required: true
      },
      items: [this.email, this.pass, this.loginBt]
    });
    
    this.items = [this.fieldSet];
    
    app.LoginView.superclass.initComponent.call(this);
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
        var result = Ext.util.JSON.decode(response.responseText);
        if(!result.error){
          localStorage['token'] = result.token;
          localStorage['uid'] = result.uid;
          that.fireEvent('setCard', 'HomeView', null, SLIDE_DOWN);
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

Ext.reg('LoginView', app.LoginView);
