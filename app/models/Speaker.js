Ext.regModel('Speaker', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'karma',       type: 'string'},
    {name: 'name',        type: 'string'},
    {name: 'twitter',     type: 'string'},
    {name: 'blog',        type: 'string'},
    {name: 'md5mail',     type: 'string'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});