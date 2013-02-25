define(['jquery', 'underscore', 'module'], function($, _, module) {

  /* == Awesootup definition ================================================ */

  /* Constructor */
  function Awesootup(modules) {
    this.modules = modules;

    if (this.modules.length == 0) {
      this.cur_module = null;
    } else {
      this.cur_module = this.modules[0];
    }
  }

  /* Method: Return the current module */
  Awesootup.prototype.get_cur_module = function() {
    return this.cur_module;
  };

  /* Method: Return the previous module */
  Awesootup.prototype.get_prev_module = function() {
    var prev = null;
    var that = this;
    _.each(this.modules, function(element, index) {
      if ((element === this.cur_module) && (index > 0)) {
        prev = that.modules[index - 1];
      }
    });
    return prev;
  };

  /* Method: Return the next module */
  Awesootup.prototype.get_next_module = function() {
    var next = null;
    var that = this;
    _.each(this.modules, function(element, index) {
      if ((element === this.cur_module) && (index < (that.modules.length-1))) {
        next = that.modules[index + 1];
      }
    });
    return next;
  };

  Awesootup.prototype.back = function() {
    var prev_module = this.get_prev_module();
    if (!(prev_module === null)) {
      this.cur_module = prev_module;
    }
  };

  Awesootup.prototype.next = function() {
    var next_module = this.get_next_module();
    if (!(next_module === null)) {
      this.cur_module = next_module;
    }
  };

  Awesootup.prototype.restart = function() {
    if (this.modules.length == 0) {
      this.cur_module = null;
    } else {
      this.cur_module = this.modules[0];
    }
  };


  /* Usage */
  //
  // var bootstrap_module = new Module('bootstrap',
  //     'Bootstrap the gentoo setup', 'bootstrap', [], []);
  //
  // var grub2_module = new Module('grub2',
  //     'Grub2 Setup', 'bootloader', ['bootstrap'], []);
  //
  // var fbcondecor_module = new Module('fbcondecor',
  //     'Framebuffer decorations', ['bootloader'], []);
  //
  // var my_awesootup = new Awesootup(
  //     [bootstrap_module, grub2_module, fbcondecor_module]);
  //
  // my_awesootup.get_cur_module();  // returns: bootstrap_module
  // my_awesootup.get_prev_module(); // returns: null
  // my_awesootup.get_next_module(); // returns: grub2_module
  //
  // my_awesootup.back();            // cur_module === bootstrap_module
  // my_awesootup.next();            // cur_module === grub2_module
  // my_awesootup.get_cur_module();  // returns: grub2_module
  //
  // my_awesootup.back();            // cur_module === bootstrap_module
  // my_awesootup.next();            // cur_module === grub2_module
  // my_awesootup.get_cur_module();  // returns: grub2_module
  // my_awesootup.get_prev_module(); // returns: bootstrap_module
  // my_awesootup.get_next_module(); // returns: fbcondecor_module
  //
  // my_awesootup.next();            // cur_module === fbcondecor_module
  // my_awesootup.get_cur_module();  // returns: fbcondecor_module
  // my_awesootup.get_prev_module(); // returns: grub2_module
  // my_awesootup.get_next_module(); // returns: null
  //
  // my_awesootup.restart();         // cur_module === bootstrap_module

});
