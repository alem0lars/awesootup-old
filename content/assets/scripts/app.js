requirejs.config({

  // By default load any module IDs from js/lib
  baseUrl: 'assets/scripts/lib',

  // If the module ID starts with "app", load it from the "js/app" dir.
  // "paths" config is relative to the baseUrl, and never includes a ".js"
  // extension since the paths config could be for a directory.
  paths: {
    app: '../app'
  },

  shim: {

    'jquery': { deps: [], exports: '$' },
    'jquery-plugins/jquery-cookie': ['jquery'],
    'jquery-plugins/jquery-event-move': ['jquery'],
    'jquery-plugins/jquery-event-swipe': ['jquery'],
    'jquery-plugins/jquery-offcanvas': ['jquery'],
    'jquery-plugins/jquery-placeholder': ['jquery'],

    'sugar': [],
    'store': [],
    'jit': ['jquery'],

    'foundation/foundation-modernizr': ['jquery'],
    'foundation/foundation-accordion': ['jquery'],
    'foundation/foundation-alerts': ['jquery'],
    'foundation/foundation-buttons': ['jquery'],
    'foundation/foundation-clearing': ['jquery'],
    'foundation/foundation-forms': ['jquery'],
    'foundation/foundation-joyride': ['jquery'],
    'foundation/foundation-magellan': ['jquery'],
    'foundation/foundation-mediaQueryToggle': ['jquery'],
    'foundation/foundation-navigation': ['jquery'],
    'foundation/foundation-orbit': ['jquery'],
    'foundation/foundation-reveal': ['jquery'],
    'foundation/foundation-tabs': ['jquery'],
    'foundation/foundation-tooltips': ['jquery'],
    'foundation/foundation-topbar': ['jquery'],
    'foundation/foundation': ['jquery']

  }
});

function get_requirejs_modules() {
  var modules = [

    // jQuery requires
    'jquery',
    'jquery-plugins/jquery-cookie',
    'jquery-plugins/jquery-event-move',
    'jquery-plugins/jquery-event-swipe',
    'jquery-plugins/jquery-offcanvas',
    'jquery-plugins/jquery-placeholder',

    // Other libs requires
    'sugar',
    'store',
    'jit',

    // Zurb-Foundation requires
    'foundation/foundation-modernizr',
    'foundation/foundation-accordion',
    'foundation/foundation-alerts',
    'foundation/foundation-buttons',
    'foundation/foundation-clearing',
    'foundation/foundation-forms',
    'foundation/foundation-joyride',
    'foundation/foundation-magellan',
    'foundation/foundation-mediaQueryToggle',
    'foundation/foundation-navigation',
    'foundation/foundation-orbit',
    'foundation/foundation-reveal',
    'foundation/foundation-tabs',
    'foundation/foundation-tooltips',
    'foundation/foundation-topbar',
    'foundation/foundation',

    // App - Generic - requires
    'app/logger',
    'app/moving',
    'app/awesootup-module',
    'app/awesootup',
    'app/awesootup-widget',
    'app/modules-manager',
    'app/awesootups-manager',
  ];

  function on_page(name, module_name) {
    if ((name == window.location.pathname) ||
        (("/" + name) == window.location.pathname) ||
        ((name + ".html") == window.location.pathname) ||
        (("/" + name + ".html") == window.location.pathname)) {
      modules.push(module_name);
    }
  }

  on_page('index', 'app/pages/page-index');
  on_page('awesootup', 'app/pages/page-awesootup');

  return modules;
}

requirejs(get_requirejs_modules());
