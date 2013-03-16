define([
  'jquery', 'app/modules-manager', 'app/awesootups-manager', 'tocify', 'sugar'
], function ($, modules_manager, awesootups_manager) {

  var regexp = /^.+\/modules\/(.+)$/i;
  var match = regexp.exec(window.location.pathname);
  var cur_module_name = match[1].replace(/\.(html|htm)/g, '');
  var cur_module_info = modules_manager.get_avail_module(cur_module_name);

  // Table-of-contents
  $("#toc").tocify({
    selectors: "h2,h3,h4,h5,h6"
  });

  // Navigation if in a awesootup
  if (!(awesootups_manager.get_cur_awesootup() == null)) {
    var $sep = $("<hr/>").insertAfter($("#main-wrp"));

    var $nav = $("<div/>", {
      id: "module-nav-wrp",
      "class": "row"
    }).insertAfter($sep);

    var $prev_wrp = $("<div/>", {
      id: "action-prev-wrp"
    }).css("float", "left").appendTo($nav);

    var $next_wrp = $("<div/>", {
      id: "action-next-wrp"
    }).css("float", "right").appendTo($nav);

    $("<div/>", {
      "class": "general foundicon-left-arrow",
      text: " Prev"
    }).appendTo($("<a/>", {
          id: "action-prev",
          href: "javascript:void(0)",
          "class": "button radius"
        }).appendTo($prev_wrp));

    $("<div/>", {
      "class": "general foundicon-right-arrow",
      text: " Next"
    }).appendTo($("<a/>", {
          id: "action-next",
          href: "javascript:void(0)",
          "class": "button radius"
        }).appendTo($next_wrp));
  }


});
