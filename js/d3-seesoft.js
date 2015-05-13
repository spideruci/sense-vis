var margin = {top: 10, right: 10, bottom: 10, left: 10},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
.size([width, height])
.sticky(false)
.value(function(d) { return d.size; });

d3.select("body").append("div")
.style("position", "relative")
.style("width", (width + margin.left + margin.right) + "px")
.style("height", (height + margin.top + margin.bottom) + "px")
.style("left", margin.left + "px")
.style("top", margin.top + "px");


function update(root){
  //bind new data
  var div = d3.select("body")
        .select("div")
        .selectAll("div")
        .data(treemap.nodes(root));
  
  div.exit().transition().duration(200).remove();
  
  div.enter().append("div")
            .attr("class", "node")
            .transition().duration(750)
            .call(position)
            .style("background", function(d) { return d.children ? color(d.name) : null; })
            .text(function(d) { return d.children ? null : d.name; });
  
  
  div.attr("class", "node")
    .transition().duration(750)
    .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; })
      .transition().duration(750);
}

d3.selectAll("#updateButton").on("click", function() {  

  var url = 'https://api.github.com/repos/'+d3.select("#user").property('value')+'/'+d3.select("#repo").property('value');
  d3.json(url+"/branches/master", function(error, data) {
    url = url + "/git/trees/"+data.commit.sha+"?recursive=1";
    d3.json(url, function(error, data) {update(parseData(data.tree));});

  });
});

function position() {
    this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }
function parseData(data) {
  var root = {};
  root.children = [];
  for(var i =0; i < data.length;i++){
    var current = root.children;
    var steps = data[i].path.split('/'); 
    for(var j = 0 ; j < steps.length;j++){
      var step = steps[j];
      if(j == steps.length-1) {
        current.push({name:step, size:data[i].size, url:data[i].url});
        break;
      }
      current = current.select(function(v){return v.name == step;});
      current.children =  current.children || [];
      current = current.children;
      }
      
  }
  return root;
}