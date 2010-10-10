Ext.regModel('UserDetail', {
    fields: [
        {name: 'id',          type: 'int'},
        {name: 'nick',        type: 'string'},
        {name: 'name',        type: 'string'},
        {name: 'karma',       type: 'string'},
        {name: 'bio',         type: 'string'},
        {name: 'twitter',     type: 'string'},
        {name: 'blog',        type: 'string'},
        {name: 'skills',      type: 'array'},
    ]
});