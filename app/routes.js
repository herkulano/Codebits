Ext.Router.draw(function(map) {
    map.connect("home", {controller: 'viewport', action: 'home'});
    map.connect("login", {controller: 'viewport', action: 'login'});
    
    map.connect("favorites", {controller: 'viewport', action: 'favorites'});
    map.connect("favorites/:id", {controller: 'viewport', action: 'favorites'});
    
    map.connect("projects", {controller: 'viewport', action: 'projects'});
    map.connect("projects/:id", {controller: 'viewport', action: 'projects'});
    
    map.connect("calendar", {controller: 'viewport', action: 'calendar'});
    map.connect("calendar/:id", {controller: 'viewport', action: 'calendar'});
    
    map.connect("twitter", {controller: 'viewport', action: 'twitter'});
    map.connect("twitterfind", {controller: 'viewport', action: 'twitterfind'});
    
    map.connect("skills", {controller: 'viewport', action: 'skills'});
    
    map.connect("skills/:skill", {controller: 'viewport', action: 'users'});
    map.connect("skills/:skill/:id", {controller: 'viewport', action: 'users'});
    
    map.connect("map", {controller: 'viewport', action: 'map'});
    
    map.connect("vote", {controller: 'viewport', action: 'vote'});
    
    map.connect("gps", {controller: 'viewport', action: 'gps'});
    map.connect("gps/:coords", {controller: 'viewport', action: 'gps'});
    
    map.connect("g/:coords", {controller: 'viewport', action: 'coords'});

});