Ext.regModel('User', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'nick',        type: 'string'},
    {name: 'name',        type: 'string'},
    {name: 'twitter',     type: 'string'},
    {name: 'blog',        type: 'string'},
    {name: 'status',      type: 'string'},
    {name: 'owner',       type: 'int'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});