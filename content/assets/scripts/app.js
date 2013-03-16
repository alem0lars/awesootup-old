requirejs.config({

  // By default load any module IDs from js/lib
  baseUrl: '/assets/scripts/lib',

  // If the module ID starts with "app", load it from the "js/app" dir.
  // "paths" config is relative to the baseUrl, and never includes a ".js"
  // extension since the paths config could be for a directory.
  paths: {
    app: '../app'
  },

  shim: {

    // jQuery shims
    'jquery': { deps: [], exports: '$' },
    'jquery-ui': ['jquery'],
    'jquery-plugins/jquery-cookie': ['jquery'],
    'jquery-plugins/jquery-event-move': ['jquery'],
    'jquery-plugins/jquery-event-swipe': ['jquery'],
    'jquery-plugins/jquery-offcanvas': ['jquery'],
    'jquery-plugins/jquery-placeholder': ['jquery'],

    // Zurb-Foundation shims
    'foundation/foundation': ['jquery'],
    'foundation/foundation-modernizr': ['foundation/foundation', 'jquery'],
    'foundation/foundation-alerts': ['foundation/foundation', 'jquery'],
    'foundation/foundation-clearing': ['foundation/foundation', 'jquery'],
    'foundation/foundation-cookie': ['foundation/foundation', 'jquery'],
    'foundation/foundation-dropdown': ['foundation/foundation', 'jquery'],
    'foundation/foundation-forms': ['foundation/foundation', 'jquery'],
    'foundation/foundation-joyride': ['foundation/foundation', 'jquery'],
    'foundation/foundation-magellan': ['foundation/foundation', 'jquery'],
    'foundation/foundation-orbit': ['foundation/foundation', 'jquery'],
    'foundation/foundation-placeholder': ['foundation/foundation', 'jquery'],
    'foundation/foundation-reveal': ['foundation/foundation', 'jquery'],
    'foundation/foundation-section': ['foundation/foundation', 'jquery'],
    'foundation/foundation-tooltips': ['foundation/foundation', 'jquery'],
    'foundation/foundation-topbar': ['foundation/foundation', 'jquery'],

    // Other libs shims
    'sugar': [],
    'store': [],
    'jit': ['jquery'],
    'tocify': ['jquery', 'jquery-ui'],
    'highlight': { deps: [], exports: 'highlight', init: function () {
      hljs.initHighlightingOnLoad();
    }}

  }
});

function get_requires() {
  var requires = [

    // jQuery requires
    'jquery',
    'jquery-plugins/jquery-cookie',
    'jquery-plugins/jquery-event-move',
    'jquery-plugins/jquery-event-swipe',
    'jquery-plugins/jquery-offcanvas',
    'jquery-plugins/jquery-placeholder',

    // Zurb-Foundation requires
    'foundation/foundation',
    'foundation/foundation-modernizr',
    'foundation/foundation-alerts',
    'foundation/foundation-clearing',
    'foundation/foundation-cookie',
    'foundation/foundation-dropdown',
    'foundation/foundation-forms',
    'foundation/foundation-joyride',
    'foundation/foundation-magellan',
    'foundation/foundation-orbit',
    'foundation/foundation-placeholder',
    'foundation/foundation-reveal',
    'foundation/foundation-section',
    'foundation/foundation-tooltips',
    'foundation/foundation-topbar',

    // Zurb-Foundation Initialization (after all zurb-foundation requires)
    'app/foundation-init',

    // Other libs requires
    'sugar',
    'store',
    'jit',

    // App - Generic - requires
    'app/logger',
    'app/moving',
    'app/awesootup-module',
    'app/awesootup',
    'app/awesootup-widget',
    'app/modules-manager',
    'app/awesootups-manager'
  ];

  /* { Utility functions */

  var on_page = function (names, required_name) {
    if (!(names instanceof Array)) {
      names = [names];
    }

    for (var idx = 0; idx < names.length; idx++) {
      var name = names[idx];

      if ((name == window.location.pathname) ||
          (("/" + name) == window.location.pathname) ||
          ((name + ".html") == window.location.pathname) ||
          (("/" + name + ".html") == window.location.pathname)) {
        requires.push(required_name);
      }
    }

    return requires;
  };

  var on_module_page = function (required_name) {
    if (new RegExp("^.+/modules/.+$", "i").test(window.location.pathname)) {
      requires.push(required_name);
    }

    return requires;
  };

  /* } */

  /* { Requires for the pages of modules */
  on_module_page('tocify');
  on_module_page('highlight');
  on_module_page('app/pages/page-module-global');
  /* } */

  /* { Requires for specific pages */
  on_page(['index', '/'], 'app/pages/page-index');
  on_page('awesootup', 'app/pages/page-awesootup');
  /* } */

  return requires;
}

requirejs(get_requires());
