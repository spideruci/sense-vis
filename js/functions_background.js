function onSelect(d) {
  var search_term = d.State;
  console.log(search_term);
  var node = svg.selectAll(".cell");
  var selected = node.filter(function (d,i) {
    return d.name == search_term;
  });
  selected.each(function(d) {
    zoom(d);
    displayFile(d, function(str) {

      return atob(str).replace(/\n/g, "<br/>");
      //return str1.replace(/\t/g, "&nbsp;");
    });
  });
}

function setPalette(num){
  color_palette = colors(num);
}

function getColor(key){
  if(key == null) return color_palette[0];
  if(!(key in color_hash)) color_hash[key] = (_next_idx++)%color_palette.length;
  return color_palette[color_hash[key]];
}

function searchFile() {
  var search_term = d3.select("#search").property('value');
  console.log(search_term);
  var node = svg.selectAll(".cell");
  var selected = node.filter(function (d,i) {
    return d.name == search_term;
  });
  selected.each(function(d) {
    zoom(d);
    displayFile(d, function(str) {

      return atob(str).replace(/\n/g, "<br/>");
      //return str1.replace(/\t/g, "&nbsp;");
    });
  });

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
  api_url = 'https://api.github.com/repos/'+user+'/'+repo;

  d3.json(api_url+"?"+ o_str, function(error, repo) {
    if(error) { console.log(error); return; }
    cur_repo = repo;

    d3.json(api_url+"/branches/" + repo.default_branch +"?"+ o_str, function(error, data) {
      if(error) {
        console.log(error);
        return;
      }
      cur_branch = data;
      d3.json(api_url+ "/git/trees/"+data.commit.sha+"?recursive=1&" + o_str, function(error, data) {
        if(error) {
          console.log(error);
          return;
        }
        var root = parseData(data.tree);
        //console.log(data);
        //setPalette(data.tree.length);
        update(root);
      });
    });
  });
}

function size(d) {
  return d.size;
}

function count(d) {
  return 1;
}

function escape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function parseData(data) {
  var nNode=0;
  var root = {};
  root.children = [];
  for(var i =0; i < data.length;i++){
    var current = root.children;
    var steps = data[i].path.split('/');
    var steps_len = steps.length;
    for(var j = 0 ; j < steps_len;j++) {
      var step = steps[j];
      if(j == steps_len - 1) {
        current.push({name:step, size:data[i].size, url:data[i].url, path:data[i].path});
        break;
      }
      current = current.select(function(v){return v.name == step;});
      if(current.children == null) ++nNode;
      current.children =  current.children || [];
      current = current.children;
    }
  }
  //console.log(nNode, data.length);
  setPalette(nNode);
  return root;
}
