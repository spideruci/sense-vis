  d3.select(".Tab1").on('click',function(d,i){

    d3.select('#SeeSoftView').html("");
    d3.select("#TreemapSpaceOuter").style("display","");
    d3.select('#SeeSoftView').html("");
    d3.selectAll("li")
      .attr("class"," ");
    var className = d3.select(this).attr("class");
    console.log(className);
    d3.select("#"+className).attr("class","active");
    if(d3.event !=null) d3.event.stopPropagation();

  });

  var c_id = '';
  var c_secret = '';
  var o_str = 'client_id='+c_id+'&client_secret='+c_secret;
  var displayCounter = 0;
  var currentFile = 0;
  var keys = [];

  var mc = autocomplete(document.getElementById('test'))
    .keys(keys)
    .dataField("State")
    .placeHolder("Search files")
    .width(960)
    .height(500)
    .onSelected(onSelect)
    .render();

  var optArray = [];
  $(function () {
    $("#search").autocomplete({
      source: optArray
    });
  });

  var margin = {top: 0, right: 0, bottom: 0, left: 0},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;
  var w = width,
  h = height,
  x = d3.scale.linear().range([0, w]),
  y = d3.scale.linear().range([0, h]);

  var color_palette;
  var color_hash = {};

  var _next_idx=0;

  var treemap = d3.layout.treemap()
    .round(false)
    .size([w, h])
    .sticky(false)
    .value(function(d) { return d.size; });

  var svg = d3.select("#TreemapSpace").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g");

  var offline = false;

  if(offline) {
    d3.selectAll("#updateButton").on("click", getData_offline);
  }
  else {
    d3.selectAll("#updateButton").on("click", getData);
  }

  d3.selectAll("#searchButton").on("click", searchFile);
  //d3.selectAll("#zoomRestoreButton").on("click", zoomOut);

  var api_url;
  var cur_repo;
  var cur_branch;


  Array.prototype.select = function(closure){
    for(var n = 0; n < this.length; n++) {
      if(closure(this[n])){
        return this[n];
      }
    }
    return null;
  };
