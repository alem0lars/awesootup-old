define(['jquery', 'app/logger', 'jit', 'sugar'], function ($, logger) {

  function AwesootupWidget(awesootup) {

    this.awesootup = awesootup;

    this.container_id = this.awesootup.get_name()
        .normalize().underscore().dasherize() + "-widget";

    this.$container = $('<div/>', {
      id: this.container_id,
      "class": "awesootup-widget"
    });

    // The node width. It should be kept in sync with the one set in the css
    this.node_width = 80;
    // The node height. It should be kept in sync with the one set in the css
    this.node_height = 40;

    // The graph is shifted of this.graph_shift_horizontal pixels from the left
    // of the container
    // INF: It should be greater to the sum of eventual borders, shadows, etc..
    this.graph_shift_horiz = 24;

    this.min_top = 0;
    this.max_top = 0;
    this.canvas_height = 0;

    this.graph = null;

    this.drawed = false;
  }

  AwesootupWidget.prototype.initGraph = function () {
    if (this.drawed) {
      logger.error("Already drawed the " + this.awesootup.get_name() +
          " widget into " + this.$container.attr('id') + ".\n" +
          "If you want to redraw the widget you should call #redraw() instead.",
          true);
    } else {
      var that = this;

      this.graph = new $jit.ST({
        /* The graph container */
        'injectInto': that.container_id,
        /* Animation duration */
        duration: 0,
        /* Levels of node indentation to show */
        levelsToShow: that.get_levels_to_show(),
        /* The offset for the root node from the center of the canvas */
        offsetX: (that.$container.width() -
            (that.node_width + that.graph_shift_horiz)) / 2,
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
        levelDistance: 48,
        /* Called when a node has been created */
        onCreateLabel: function (label, node) {
          label.id = node.id;
          label.innerHTML =
              "<div class=\"node-title-wrp has-tip\" data-width=\"210\" title=\""
                  + node['data']['desc'] + "\">" +
                  "<strong class=\"node-title\">" + node['name'] + "</strong>" +
                  "</div>";
        },
        onPlaceLabel: function (domElement) {
          var top = parseInt(domElement.style.top, 10);

          if (top < that.min_top) {
            that.min_top = top;
          }
          if (top > that.max_top) {
            that.max_top = top;
          }
        },
        onComplete: function() {
          var height = (that.min_top < 0) ?
              (that.max_top - that.min_top) :
              (that.max_top + that.min_top);

          if (that.canvas_height != height) {
            that.canvas_height = height;
            that.$container.height(height);
            that.graph.canvas.resize(null, height);
            that.redraw();
          }
        }
      });

      // Get the graph data
      var graph_data = this.get_graph_data();

      // Load the graph data into the graph
      this.graph.loadJSON(graph_data);
    }

  };

  AwesootupWidget.prototype.get_levels_to_show = function () {
    var compute_levels = function (tree, cur_levels, max_levels) {

      cur_levels = cur_levels + 1;
      if (cur_levels > max_levels) {
        max_levels = cur_levels;
      }

      tree['children'].each(function (child) {
        var child_levels = compute_levels(child, cur_levels, max_levels);

        if (child_levels > max_levels) {
          max_levels = child_levels;
        }
      });

      return max_levels;
    };

    return compute_levels(this.awesootup.get_modules_tree(), 0, 0);
  };

  AwesootupWidget.prototype.get_graph_data = function () {
    var result = {};
    var that = this;

    var compute_graph_data = function (tree, graph_data) {
      graph_data['id'] = that.container_id + "-" + tree['value'].get_name();
      graph_data['name'] = tree['value'].get_name();
      graph_data['data'] = {desc: tree['value'].get_desc()};
      graph_data['children'] = [];
      tree['children'].each(function (child) {
        graph_data['children'].add(compute_graph_data(child, {}));
      });
      return graph_data;
    };

    compute_graph_data(this.awesootup.get_modules_tree(), result);

    return result;
  };

  AwesootupWidget.prototype.draw = function ($parent) {
    var that = this;

    // Remove the widget
    this.$container.remove();

    // Add the widget
    $parent.append(this.$container);

    // Initialize the graph
    this.initGraph();

    $(window).resize(function() {
      var container_width = that.$container.width();

      that.graph.canvas.resize(container_width, null);
      that.graph.config.offsetX =
          (container_width - (that.node_width + that.graph_shift_horiz)) / 2;

      that.redraw();
    });

    // Compute node positions and layout
    this.graph.compute();

    // Emulate a click on the root node
    this.graph.onClick(this.graph.root);

    // The widget has been drawed
    this.drawed = true;
  };

  AwesootupWidget.prototype.redraw = function () {
    this.graph.refresh();
  };


  /* == Module export ======================================================= */

  return {
    create_awesootup_widget: function (awesootup) {
      return new AwesootupWidget(awesootup);
    }
  };

});
