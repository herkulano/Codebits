Ext.Router.draw(function(map) {
    map.connect("home", {controller: 'viewport', action: 'home'});
    map.connect("login", {controller: 'viewport', action: 'login'});
    
    map.connect("favorite", {controller: 'viewport', action: 'favorite'});
    map.connect("favorite/:session", {controller: 'viewport', action: 'favorite'});

});