define(['jquery', 'sugar', 'app/awesootup', 'app/modules-manager'], function(
    $, sugar, awesootup, modules_manager) {

  var cur_awesootup = null;

  var standalone_awesootup = null;

  var popular_awesootups = [];

  var avail_awesootups_data = <%= get_avail_awesootups_as_json() %>;

  avail_awesootups_data.each(function(awesootup_data) {
    var found_modules = [];

    awesootup_data['modules'].each(function(module_name) {
      found_modules.add(modules_manager.avail_modules.find(function(elem) {
        return elem.get_name() == module_name;
      }));
    });

    var created_awesootup = awesootup.create_awesootup(
        awesootup_data['name'], awesootup_data['desc'], found_modules,
        awesootup_data['author']);

    if (awesootup_data['is_standalone']) {
      standalone_awesootup = created_awesootup;
      cur_awesootup = standalone_awesootup;
    } else {
      popular_awesootups.add(created_awesootup);
    }
  });

  console.log(cur_awesootup);
  console.log(standalone_awesootup);
  console.log(popular_awesootups);

  /* == AwesootupsManager export ============================================ */

  return {
      standalone_awesootup: standalone_awesootup,
      popular_awesootups: popular_awesootups,
      set_cur_awesootup: function(new_cur_awesootup) {
        cur_awesootup = new_cur_awesootup;
      },
      get_cur_awesootup: function() {
        return cur_awesootup;
      }
  };

});
