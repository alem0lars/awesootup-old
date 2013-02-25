define(['jquery'], function($) {

  /* == Module definition =================================================== */

  /* Constructor */
  function Module(name, desc, provides, pre_reqs, post_reqs) {
    this.name = name;
    this.desc = desc;
    this.provides = provides;
    this.pre_reqs = pre_reqs;
    this.post_reqs = post_reqs;
  }

  /* Method: Compute and return the uri */
  Module.prototype.get_uri = function() {
    return "/guide/modules/" + this.name + ".html";
  };

  /* Method: Return the name */
  Module.prototype.get_name = function() {
    return this.name;
  };

  /* Method: Return the description */
  Module.prototype.get_desc = function() {
    return this.desc;
  };

  /* Method: Return what the module provides */
  Module.prototype.get_provides = function() {
    return this.provides;
  };

  /* Method: Return the pre-requirements */
  Module.prototype.get_pre_reqs = function() {
    return this.pre_reqs;
  };

  /* Method: Return the post-requirements */
  Module.prototype.get_post_reqs = function() {
    return this.post_reqs;
  };


  /* Usage */
  //
  // var grub2_module = new Module('grub2', 'Grub2 Setup', 'bootloader',
  //     ['bootstrap'], ['fbcondecor']);
  //
  // grub2_module.get_name(); // returns: 'grub2'
  // grub2_module.get_desc(); // returns: 'Grub2 Setup'
  // grub2_module.get_provides(); // returns: 'bootloader'
  // grub2_module.get_uri(); // returns: '/guide/modules/grub2.html'
  // grub2_module.get_pre_reqs(); // returns: ['bootstrap']
  // grub2_module.get_post_reqs(); // returns: ['fbcondecor']

});
