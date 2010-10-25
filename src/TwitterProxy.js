Ext.data.TwitterProxy = Ext.extend(Ext.data.ScriptTagProxy, {
    url: 'http://search.twitter.com/search.json',
    reader: {
      type: 'json',
      root: 'results',
    },
    
    /**
     * @property defaultQuery
     * @type String
     * The search query to run if none is specified (defaults to 'extjs')
     */
    defaultQuery: 'codebits',
    
    constructor: function(config) {
      config = config || {};
      
      Ext.applyIf(config, {
        extraParams: {
          q: this.defaultQuery,
          rpp: 50,
          suppress_response_codes: true
        }
      });
      Ext.data.TwitterProxy.superclass.constructor.call(this, config);
    }
});

Ext.data.ProxyMgr.registerType('TwitterProxy', Ext.data.TwitterProxy);