<?php
/**
 * Plugin Name:       Advertisement Before Post
 * Plugin URI:        https://example.com/plugins/Post Highliter/
 * Description:       Show advertisement before post contenlt
 * Version:           1.0.0
 * Requires at least: 5.0
 * Requires PHP:      7.2
 * Author:            Yuliia Skorbach, Szymon Bak
 * Author URI:        
 */

function ad_before_post_admin_actions_register_menu()
{
    add_options_page("Manage advertisements before post content", "Advertisments", 'manage_options', "advertisements", "ad_before_post_admin_page");
}

add_action('admin_menu', 'ad_before_post_admin_actions_register_menu');

function ad_before_post_admin_page()
{
    global $_POST;
    $opAds = get_option('ad_before_post_ads', []);

    # delete ad 
    if (isset($_POST['ad_id']) && !empty($_POST['ad_id'])) {
        $id = $_POST['ad_id'];
        unset($opAds[$id]);
        update_option('ad_before_post_ads', $opAds);
        echo '<div class="notice notice-success isdismissible"><p>Advertisement deleted!</p></div>';
    }

    # insert new ad
    if (isset($_POST['new_ad_content'])) {
        if ($_POST['new_ad_content'] != "") {
            $ad = $_POST['new_ad_content'];
            array_push($opAds, $ad);
            update_option('ad_before_post_ads', $opAds);
            echo '<div class="notice notice-success isdismissible"><p>Advertisement added!</p></div>';
        } else {
            echo '<div class="notice notice-error isdismissible"><p>Advertisement content cannot be empty!</p></div>';
        }
    }
?>
    <div class="wrap">
        <h1>Manage advertisements</h1>
        <div>
            <h2>Current advertisements</h2>
            <?php if(empty($opAds)): ?>
                <p><bold>No advertisements added!</bold></p>
            <?php endif; ?>
            <table class="widefat">
                <thead>
                    <th>Advertisement</th>
                    <th></th>
                </thead>
                <tbody>
                    <?php foreach($opAds as $key=>$value): ?>
                        <tr>
                            <td>
                                <?= $value ?>
                            </td>
                            <td>
                                <form method="post" name="delete_ad">
                                    <input type="hidden" id="ad_id" name="ad_id" value=<?= $key ?>>
                                    <p class="submit"><input type="submit" value="Delete"></p>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div class="wrap">
            <h2>Add new advertisement</h2>
            <form name="new_ad_form" method="post">
                <p>Advertisement content</p>
                <textarea name="new_ad_content" class="ad-textarea"></textarea>
                <p class="submit"><input type="submit" value="Add advertisement"></p>
            </form>
        </div>
    </div>
<?php
}

function insert_ad_before_post_content($content) {
    $opAds = get_option('ad_before_post_ads', []);
    if (!is_single() || empty($opAds)) {
        return $content;
    }
    $random_ad = $opAds[array_rand($opAds)];
    return "<div class=\"advertisement\">" . $random_ad . "</div> " . $content;
}

add_filter('the_content', 'insert_ad_before_post_content');

function ad_before_post_register_styles()
{
    wp_register_style('ad_before_post_styles', plugins_url('/css/style.css', __FILE__));
    wp_enqueue_style('ad_before_post_styles');
}

add_action('init', 'ad_before_post_register_styles');
