define([
  'jquery', 'app/awesootups-manager',
  'app/awesootup-widget', 'sugar'
], function ($, awesootups_manager, awesootup_widget) {

  function setup_standalone_widget() {
    var standalone_tab_id = "awesootup-builder-standalone-content",
        start_id = "start-standalone-awesootup";

    var standalone_awesootup_widget = awesootup_widget
        .create_awesootup_widget(awesootups_manager.standalone_awesootup);

    standalone_awesootup_widget.draw($("#" + standalone_tab_id));

    $("#" + start_id).click(function(e) {
      e.preventDefault();
      awesootups_manager.set_cur_awesootup(
          awesootups_manager.standalone_awesootup);
      window.open("/awesootup.html", "_self");
    });
  }

  function setup_popular_widgets() {

  }


  $(document).ready(function () {
    setup_standalone_widget();
    setup_popular_widgets();
  });


  /* == PageIndex export ==================================================== */

  return {};

});
