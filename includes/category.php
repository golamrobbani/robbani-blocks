<?php

function rb_block_categories($categories, $post)
{
    $rb_category = array(
        'slug' => 'robbani-blocks',
        'title' => __('Robbani Blocks', 'robbani-blocks'),
    );
    $modifiedCategory[0] = $rb_category;
    $modifiedCategory = array_merge($modifiedCategory, $categories);
    return $modifiedCategory;
}

// Block Categories
if (version_compare(get_bloginfo('version'), '5.8', '>=')) {
    add_filter('block_categories_all', 'rb_block_categories', 10, 2);
} else {
    add_filter('block_categories', 'rb_block_categories', 10, 2);
}