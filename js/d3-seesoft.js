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


function update(root) {
  //bind new data
  var div = d3.select("body")
        .select("div")
        .selectAll("div")
        .data(treemap.nodes(root));
  
  div.exit().transition().duration(200).remove();
  
  div.enter().append("div")
            // .attr("class", "node")
            .on('click', function(d) {
              display_file(d, function(str) {
                //return atob(str).replace(/\n/g, "<br/>");
              });
            });
            // .transition().duration(750)
            // .call(position)
            // .style("background", function(d) { 
            //   return d.children ? color(d.name) : null; 
            // })
            // .text(function(d) { 
            //   return d.children ? null : d.name; 
            // });

  d3.select('body').append('pre').attr('id', 'code')

  
  div.attr("class", "node")
    .transition().duration(750)
    .call(position)
    .style("background", function(d) { 
      return d.children ? color(d.name) : null; 
    })
    .text(function(d) { 
      return d.children ? null : d.name; 
    })
    .transition().duration(750);
}

function display_file(file, decoder) {
  var codespace = d3.select('#code');
  codespace.html('');
  d3.json(file.url, function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    var coded_source = data.content;
    var source = decoder(coded_source);
    console.log(file.name);
    var source_arr = [];
    source_arr.push(source);
    codespace.data(source_arr)
      .html(function(d) { return  d; });
  });
}

var offline = false;

if(offline) {
  d3.selectAll("#updateButton").on("click", getData_offline);
}
else {
  d3.selectAll("#updateButton").on("click", getData);
}


function getData_offline() {
  var user = d3.select("#user").property('value');
  var repo = d3.select("#repo").property('value');
  var url = 'data/'+repo+'.json';

  console.log(url);
  d3.json(url, function(error, data) {
    if(error) {
      console.log(error);
      return;
    }
    var root = parseData(data.tree);
    update(root);
  });

}

function getData() {
  var user = d3.select("#user").property('value');
  var repo = d3.select("#repo").property('value');
  var url = 'https://api.github.com/repos/'+user+'/'+repo;


  d3.json(url, function(error, repo) {
    if(error) {
      console.log(error);
      return;
    }

    d3.json(url+"/branches/" + repo.default_branch, function(error, data) {
      if(error) {
        console.log(error);
        return;
      }

      console.log(data);
      url = url + "/git/trees/"+data.commit.sha+"?recursive=1";
      d3.json(url, function(error, data) {
        if(error) {
          console.log(error);
          return;
        }
        var root = parseData(data.tree);
        update(root);
      });
    });
  });
}


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
    var steps_len = steps.length;
    for(var j = 0 ; j < steps_len;j++) {
      var step = steps[j];
      if(j == steps_len - 1) {
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