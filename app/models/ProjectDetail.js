Ext.regModel('ProjectDetail', {
  fields: [
    {name: 'id',                    type: 'int'},
    {name: 'title',                 type: 'string'},
    {name: 'owner_id',              type: 'int'},
    {name: 'abstract',              type: 'string'},
    {name: 'description',           type: 'string'},
    {name: 'url',                   type: 'string'},
    {name: 'date_created',          type: 'string'},
    {name: 'date_modified',         type: 'string'},
    {name: 'status',                type: 'string'},
    {name: 'presentation_position', type: 'string'},
    {name: 'location',              type: 'string'},
    {name: 'edition',               type: 'string'},
    {name: 'video_offset',          type: 'string'},
    {name: 'users',                 type: 'array'},
  ],
  
  proxy: {
    type: 'CodebitsProxy'
  }
  
});