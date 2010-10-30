Ext.data.CodebitsProxy = Ext.extend(Ext.data.AjaxProxy, {
  url: G_URL,
  actionMethods: {
    create : 'POST',
    read   : 'POST',
    update : 'POST',
    destroy: 'POST'
  }
});

Ext.data.ProxyMgr.registerType('CodebitsProxy', Ext.data.CodebitsProxy);