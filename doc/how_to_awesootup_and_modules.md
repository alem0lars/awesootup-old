
# Awesootup #

## Usage Examples ##

    var author = {
      'name': 'Alessandro Molari',
      'email': 'molari.alessandro@gmail.com',
      'website': 'http://molarialessandro.info'
    };

    var bootstrap_module = new Module('bootstrap',
        'Bootstrap the gentoo setup', 'bootstrap', [], [], author);

    var grub2_module = new Module('grub2',
        'Grub2 Setup', 'bootloader', ['bootstrap'], [], author);

    var fbcondecor_module = new Module('fbcondecor',
        'Framebuffer decorations', ['bootloader'], [], author);

    var my_awesootup = new Awesootup(
        [bootstrap_module, grub2_module, fbcondecor_module], author);

    my_awesootup.get_cur_module();  // returns: bootstrap_module
    my_awesootup.get_prev_module(); // returns: null
    my_awesootup.get_next_module(); // returns: grub2_module

    my_awesootup.back();            // cur_module === bootstrap_module
    my_awesootup.next();            // cur_module === grub2_module
    my_awesootup.get_cur_module();  // returns: grub2_module

    my_awesootup.back();            // cur_module === bootstrap_module
    my_awesootup.next();            // cur_module === grub2_module
    my_awesootup.get_cur_module();  // returns: grub2_module
    my_awesootup.get_prev_module(); // returns: bootstrap_module
    my_awesootup.get_next_module(); // returns: fbcondecor_module

    my_awesootup.next();            // cur_module === fbcondecor_module
    my_awesootup.get_cur_module();  // returns: fbcondecor_module
    my_awesootup.get_prev_module(); // returns: grub2_module
    my_awesootup.get_next_module(); // returns: null

    my_awesootup.restart();         // cur_module === bootstrap_module

## Testing Code ##

    awesootup = require('app/awesootup');
    awesootup_module = require('app/awesootup-module');
    author = {name:'Alessandro Molari', email:'molari.alessandro@gmail.com', website:'http:molarialessandro.info'};

    a = awesootup_module.create_module("A", "A Module", "a", [], ["z"], author);
    b = awesootup_module.create_module("B", "B Module", "b", ["a"], [], author);
    c = awesootup_module.create_module("C", "C Module", "c", ["a"], [], author);
    z = awesootup_module.create_module("Z", "Z Module", "z", [], [], author);
    awesootup.create_awesootup("My Guide", "This guide is beautiful", [a,b,c,z], author);


# Module #

## Usage Examples ##

    var author = {
      'name': 'Alessandro Molari',
      'email': 'molari.alessandro@gmail.com',
      'website': 'http://molarialessandro.info'
    };

    var grub2_module = new AwesootupModule('grub2', 'Grub2 Setup', 'bootloader',
        ['bootstrap'], ['fbcondecor'], author);

    grub2_module.get_name();       // returns: 'grub2'
    grub2_module.get_desc();       // returns: 'Grub2 Setup'
    grub2_module.get_provides();   // returns: 'bootloader'
    grub2_module.get_uri();        // returns: '/guide/modules/grub2.html'
    grub2_module.get_pre_reqs();   // returns: ['bootstrap']
    grub2_module.get_post_reqs();  // returns: ['fbcondecor']
