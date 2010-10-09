Ext.data.CodebitsProxy = Ext.extend(Ext.data.AjaxProxy, {
    url: G_URL,
    callbackKey: 'callback',
    actionMethods: {
      create : 'POST',
      read   : 'POST',
      update : 'POST',
      destroy: 'POST'
    },
    constructor: function(config) {
      config = config || {};
      
      Ext.applyIf(config, {
        extraParams: {
          // add default params that may me overridden
        }
      });
      
      Ext.data.CodebitsProxy.superclass.constructor.call(this, config);
  }
});

Ext.data.ProxyMgr.registerType('CodebitsProxy', Ext.data.CodebitsProxy);