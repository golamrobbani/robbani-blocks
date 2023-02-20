<?php

/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package essential-blocks
 */


function rb_advanced_heading_block_init()
{

	if (!function_exists('register_block_type')) {
		return;
	}

	register_block_type(
		RobbaniBlocks::get_block_register_path("advanced-heading"),
		array(
			'editor_script' => 'robbani-blocks-editor-script',
			'editor_style'    	=> ROBBANI_BLOCKS_NAME . '-editor-css',
			'render_callback' => function ($attributes, $content) {
				if (!is_admin()) {
					wp_enqueue_style('robbani-blocks-frontend-style');
				}
				return $content;
			}
		)
	);
}

add_action('init', 'rb_advanced_heading_block_init');
