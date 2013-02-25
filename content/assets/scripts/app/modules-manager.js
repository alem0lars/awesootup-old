define(['jquery', 'sugar', 'app/awesootup-module'], function(
    $, sugar, awesootup_module) {

  var avail_modules = [];

  var avail_modules_data = <%= get_avail_modules_as_json() %>;

  avail_modules_data.each(function(module_data) {
    avail_modules.add(awesootup_module.create_module(
        module_data['name'],
        module_data['desc'],
        module_data['provides'],
        module_data['pre_reqs'],
        module_data['post_reqs'],
        module_data['author']));
  });


  /* == ModulesManager export =============================================== */

  return {
      avail_modules: avail_modules,
      get_avail_module: function(name) {
        return avail_modules.find(function(avail_module) {
          return avail_module['name'] == name;
        });
      }
  };

});
