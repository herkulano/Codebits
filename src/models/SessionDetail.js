Ext.regModel('SessionDetail', {
  fields: [
    {name: 'id',          type: 'int'},
    {name: 'title',       type: 'string'},
    {name: 'description', type: 'string'},
    {name: 'place',       type: 'string'},
    {name: 'placename',   type: 'string'},
    {name: 'start',       type: 'string'},
    {name: 'slideshare',  types: 'string'},
    {name: 'pfile',       type: 'string'},
    {name: 'video',       type: 'string'},
    {name: 'lang',        type: 'string'},
  ],
  
  associations: [
      {type: 'hasMany', model: 'Speaker', name: 'speakers'}
  ]

});