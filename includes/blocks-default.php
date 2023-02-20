<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class RBBlocks
{
    /**
     * Get Current Blocks
     */
    public static function get_blocks()
    {
        $all_blocks = get_option('robbani_all_blocks');
        if (empty($all_blocks)) {
            return self::get_default_blocks();
        }

        if (count(self::get_default_blocks()) > count($all_blocks)) {
            return array_merge(self::get_default_blocks(), $all_blocks);
        }

        return $all_blocks;
    }


    /**
     * Enabled Blocks
     */
    public static function enabled_blocks()
    {
        $blocks = self::get_blocks();
        $enabled_blocks = array_filter($blocks, function ($a) {
            return $a['visibility'] === "true" ? $a : false;
        });
        return $enabled_blocks;
    }

    /**
     * Default Blocks
     */
    public static function get_default_blocks()
    {
        $default_blocks = [
            'advanced_heading' => [
                'label' => __('Advanced Heading', 'robbani-blocks'),
                'value' => 'advanced_heading',
                'visibility' => 'true',
            ],
            'infobox' => [
                'label' => __('Infobox', 'robbani-blocks'),
                'value' => 'infobox',
                'visibility' => 'true',
            ],
           
        ];

        $pro_blocks = apply_filters('robbani_pro_blocks', []);
        $merged_blocks = array_merge($default_blocks, $pro_blocks);
        return $merged_blocks;
    }
}
