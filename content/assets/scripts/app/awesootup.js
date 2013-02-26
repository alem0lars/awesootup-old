define(['jquery', 'app/logger', 'sugar'], function($, logger) {

  /* == Awesootup definition ================================================ */

  /* { Utility functions */

  function find_tree(tree, node_value) {
    if ((tree['value'] == node_value) || (node_value == null)) {
      return tree;
    } else {
      var found_tree = null;
      tree['children'].each(function (child) {
        var found_tree_tmp = find_tree(child, node_value);
        if (found_tree_tmp != null) {
          found_tree = found_tree_tmp;
        }
      });
      return found_tree;
    }
  }

  function add_node(tree, parent, node_value) {
    if (!Object.has(tree, 'children')) {
      tree['children'] = [];
    }

    if (!Object.has(tree, 'value') || (parent == null)) {
      tree['value'] = node_value;
    } else {
      var parent_tree = find_tree(tree, parent);
      parent_tree['children'].add({'value': node_value, 'children': []});
    }
  }

  function remove_node(tree, node_value) {
    tree['children'].each(function(child) {
      if (child['value'] == node_value) {
        tree['children'].remove(child);
      }
      remove_node(child, node_value);
    });
  }

  function normalize_modules(modules) {
    if (Object.isObject(modules)) {
      if (!validate_modules_from_tree(modules)) {
        logger.error("Can't build an Awesootup because the modules " +
            "object is an incorrect Object", true);
      }
      return modules;
    } else {
      if (!Object.isArray(modules)) {
        logger.error("Can't build an Awesootup because the modules " +
            "object incorrect: expecting one of Object or Array", true);
      }
      return convert_modules_to_tree(modules);
    }
  }

  function validate_modules_from_tree(modules) {
    if (!Object.has(modules, 'value')) {
      return false;
    } else if (!Object.has(modules, 'children')) {
      return false;
    } else {
      var valid = true;
      modules['children'].each(function(child) {
        valid = valid && validate_modules_from_tree(child);
      });
      return valid;
    }
  }

  function convert_modules_to_tree(modules) {
    var tree = {};
    var table = [];

    /* { Utility functions */

    var is_in_tree = function(reqs) {
      var sat = true;
      reqs.each(function(req) {
        table.each(function(row) {
          if (row['node'].get_provides() == req) {
            sat = sat && row['in_tree']
          }
        });
      });
      return sat;
    };

    var update_satisfied_by = function() {
      // Clear sat_by for each row in the table
      table.each(function(row) { row['sat_by'] = []; });

      // Compute the new sat_by for each row in the table
      table.each(function(row_i) {
        row_i['pre_reqs'].union(row_i['pre_reqs_direct']).each(
            function(pre_req) {
              table.each(function(row_j) {
                if ((pre_req == row_j['node'].get_provides()) &&
                    row_i['in_tree']) {
                  row_j['sat_by'].add(row_i);
                }
              });
            }
        );
      });
    };

    var find_satisfied_by = function(req) {
      var row_for_req = table.find(function(row) {
        return (req == row['node'].get_provides())
      });
      return row_for_req['sat_by'].isEmpty() ?
          row_for_req :
          row_for_req['sat_by'][0];
    };

    var table_is_in_tree = function() {
      return (table.find(function(row) {
        return row['in_tree'] == false
      }) == null);
    };

    /* } */

    /* { Build the table from modules */

    modules.each(function(mod) {
      table.add({
        'node': mod,
        'pre_reqs': Object.clone(mod.get_pre_reqs(), true), // deep clone
        'pre_reqs_direct': [],
        'sat_by': [],
        'in_tree': false
      });
    });

    modules.each(function(mod) {
      mod.get_post_reqs().each(function(post_req) {
        var found_provider = table.find(function(row) {
          return row['node'].get_provides() == post_req
        });
        found_provider['pre_reqs_direct'].add(mod.get_provides());
      });
    });

    /* } */

    /* { Build the tree from table */
    console.log("-- Table --");
    console.log(table);
    console.log("-----------");
    while(!table_is_in_tree()) {
      table.each(function(row) {
        if (is_in_tree(row['pre_reqs']) && is_in_tree(row['pre_reqs_direct'])) {
          if(row['pre_reqs'].isEmpty() && row['pre_reqs_direct'].isEmpty()) {
            add_node(tree, null, row['node']);
            row['in_tree'] = true;
          } else {
            // The current node can be added to the tree because it has all
            // dependencies satisfied

            // Add the current node as a child of each node which is direct
            // pre-requirement
            row['pre_reqs_direct'].each(function(pre_req_direct) {
              // Return the first node which provides the pre_req_direct
              var req_provider = table.find(function(r) {
                return (r['node'].get_provides() == pre_req_direct);
              });
              add_node(tree, req_provider['node'], row['node']);
              row['in_tree'] = true;
            });
            update_satisfied_by();

            // For each node which is a normal pre-requirement (non direct),
            // add the current node as a child to the first node which satisfies
            // the pre-requirement node if the pre-requirement is already
            // satisfied by previous satisfied pre-requirement nodes
            // (both direct and non-direct)
            row['pre_reqs'].each(function(pre_req) {
              var req_provider = find_satisfied_by(pre_req);
              add_node(tree, req_provider['node'], row['node']);
              row['in_tree'] = true;
            });
            update_satisfied_by();

          }
        } else {
          // row['node'] hasn't all dependencies satisfied => skip
        }
      });
    }

    /* } */

    return tree;
  }

  /* } */

  /* Constructor */
  function Awesootup(name, desc, modules, author) {

    this.name = name;

    this.desc = desc;

    this.modules = normalize_modules(modules);

    if (this.modules.length == 0) {
      this.cur_module = null;
    } else {
      this.cur_module = this.modules[0];
    }

    if (!(Object.isObject(author))) {
      this.author = {
        'name': (author == undefined) ? null : author.toString(),
        'email': null,
        'website': null
      };
    } else {
      this.author = author;
      if (!(Object.has(author, 'name'))) { this.author['name'] = null; }
      if (!(Object.has(author, 'email'))) { this.author['email'] = null; }
      if (!(Object.has(author, 'name'))) { this.author['name'] = null; }
    }
  }

  /* Method: Return the awesootup name */
  Awesootup.prototype.get_name = function() {
    return this.name;
  };

  /* Method: Return the awesootup description */
  Awesootup.prototype.get_desc = function() {
    return this.desc;
  };

  /* Method: Return the awesootup author */
  Awesootup.prototype.get_author = function() {
    return this.author;
  };

  /* Method: Return the current module */
  Awesootup.prototype.get_cur_module = function() {
    return this.cur_module;
  };

  /* Method: Return the previous module */
  Awesootup.prototype.get_prev_module = function() {
    var prev = null;
    var that = this;

    this.modules.each(function(index) {
      if ((that.modules[index] === this.cur_module) && (index > 0)) {
        prev = that.modules[index - 1];
      }
    });

    return prev;
  };

  /* Method: Return the next module */
  Awesootup.prototype.get_next_module = function() {
    var next = null;
    var that = this;

    this.modules.each(function(index) {
      if ((that.modules[index] === this.cur_module) &&
          (index < (that.modules.length-1))) {
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

  Awesootup.prototype.add_module = function(parent, mod) {
    add_node(this.modules, parent, mod);
  };

  Awesootup.prototype.remove_module = function(mod) {
    remove_node(this.modules, mod);
  };

  /* == Module export ======================================================= */

  return {
    create_awesootup: function(name, desc, modules, author) {
      return new Awesootup(name, desc, modules, author);
    }
  };

});


/* == Usage examples ======================================================== */

// var author = {
//   'name': 'Alessandro Molari',
//   'email': 'molari.alessandro@gmail.com',
//   'website': 'http://molarialessandro.info'
// };
//
// var bootstrap_module = new Module('bootstrap',
//     'Bootstrap the gentoo setup', 'bootstrap', [], [], author);
//
// var grub2_module = new Module('grub2',
//     'Grub2 Setup', 'bootloader', ['bootstrap'], [], author);
//
// var fbcondecor_module = new Module('fbcondecor',
//     'Framebuffer decorations', ['bootloader'], [], author);
//
// var my_awesootup = new Awesootup(
//     [bootstrap_module, grub2_module, fbcondecor_module], author);
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
