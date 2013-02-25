define(['jquery', 'sugar', 'app/modules-manager'], function(
    $, sugar, modules_manager) {

  var standalone_awesootup = null;
  var popular_awesootups = [];

  var avail_awesootups_data = <%= get_avail_awesootups_as_json() %>;

  avail_awesootups_data.each(function(awesootup_data) {
    awesootup_data
  }


  /* == AwesootupsManager export ============================================ */

  return {
      standalone_awesootup: standalone_awesootup,
      popular_awesootups: popular_awesootups
  };

});
