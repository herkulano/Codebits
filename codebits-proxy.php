<?php

// THIS SCRIPT IS BASED ON:
// 
// Script: Simple PHP Proxy: Get external HTML, JSON and more!
//
// *Version: 1.6, Last updated: 1/24/2009*
// 
// Project Home - http://benalman.com/projects/php-simple-proxy/
// GitHub       - http://github.com/cowboy/php-simple-proxy/
// Source       - http://github.com/cowboy/php-simple-proxy/raw/master/ba-simple-proxy.php
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/

ini_set('display_errors', 'On');

// Allow for XmlHTTPRequest with Cross-Domain
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: x-requested-with');
header('Access-Control-Max-Age: 86400');
header('Access-Control-Allow-Credentials: true');  
header('Cache-Control: no-cache');  
header('Pragma: no-cache');
  
// Generate appropriate content-type header.
header('Content-type: application/json');

$url = 'https://services.sapo.pt/Codebits/' . $_POST['url'];

$ch = curl_init( $url );

foreach($_POST as $key => $value) {
  if($key != 'url'){
    $post[$key] = $value;
  }
}
curl_setopt( $ch, CURLOPT_POST, true );
curl_setopt( $ch, CURLOPT_POSTFIELDS, $post );

curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

$contents = curl_exec( $ch );

curl_close( $ch );

$toarr = preg_match_all('/Codebits\/session/', $url, $arr );

if ( $toarr > 0 ) {
  $json = array(json_decode($contents));
  print json_encode($json);
}
else {
  print $contents;
}
  

?>