requirejs.config({
  // By default load any module IDs from js/lib
  baseUrl: 'assets/scripts/lib',
  // except, if the module ID starts with "app", load it from the "js/app" dir.
  // "paths" config is relative to the baseUrl, and never includes a ".js"
  // extension since the paths config could be for a directory.
  paths: {
    app: '../app'
  },

  shim: {

    'jquery': { deps: [], exports: '$' },
    'jquery-plugins/jquery-cookie'            : ['jquery'],
    'jquery-plugins/jquery-event-move'        : ['jquery'],
    'jquery-plugins/jquery-event-swipe'       : ['jquery'],
    'jquery-plugins/jquery-offcanvas'         : ['jquery'],
    'jquery-plugins/jquery-placeholder'       : ['jquery'],

    'sugar'                                   : [],

    'foundation/foundation-modernizr'         : ['jquery'],
    'foundation/foundation-accordion'         : ['jquery'],
    'foundation/foundation-alerts'            : ['jquery'],
    'foundation/foundation-buttons'           : ['jquery'],
    'foundation/foundation-clearing'          : ['jquery'],
    'foundation/foundation-forms'             : ['jquery'],
    'foundation/foundation-joyride'           : ['jquery'],
    'foundation/foundation-magellan'          : ['jquery'],
    'foundation/foundation-mediaQueryToggle'  : ['jquery'],
    'foundation/foundation-navigation'        : ['jquery'],
    'foundation/foundation-orbit'             : ['jquery'],
    'foundation/foundation-reveal'            : ['jquery'],
    'foundation/foundation-tabs'              : ['jquery'],
    'foundation/foundation-tooltips'          : ['jquery'],
    'foundation/foundation-topbar'            : ['jquery'],
    'foundation/foundation'                   : ['jquery']

  }
});

requirejs([

  // jQuery requires
  'jquery',
  'jquery-plugins/jquery-cookie',
  'jquery-plugins/jquery-event-move',
  'jquery-plugins/jquery-event-swipe',
  'jquery-plugins/jquery-offcanvas',
  'jquery-plugins/jquery-placeholder',

  // Other libs requires
  'sugar',

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

  // App requires
  'app/logger',
  'app/moving',
  'app/awesootup-module',
  'app/awesootup',
  'app/modules-manager',
  'app/awesootups-manager'

]);
