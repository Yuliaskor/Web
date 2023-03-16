<?php
/*
Plugin Name: Example
Plugin URI: 
Description: Example
Version: 0.1.0
Author: Yuliia Skorbach, Szymon Bak
Author URI: 
*/

//Security
if(!defined('ABSPATH')){
    exit;
  }

// Load Scripts
require_once(plugin_dir_path(__FILE__).'/includes/example-scripts.php');

// Load Class
require_once(plugin_dir_path(__FILE__).'/includes/example-class.php');

// Register Widget
function register_examplesubs(){
    register_widget('Example_Subs_Widget');
  }
  
//Hook in function
add_action('widgets_init', 'register_examplesubs');