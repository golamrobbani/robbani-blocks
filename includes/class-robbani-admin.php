<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class RobbaniAdmin
{

    public function __construct()
    {
       
        add_action('admin_menu', array($this, 'add_menu_page'));
        add_action('wp_ajax_save_eb_admin_options', [$this, 'rb_save_blocks']);
        register_activation_hook(ROBBANI_BLOCKS_FILE, array($this, 'activate'));
    }


    public function add_menu_page()
    {
        add_menu_page(
            __('Robbani Blocks', 'robbani-blocks'),
            __('Robbani Blocks', 'robbani-blocks'),
            'delete_user',
            'robbani-blocks',
            array($this, 'menu_page_display'),
            ROBBANI_BLOCKS_ADMIN_URL . 'assets/images/eb-icon-21x21.svg',
            100
        );
    }

    public function menu_page_display()
    {
        include ROBBANI_BLOCKS_DIR_PATH . 'includes/menu-page-display.php';
    }

    public function activate()
    {
        update_option('robbani_all_blocks', RBBlocks::get_default_blocks());
    }

    public function rb_save_blocks()
    {
        if (!wp_verify_nonce($_POST['_wpnonce'], 'rb-save-admin-options')) {
            die('Security check');
        } else {
            update_option('robbani_all_blocks', $_POST['all_blocks']);
        }
        die();
    }

    /**
     * Get the version number
     */
    public static function get_version($path)
    {
        if (defined('RB_DEV') && RB_DEV === true) {
            return filemtime($path);
        } else {
            return ROBBANI_BLOCKS_VERSION;
        }
    }
}