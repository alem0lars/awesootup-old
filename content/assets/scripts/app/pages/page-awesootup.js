define([
  'jquery', 'app/awesootups-manager',
  'app/awesootup-widget', 'sugar'
], function ($, awesootups_manager, awesootup_widget) {

  function setup_awesootup_widget() {
    var cur_awesootup_widget_id = "cur-awesootup-widget";

    var cur_awesootup_widget = awesootup_widget
        .create_awesootup_widget(awesootups_manager.get_cur_awesootup());

    cur_awesootup_widget.draw($("#" + cur_awesootup_widget_id));
  }

  function show_awesootup_name() {
    var cur_awesootup_name_id = "cur-awesootup-name";

    $("#" + cur_awesootup_name_id).html(
        awesootups_manager.get_cur_awesootup().get_name());
  }

  function show_awesootup_description() {
    var cur_awesootup_desc_id = "cur-awesootup-description";

    $("<div/>", {
      text: awesootups_manager.get_cur_awesootup().get_desc()
    }).appendTo($("#" + cur_awesootup_desc_id));
  }

  function show_awesootup_author() {
    var cur_awesootup_author_id = "cur-awesootup-author",
        cur_awesootup_author = awesootups_manager.get_cur_awesootup().get_author();

    var $div = $("<div/>");

    if (!(cur_awesootup_author['name'] == null)) {
      $("<p/>", {
        text: cur_awesootup_author['name']
      }).appendTo($div);
    }

    if (!(cur_awesootup_author['email'] == null)) {
      $("<a/>", {
        href: "mailto:" + cur_awesootup_author['email'],
        text: cur_awesootup_author['email']
      }).appendTo($("<p/>").appendTo($div));
    }

    if (!(cur_awesootup_author['website'] == null)) {
      $("<a/>", {
        href: cur_awesootup_author['website'],
        text: cur_awesootup_author['website']
      }).appendTo($("<p/>").appendTo($div));
    }

    $div.appendTo($("#" + cur_awesootup_author_id));
  }

  function setup_awesootup_actions() {

    // { Setup Action Start

    var action_start_id = "action-start",
        action_start_text;

    if (awesootups_manager.get_cur_awesootup().get_prev_module() == null) {
      action_start_text = "Start";
    } else {
      action_start_text = "Continue";
    }

    $("<i/>", {
      "class": "general foundicon-right-arrow",
      text: " " + action_start_text
    }).appendTo($("#" + action_start_id));

    $("#" + action_start_id).click(function(e) {
      e.preventDefault();

      window.open(
          awesootups_manager.get_cur_awesootup().get_cur_module().get_uri(),
          "_self");
    });

    // }

    // { Setup Action Restart

    var action_restart_id = "action-restart";

    $("#" + action_restart_id).click(function(e) {
      e.preventDefault();

      awesootups_manager.get_cur_awesootup().restart();
      window.open(
          awesootups_manager.get_cur_awesootup().get_cur_module().get_uri(),
          "_self");
    });

    // }
  }

  $(document).ready(function () {
    show_awesootup_name();
    show_awesootup_description();
    show_awesootup_author();
    setup_awesootup_widget();
    setup_awesootup_actions();
  });

});
