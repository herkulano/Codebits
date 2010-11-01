Ext.data.CodebitsProxy = Ext.extend(Ext.data.ScriptTagProxy, {
  url: G_URL,
  noCache : false,
  
  default_url: G_URL,
  
  constructor: function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
      extraParams: {
        //format: 'jsonp' // not needed now. keeping it just in case.
      }
    });
    
    Ext.data.CodebitsProxy.superclass.constructor.call(this, config);
  },
  
  buildRequest: function(operation) {
    var request = Ext.data.CodebitsProxy.superclass.buildRequest.apply(this, arguments),
        params  = request.params;
    
    request.url = this.default_url + params.url;
    request.url = this.buildUrl(request);
    
    return request;
  }
});

Ext.data.ProxyMgr.registerType('CodebitsProxy', Ext.data.CodebitsProxy);