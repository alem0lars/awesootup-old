requirejs.config({
  // By default load any module IDs from js/lib
  baseUrl: 'scripts/lib',
  // except, if the module ID starts with "app", load it from the "js/app" dir.
  // "paths" config is relative to the baseUrl, and never includes a ".js"
  // extension since the paths config could be for a directory.
  paths: {
    app: '../app'
  },

  shim: {
    'jquery': {
      deps: [],
      exports: 'jquery',
      init: function (jquery) { /* No function init at the moment */
      }
    }
  }
});

requirejs([
  // jQuery requires
  'jquery',
  'jquery_plugins/jquery_cookie',
  'jquery_plugins/jquery_event_move',
  'jquery_plugins/jquery_event_swipe',
  'jquery_plugins/jquery_offcanvas',
  'jquery_plugins/jquery_placeholder',

  // Zurb-Foundation requires
  'foundation/foundation_modernizr',
  'foundation/foundation_accordion',
  'foundation/foundation_alerts',
  'foundation/foundation_buttons',
  'foundation/foundation_clearing',
  'foundation/foundation_forms',
  'foundation/foundation_joyride',
  'foundation/foundation_magellan',
  'foundation/foundation_mediaQueryToggle',
  'foundation/foundation_navigation',
  'foundation/foundation_orbit',
  'foundation/foundation_reveal',
  'foundation/foundation_tabs',
  'foundation/foundation_tooltips',
  'foundation/foundation_topbar',
  'foundation/foundation',

  // App requires (e.g. app/my_js_file)

]);

