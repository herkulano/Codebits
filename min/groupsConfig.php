<?php
/**
 * Groups configuration for default Minify implementation
 * @package Minify
 */

/** 
 * You may wish to use the Minify URI Builder app to suggest
 * changes. http://yourdomain/min/builder/
 *
 * See http://code.google.com/p/minify/wiki/CustomSource for other ideas
 **/
return array(
    'jsA' => array(
		'//lib/ext-touch.js', 
		'//lib/Const.js',
		'//lib/TwitterProxy.js',
		'//lib/CodebitsProxy.js',
		
		'//app/routes.js',
		'//app/app.js'),
		
	'jsB' => array(
		'//app/views/Viewport.js',
		
		'//app/views/NavBar.js',
		
		'//app/views/Home.js',
		'//app/views/Login.js',
		'//app/views/SessionList.js',
		'//app/views/SessionDetail.js',
		'//app/views/ProjectList.js',
		'//app/views/ProjectDetail.js',
		'//app/views/CalendarList.js',
		'//app/views/Twitter.js',
		'//app/views/UserSkillList.js',
		'//app/views/UserList.js',
		'//app/views/UserDetail.js',
		'//app/views/Map.js',
		
		'//app/models/Session.js',
		'//app/models/SessionDetail.js',
		'//app/models/Speaker.js',
		'//app/models/Project.js',
		'//app/models/ProjectDetail.js',
		'//app/models/Calendar.js',
		'//app/models/Tweet.js',
		'//app/models/User.js',
		'//app/models/UserDetail.js',
		
		'//app/controllers/viewport.js'
		)
);