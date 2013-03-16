define([
], function () {


  /* == Logger export ======================================================= */

  return {
    error: function (msg, throw_exc) {
      console.log("[ERROR] " + msg);
      if (throw_exc) {
        throw msg
      }
      return false;
    },
    warning: function (msg) {
      console.log("[WARNING] " + msg);
    },
    info: function (msg) {
      console.log("[INFO] " + msg);
    }
  }

});
