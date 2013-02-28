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

  function tree_to_list(tree) {
    var result = [tree['value']];

    var tree_to_list_internal = function(tree, list) {
      var cur_level_list = [];

      tree['children'].each(function(child) {
        cur_level_list.add(child['value']);
        tree_to_list_internal(child, list);
      });

      return list;
    };

    return tree_to_list_internal(tree, result);
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
        'sat_by': [],
        'in_tree': false
      });
    });

    modules.each(function(mod) {
      mod.get_post_reqs().each(function(post_req) {
        var found_provider = table.find(function(row) {
          return row['node'].get_provides() == post_req
        });
        found_provider['pre_reqs'].add(mod.get_provides());
      });
    });

    /* } */

    /* { Build the tree from table */
    while(!table_is_in_tree()) {
      table.each(function(row) {
        if(row['pre_reqs'].isEmpty()) {
          add_node(tree, null, row['node']);
          row['in_tree'] = true;
        } else if (is_in_tree(row['pre_reqs']) && !row['in_tree']) {
          // The current node can be added to the tree because it has all
          // dependencies satisfied

          // For each pre-requirement, add the current node as a child of
          // the first node which provides that requirement
          row['pre_reqs'].each(function(pre_req) {
            // Return the first node which provides the pre_req
            var req_provider = table.find(function(r) {
              return (r['node'].get_provides() == pre_req) && r['in_tree'];
            });
            add_node(tree, req_provider['node'], row['node']);
          });

          row['in_tree'] = true;
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

    this.modules_tree = normalize_modules(modules);
    this.modules_list = tree_to_list(this.modules_tree);

    if (this.modules_list.isEmpty()) {
      this.cur_module = null;
    } else {
      this.cur_module = this.modules_list[0];
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

  /* Method: Return the previous module
   * or null if the awesootup is already in the beginning */
  Awesootup.prototype.get_prev_module = function() {
    var prev = null;
    var that = this;

    this.modules_list.each(function(index) {
      if ((that.modules_list[index] === this.cur_module) && (index > 0)) {
        prev = that.modules_list[index - 1];
      }
    });

    return prev;
  };

  /* Method: Return the next module
   * or null if the awesootup is already in the end */
  Awesootup.prototype.get_next_module = function() {
    var next = null;
    var that = this;

    this.modules_list.each(function(index) {
      if ((that.modules_list[index] === this.cur_module) &&
          (index < (that.modules_list.length-1))) {
        next = that.modules_list[index + 1];
      }
    });

    return next;
  };

  /* Method: Change the current module to the previous module */
  Awesootup.prototype.back = function() {
    var prev_module = this.get_prev_module();
    if (!(prev_module === null)) {
      this.cur_module = prev_module;
    }
  };

  /* Method: Change the current module to the next module */
  Awesootup.prototype.next = function() {
    var next_module = this.get_next_module();
    if (!(next_module === null)) {
      this.cur_module = next_module;
    }
  };

  /* Method: Restart the awesootup by changing the current module */
  Awesootup.prototype.restart = function() {
    if (this.modules_list.length == 0) {
      this.cur_module = null;
    } else {
      this.cur_module = this.modules_list[0];
    }
  };

  /* Method: Add the provided module to the modules tree as a child of the
   * provided parent module
   * and reflect the changes in the modules list representation */
  Awesootup.prototype.add_module = function(parent, mod) {
    add_node(this.modules_tree, parent, mod);
    this.modules_list = tree_to_list(this.modules_tree);
  };

  /* Method: Remove the provided module from the modules tree
   * and reflect the changes in the modules list representation */
  Awesootup.prototype.remove_module = function(mod) {
    remove_node(this.modules_tree, mod);
    this.modules_list = tree_to_list(this.modules_tree);
  };

  /* Method: Find and return the module given its name */
  Awesootup.prototype.get_modules_tree = function() {
    return this.modules_tree;
  };


  /* == Module export ======================================================= */

  return {
    create_awesootup: function(name, desc, modules, author) {
      return new Awesootup(name, desc, modules, author);
    }
  };

});
