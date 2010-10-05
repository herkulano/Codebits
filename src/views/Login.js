app.LoginForm = Ext.extend(Ext.form.FormPanel, {
  name:'LoginForm',
  scroll:'vertical',
  standardSubmit:true,
  initComponent: function() {
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
    
    app.LoginForm.superclass.initComponent.call(this);
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
      success: function(response) {
        var result = Ext.util.JSON.decode(response.responseText);
        console.log(result);
        if(result.token){
          localStorage['token'] = result.token;
          localStorage['uid'] = result.uid;
          anim = {
            type: 'slide',
            direction:'down',
            easing:'ease-out'
          };
          // TODO: 1 > should be user_id
          that.fireEvent('setCard', 'SessionListView', 1, anim);
        }
        else if (result.error) {
          alert(G_TRY_AGAIN);
        }
        that.getEl().unmask();
      }
    });
  }
});

Ext.reg('LoginForm', app.LoginForm);
