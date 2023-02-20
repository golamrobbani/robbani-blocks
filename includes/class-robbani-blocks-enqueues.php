<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class RobbaniBlocksEnqueue
{

    public function __construct()
    {
        add_action('admin_init', array($this, 'enqueue_styles'));
        add_action('admin_init', array($this, 'enqueue_scripts'));

        //Localize for both frontend and backend
        add_action('init', array($this, 'localize_enqueue_scripts'));

        add_action('admin_init', array($this, 'fronend_backend_assets'));
        add_action('wp_enqueue_scripts', array($this, 'fronend_backend_assets'));
    }

    public function enqueue_scripts()
    {


        global $pagenow;

        /**
         * For Essential Blocks Admin Settings Page
         */
        // if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'robbani-blocks') {
        //     wp_enqueue_script(
        //         ROBBANI_BLOCKS_NAME . '-admin',
        //         ROBBANI_BLOCKS_ADMIN_URL . 'assets/js/robbani-blocks.js',
        //         array('jquery', ROBBANI_BLOCKS_NAME . '-swal'),
        //         ROBBANI_BLOCKS_VERSION,
        //         true
        //     );
        //     wp_enqueue_script(
        //         ROBBANI_BLOCKS_NAME . '-swal',
        //         ROBBANI_BLOCKS_ADMIN_URL . 'assets/js/sweetalert.min.js',
        //         array('jquery'),
        //         ROBBANI_BLOCKS_VERSION,
        //         true
        //     );
        //     wp_enqueue_script(
        //         ROBBANI_BLOCKS_NAME . '-admin-blocks',
        //         ROBBANI_BLOCKS_ADMIN_URL . 'admin/index.js',
        //         array('wp-i18n', 'wp-element', 'wp-hooks', 'wp-util', 'wp-components'),
        //         ROBBANI_BLOCKS_VERSION,
        //         true
        //     );
        //     wp_localize_script(ROBBANI_BLOCKS_NAME . '-admin-blocks', 'RobbaniBlocksAdmin', array(
        //         'all_blocks' => RBBlocks::get_blocks(),
        //         'ajax_url' => admin_url('admin-ajax.php'),
        //         'nonce' => wp_create_nonce('rb-save-admin-options'),
        //     ));
        // }

        /**
         * Only for Blocks Pages
         */
        if ($pagenow == 'post-new.php' || $pagenow == 'post.php' || $pagenow == 'site-editor.php') {
          
            // wp_register_script(
            //     'robbani-blocks-slickjs',
            //     ROBBANI_BLOCKS_ADMIN_URL . 'assets/js/slick.min.js',
            //     array('jquery'),
            //     ROBBANI_BLOCKS_VERSION,
            //     true
            // );


            $controls_dependencies = include_once ROBBANI_BLOCKS_DIR_PATH . 'controls/dist/index.asset.php';
            $controls_dependencies['dependencies'][] = ROBBANI_BLOCKS_NAME . '-blocks-localize';
            wp_register_script(
                "robbani-blocks-controls-util",
                ROBBANI_BLOCKS_ADMIN_URL . 'controls/dist/index.js',
                $controls_dependencies['dependencies'],
                $controls_dependencies['version'],
                true
            );


            /**
             * Combined All Block Dependencies
             */
            $blocks_dependencies = include_once ROBBANI_BLOCKS_DIR_PATH . 'dist/index.asset.php';
            $blocks_dependencies_thirdparty = array(
                'robbani-blocks-controls-util',
                // 'robbani-blocks-slickjs'
            );
            $blocks_dependencies_marged = array_merge(
                $blocks_dependencies['dependencies'],
                $blocks_dependencies_thirdparty
            );

            /**
             * Register All Block Dependencies
             */
            wp_register_script(
                'robbani-blocks-editor-script',
                ROBBANI_BLOCKS_ADMIN_URL . 'dist/index.js',
                $blocks_dependencies_marged,
                $blocks_dependencies['version'],
                true
            );

            /**
             * Blocks Enable Disable JS
             */
            // $enabledisable_dependencies = include_once ROBBANI_BLOCKS_DIR_PATH . 'lib/enable-disable-blocks/index.asset.php';
            // $enabledisable_dependencies['dependencies'][] = ROBBANI_BLOCKS_NAME . '-blocks-localize';
            // $enabledisable_dependencies['dependencies'][] = 'robbani-blocks-editor-script';
            // wp_enqueue_script(
            //     "essential-blocks-enable-disable",
            //     ROBBANI_BLOCKS_ADMIN_URL . 'lib/enable-disable-blocks/index.js',
            //     $enabledisable_dependencies['dependencies'],
            //     $enabledisable_dependencies['version'],
            //     true
            // );
        }
    }

    public function enqueue_styles()
    {
        //Admin General CSS for Admin page design
        wp_enqueue_style(
            ROBBANI_BLOCKS_NAME,
            ROBBANI_BLOCKS_ADMIN_URL . 'assets/css/admin.css',
            array(),
            ROBBANI_BLOCKS_VERSION,
            'all'
        );

        // global $pagenow;
        // if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'robbani-blocks') {
        //     //Admin General CSS for Admin page design
        //     wp_enqueue_style(
        //         ROBBANI_BLOCKS_NAME,
        //         ROBBANI_BLOCKS_ADMIN_URL . 'assets/css/admin.css',
        //         array(),
        //         ROBBANI_BLOCKS_VERSION,
        //         'all'
        //     );

        //     //Admin Page custom css
        //     wp_enqueue_style(
        //         ROBBANI_BLOCKS_NAME . '-admin',
        //         ROBBANI_BLOCKS_ADMIN_URL . 'admin/style.css',
        //         array(),
        //         ROBBANI_BLOCKS_VERSION,
        //         'all'
        //     );
        // }
        
    }


    public function fronend_backend_assets()
    {

        //Blocks Common Style from Dist
        wp_register_style(
            'robbani-blocks-frontend-style',
            ROBBANI_BLOCKS_ADMIN_URL . 'dist/style.css',
            array(),
            RobbaniAdmin::get_version(ROBBANI_BLOCKS_DIR_PATH . 'dist/style.css'),
            'all'
        );

        // wp_register_style(
        //     'rb-fontawesome-admin',
        //     ROBBANI_BLOCKS_ADMIN_URL . 'assets/css/font-awesome5.css',
        //     array(),
        //     ROBBANI_BLOCKS_VERSION,
        //     'all'
        // );

        
    }

    public function localize_enqueue_scripts()
    {
        wp_enqueue_script(
            ROBBANI_BLOCKS_NAME . '-blocks-localize',
            ROBBANI_BLOCKS_ADMIN_URL . 'assets/js/rb-blocks-localize.js',
            array(),
            ROBBANI_BLOCKS_VERSION,
            false
        );

        global $pagenow;

        if ($pagenow == 'post-new.php' || $pagenow == 'post.php') {
            wp_localize_script(ROBBANI_BLOCKS_NAME . '-blocks-localize', 'eb_conditional_localize', array(
                'editor_type' => 'edit-post'
            ));
        } else if ($pagenow == 'site-editor.php') {
            wp_localize_script(ROBBANI_BLOCKS_NAME . '-blocks-localize', 'eb_conditional_localize', array(
                'editor_type' => 'edit-site'
            ));
        }

        wp_localize_script(ROBBANI_BLOCKS_NAME . '-blocks-localize', 'RobbaniBlocksLocalize', array(
            'rb_plugins_url' => ROBBANI_BLOCKS_URL,
            'rb_wp_version' => ROBBANI_BLOCKS_WP_VERSION,
            'rb_admin_url' => get_admin_url(),
            'rest_rootURL' => get_rest_url(),
            'enabled_blocks' => RBBlocks::get_blocks(),
            
        ));
    }
}
