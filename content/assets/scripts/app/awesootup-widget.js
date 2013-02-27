define(['jquery', 'jit', 'sugar'], function($) {

  function AwesootupWidget(awesootup) {

    this.awesootup = awesootup;

    this.container_id = this.awesootup.get_name()
        .normalize().underscore().dasherize() + "-widget";

    this.$container = $('<div/>', {
      id: this.container_id,
      "class": "awesootup-widget"
    });

    this.node_width = 80;
    this.node_height = 40;

    this.graph = null;
  }

  AwesootupWidget.prototype.initGraph = function() {
    var that = this;
    this.graph = new $jit.ST({
      /* The graph container */
      'injectInto': that.container_id,
      levelsToShow: that.get_levels_to_show(),
      offsetX: parseInt(928-that.node_width, 10) / 2,
      /* Node options */
      Node: {
        type: 'none',
        width: that.node_width,
        height: that.node_height
      },
      Edge: {
        type: 'bezier',
        lineWidth: 2,
        color: "#000000"
      },
      /* Enable navigation */
      Navigation: {
        enable: true,
        panning: true
      },
      levelDistance: 32,
      /* Called when a node has been created */
      onCreateLabel: function(label, node){
        label.id = node.id;
        label.innerHTML =
            "<div class=\"node-title-wrp has-tip\" data-width=\"210\" title=\"" + node['data']['desc'] + "\">" +
              "<strong class=\"node-title\">" + node['name'] + "</strong>" +
            "</div>";
      },
      onPlaceLabel: function(domElement){
        var style = domElement.style;
        style.display = '';
        style.cursor = 'pointer';
      }
    });

    // Get the graph data
    var graph_data = this.get_graph_data();

    // Load the graph data into the graph
    this.graph.loadJSON(graph_data);
  };

  AwesootupWidget.prototype.get_levels_to_show = function() {
    var compute_levels = function(tree, cur_levels, max_levels) {

      cur_levels = cur_levels + 1;
      if (cur_levels > max_levels) {
        max_levels = cur_levels;
      }

      tree['children'].each(function(child) {
        var child_levels = compute_levels(child, cur_levels, max_levels);

        if (child_levels > max_levels) {
          max_levels = child_levels;
        }
      });

      return max_levels;
    };

    return compute_levels(this.awesootup.get_modules_tree(), 0, 0);
  };

  AwesootupWidget.prototype.get_graph_data = function() {
    var result = {};
    var that = this;

    var compute_graph_data = function(tree, graph_data) {
      graph_data['id'] = that.container_id + "-" + tree['value'].get_name();
      graph_data['name'] = tree['value'].get_name();
      graph_data['data'] = {desc: tree['value'].get_desc()};
      graph_data['children'] = [];
      tree['children'].each(function(child) {
        var graph_data_child = {};
        compute_graph_data(child, graph_data_child);
        graph_data['children'].add(graph_data_child);
      });
    };

    compute_graph_data(this.awesootup.get_modules_tree(), result);

    return result;
  };

  AwesootupWidget.prototype.draw = function($parent) {
    var that = this;

    // TODO
    $('canvas').resize(function() {
      console.log("POSTANTE");
      that.redraw($parent);
    });

    that.redraw($parent);
  };

  AwesootupWidget.prototype.redraw = function($parent) {
    // Remove the widget
    this.$container.remove();

    // Add the widget
    $parent.append(this.$container);

    // Initialize the graph
    this.initGraph();

    // Compute node positions and layout
    this.graph.compute();

    // Make a translation of the tree
    //this.graph.geom.translate(new $jit.Complex(-200, 0), "current");

    // Emulate a click on the root node
    this.graph.onClick(this.graph.root);
  };


  /* == Module export ======================================================= */

  return {
    create_awesootup_widget: function(awesootup) {
      return new AwesootupWidget(awesootup);
    }
  };

});
