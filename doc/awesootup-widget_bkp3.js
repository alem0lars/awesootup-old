define(['jquery', 'app/logger', 'd3', 'sugar'], function ($, logger) {

  function AwesootupWidget(awesootup) {

    this.awesootup = awesootup;

    this.container_id = this.awesootup.get_name()
        .normalize().underscore().dasherize() + "-widget";

    this.$container = $('<div/>', {
      id: this.container_id,
      "class": "awesootup-widget"
    });

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

    }

    var cluster = d3.layout.cluster();

    var diagonal = d3.svg.diagonal().projection(function(d) {
      return [d.y, d.x];
    });

    var width = 300, height = 400;

    var svg = d3.select("#" + this.$container.attr("id")).append("svg")
        .attr("width", width).attr("height", height)
        .attr("viewBox", "0 0 " + width + " " + height );

    var d3_data = this.tree_to_d3_data(this.awesootup.get_modules_tree());

    var nodes = cluster.nodes(d3_data),
        links = cluster.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
        .attr("r", 4.5);

    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.name; });

    //d3.select(self.frameElement).style("height", height + "px");

  };

  AwesootupWidget.prototype.tree_to_d3_data = function(tree) {
    return {
      "name": "flare",
      "children": [
        {
          "name": "analytics",
          "children": [
            {
              "name": "cluster",
              "children": [
                {"name": "AgglomerativeCluster", "size": 3938},
                {"name": "CommunityStructure", "size": 3812},
                {"name": "HierarchicalCluster", "size": 6714},
                {"name": "MergeEdge", "size": 743}
              ]
            },
            {
              "name": "graph",
              "children": [
                {"name": "BetweennessCentrality", "size": 3534},
                {"name": "LinkDistance", "size": 5731},
                {"name": "MaxFlowMinCut", "size": 7840},
                {"name": "ShortestPaths", "size": 5914},
                {"name": "SpanningTree", "size": 3416}
              ]
            },
            {
              "name": "optimization",
              "children": [
                {"name": "AspectRatioBanker", "size": 7074}
              ]
            }
          ]
        }
      ]
    }
  };

  AwesootupWidget.prototype.draw = function ($parent) {

    // Remove the widget
    this.$container.remove();

    // Add the widget
    $parent.append(this.$container);

    // Initialize the graph
    this.initGraph();

    // The widget has been drawed
    this.drawed = true;
  };

  AwesootupWidget.prototype.redraw = function () {
  };


  /* == Module export ======================================================= */

  return {
    create_awesootup_widget: function (awesootup) {
      return new AwesootupWidget(awesootup);
    }
  };

});
