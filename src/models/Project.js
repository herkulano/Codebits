Ext.regModel('Project', {
    fields: [
        {name: 'id',          type: 'int'},
        {name: 'owner_id',    type: 'int'},
        {name: 'title',       type: 'string'},
        {name: 'regdate',     type: 'string'},
        {name: 'status',      type: 'string'}
    ]
});