define([
  'jquery', 'tocify', 'sugar'
], function ($) {

  // Table-of-contents
  $("#toc").tocify({
    selectors: "h2,h3,h4,h5,h6"
  });

});
