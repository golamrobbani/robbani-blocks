<?php

/**
 * Plugin Name: Robbani Blocks Study
 * Plugin URI: https://robbani-blocks.com
 * Description: The Multiple Blocks Library for WordPress Gutenberg editor.
 * Author: golamrobbani29
 * Author URI: https://golamrobbani29.com
 * Version: 1.0.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: robbani-blocks
 *
 * @package Robbani_Blocks
 */
if (!defined('ABSPATH')) {
    exit;
}

// Define Constant
define('ROBBANI_BLOCKS_VERSION', '3.3.0');
define('ROBBANI_BLOCKS_NAME', 'essensial-blocks');
define('ROBBANI_BLOCKS_DIR_PATH', plugin_dir_path(__FILE__));
define('ROBBANI_BLOCKS_ADMIN_URL', plugin_dir_url(__FILE__));
define('ROBBANI_BLOCKS_FILE', __FILE__);
define('ROBBANI_BLOCKS_URL', plugin_dir_url(__FILE__));
define('ROBBANI_BLOCKS_WP_VERSION', (float) get_bloginfo('version'));

if (!class_exists('RobbaniBlocks')) {
    require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/class-robbani-blocks.php';
    require_once ROBBANI_BLOCKS_DIR_PATH . '/lib/style-handler/style-handler.php';
}

RobbaniBlocks::get_instance();
