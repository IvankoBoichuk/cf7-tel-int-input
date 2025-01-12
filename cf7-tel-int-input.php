<?php
/**
 * @wordpress-plugin
 * Plugin Name:       Contact Form 7 International Tel Input
 * Description:       Enhances input[type="tel"] fields in Contact Form 7 with international phone input functionality.
 * Version:           1.0.0
 * Author:            Ivan Boichuk
 * Author URI:        https://t.me/i_boichuk
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cf7-tel-int-input
 * Domain Path:       /languages
 */

function cf7_tel_int_input() {
    $theme_version = wp_get_theme()->get('Version');
    wp_enqueue_style( "int-tel-input", "https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.0/build/css/intlTelInput.css", array(), $theme_version );
    wp_enqueue_script( "int-tel-input", "https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.0/build/js/intlTelInput.min.js", array(), $theme_version );
    wp_enqueue_script( "imask", "https://unpkg.com/imask", array(), $theme_version );
    wp_enqueue_style( 'int-tel-style', plugins_url( '/style.css', __FILE__ ), array(), $theme_version );
    wp_enqueue_script( 'int-tel-script', plugins_url( '/script.js', __FILE__ ), array( 'int-tel-input' ), $theme_version );
}
add_action( 'wp_enqueue_scripts', 'cf7_tel_int_input', 10010 );

// Load plugin text domain for translations.
function cf7_tel_int_input_load_textdomain() {
    load_plugin_textdomain( 'cf7-tel-int-input', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'cf7_tel_int_input_load_textdomain' );
