<?php
  // Add Scripts
  function exam_add_scripts(){
    // Add Main CSS
    wp_enqueue_style('exam-main-style', plugins_url(). '/example/css/style.css');
    // Add Main JS
    wp_enqueue_script('exam-main-script', plugins_url(). '/example/js/main.js');

    // Add Google Script
    wp_register_script('google', 'https://apis.google.com/js/platform.js');
    wp_enqueue_script('google');
  }

  add_action('wp_enqueue_scripts', 'exam_add_scripts');