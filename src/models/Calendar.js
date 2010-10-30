Ext.regModel('Calendar', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'start',       type: 'string'},
    {name: 'end',         type: 'string'},
    {name: 'hour',        type: 'string'},
    {name: 'day',         type: 'string'},
    {name: 'dayname',     type: 'string'},
    {name: 'colspan',     type: 'int'},
    {name: 'title',       type: 'string'},
    {name: 'placename',   type: 'string'},
    {name: 'speakers',    type: 'array'}
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
});