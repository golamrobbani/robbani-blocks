<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

class RobbaniBlocks
{

	protected static $_instance = null;

	private $enabled_blocks = [];

	public static function get_instance()
	{
		if (is_null(self::$_instance)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function __construct()
	{
		//load admin file
		$this->load_admin_dependencies();

		// Fetch Enabled Blocks if not than Default Block List
		$this->enabled_blocks = RBBlocks::enabled_blocks();
		// Load All Block Files
		$this->load_block_dependencies();

		// Load Admin Panel
		new RobbaniAdmin();

		//Enqueues
		new RobbaniBlocksEnqueue();
	}

	private function load_admin_dependencies()
	{
		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/class-robbani-admin.php';
		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/class-robbani-blocks-enqueues.php';
		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/blocks-default.php';
		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/class-helpers.php';
	}
	private function load_block_dependencies()
	{
		if ($this->is_block_enabled('advanced_heading')) {
			require_once ROBBANI_BLOCKS_DIR_PATH . '/blocks/advanced-heading.php';
		}

		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/category.php';
		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/font-loader.php';
		require_once ROBBANI_BLOCKS_DIR_PATH . '/includes/post-meta.php';
	}

	private function is_block_enabled($key = null)
	{
		if (is_null($key)) {
			return true;
		}
		if (isset($this->enabled_blocks[$key])) {
			return true;
		}
		return false;
	}

	public static function get_block_register_path($folder_name)
	{

		if (ROBBANI_BLOCKS_WP_VERSION < 5.8) {
			return 'robbani-blocks/' . $folder_name;
		} else {
			return ROBBANI_BLOCKS_DIR_PATH . 'blocks/' . $folder_name;
		}
	}
}
