function zoomOut() {
  zoom(root);
}

function update (data) {
  svg.selectAll("g").remove();
  node = root = data;

  var nodes = treemap.nodes(root)
  .filter(function(d) { return !d.children; });

  var cell = svg.selectAll("g")
  .data(nodes);

  cell.exit().remove();

  cell.enter().append("svg:g");

  cell
  .attr("class", "cell")
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
  .on("click", function(d) {


    if(d3.event.altKey){
      return zoom(node.parent);
    }

    if(d==root || d==node) return zoom(d);

    while(node != d.parent) d = d.parent;
    return zoom(d);
  })
  .on("dblclick", function(d) {
    console.log("Double Clicked");
    showDetails(d);
    //zoom(d);
  })
  .on("contextmenu", function(d) {
    console.log("Double Clicked");
    //zoom(d);
    displayFile(d, function(str) {
      return atob(str.replace(/\s/g, '')).replace(/\n/g, "<br/>");
    });
    d3.event.preventDefault();
  });


  var filesToNumbers = {};
  var gradient = cell.append("svg:defs")
    .append("svg:radialGradient")
    .attr("id", function(d,i) {
      filesToNumbers[d.path] = i;
      return "grad" + i.toString() ; })
    .attr("fx","50%")
    .attr("fy","50%")
    .attr("r","100%");
    //.attr("fx","50%")
    //.attr("fy","50%");
  console.log(filesToNumbers);

  /*gradient.append("svg:stop")
    .attr("offset","0%")
    .attr("stop-color",function(d) { return color(d.parent.name); });*/

  gradient.append("svg:stop")
    .attr("id", function(d,i) {
      filesToNumbers[d.path] = i;
      return "stop" + i.toString() ; })
    .attr("offset","0%")
    .attr("stop-color","#cccccc");

  gradient.append("svg:stop")
    .attr("offset","70%")
    .attr("stop-color",function(d) { return getColor(d.parent.path); });

  cell.append("svg:rect")
  .attr("width", function(d) { return d.dx ; })
  .attr("height", function(d) { return d.dy ; })
  .attr("id",function(d) { return d.path ; } )
  .style("fill", function(d,i) {
    var gradientURL = "url(#grad" + i.toString() + ')';
    return gradientURL;
  });

  cell.append("svg:text")
  .attr("x", function(d) { return d.dx / 2; })
  .attr("y", function(d) { return d.dy / 2; })
  .attr("dy", ".35em")
  .attr("text-anchor", "middle")
  .text(function(d) { return d.name; })
  .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });

  d3.select(window).on("click", function() { zoom(root); });

  // Section: Filling the AutoComplete Array
  var all_files = svg.selectAll(".cell");
  //console.log("All Files:\n");
  //console.log(all_files);
  var filesLength = 0;
  all_files.each(function(d,i) {
    optArray[i] = d.name;
    filesLength++;
  });
  while(optArray.length > filesLength) {
    optArray.pop();
  }
  //\Section

  // Section: Filling the D3 AutoComplete Array
  keysArray = [];
  for(var i=0; i<optArray.length; ++i){
    var obj = {};
    obj['State'] = optArray[i];
    keysArray.push(obj);
  }
  mc.keys(keysArray);
  //\Section

  zoom(root);
  showCommitsOntheMap(filesToNumbers);

}

function zoom(d) {
  deleteDetails();
  d3.select("#dir").text(d.path);

  var kx = w / d.dx, ky = h / d.dy;
  x.domain([d.x, d.x + d.dx]);
  y.domain([d.y, d.y + d.dy]);

  var t = svg.selectAll("g.cell").transition()
  //.duration(d3.event.altKey ? 7500 : 750)
  .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

  t.select("rect")
  .attr("width", function(d) { return kx * d.dx ; })
  .attr("height", function(d) { return ky * d.dy ; })

  t.select("text")
  .attr("x", function(d) { return kx * d.dx / 2; })
  .attr("y", function(d) { return ky * d.dy / 2; })
  .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

  node = d;
  if(d3.event !=null) d3.event.stopPropagation();

  if(d.children==null){
    showDetails(d);
    displayFile(d, function(str) {
      return atob(str.replace(/\s/g, '')).replace(/\n/g, "<br/>");
    });
  }
  else deleteDetails();
}

function showDetails(d){

  var margin = 10;
  var g = svg.append("g")
    .attr("id","detail");

  var panel_commits = g.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", w/2 - margin)
    .attr("height", h/2 - margin)
    .attr("style","fill:black;fill-opacity:0.5")
    .on("click", function(d) {
      if(d3.event !=null) d3.event.stopPropagation();
    });

  var text_commits = g.append("foreignObject")
    .attr("x","10")
    .attr("y","10")
    .attr("width", w/2 - margin)
    .attr("height", h/2 - margin)
    .append("xhtml:body")
    .style("background-color","transparent")
    .on("click", function(d) {
      if(d3.event !=null) d3.event.stopPropagation();

    });

  var panel_src = g.append("rect")
    .attr("x", w/2 + margin)
    .attr("y", 10)
    .attr("width", w/2 - margin*2)
    .attr("height", h - margin*2)
    .attr("style","fill:black;fill-opacity:0.5")
    .on("click", function(d) {
      if(d3.event !=null) d3.event.stopPropagation();

    });

  var text_src = g.append("foreignObject")
    .attr("x", w/2 + margin)
    .attr("y","10")
    .attr("width", w/2 - margin*2)
    .attr("height", h - margin*2)
    .append("xhtml:body")
    .on("click", function(d) {
      if(d3.event !=null) d3.event.stopPropagation();
    //.attr("overflow", "scroll");
    });

  //var file = new Gh3.File(null, gh3_user, gh3_repo.name, gh3_repo.default_branch);
  //file.path = d.path;

  d3.json(d.url+"?"+o_str,function(err, res) {
    if(err) { throw "outch ..." }
      //console.log(SyntaxHighlighter.brushes);
    var brush = new SyntaxHighlighter.brushes.Java(),
    html;
    brush.init({ toolbar: false });
    html = brush.getHtml(atob(res.content.replace(/\s/g,'')));
    text_src
          //.append("xhtml:pre")
          .append("xhtml:div")
          .style("font-size", "5px")
          .attr("align","left")
          .style("overflow", "hidden;scroll")
          .html(html)
          //.attr("x", 10)
          //.attr("dy", "1.2em")
          //.attr("class","log")
          //.style("color", "#00ff00")
          //.style("font-size", "5px")
          //.text(html); //BASE64 decoder is needed here.
    //console.log(window.atob( unescape(encodeURIComponent(res.content))));
  });
  d3.json(api_url+"/commits?path="+encodeURIComponent(d.path)+"&sha="+cur_branch.name+"&"+o_str,function(err, res) {
    if(err) { throw "outch ..." }
    res.forEach(function (c) {
      text_commits.append("xhtml:p")
      .attr("align","left")

          //.attr("x", 10)
          .attr("dy", "1.2em")
          .style("font-size", "12px")
          //.attr("class","log")
          .style("color", "#00ff00")
          //.attr("width", w/2)
          .text(c.commit.committer.date +' '+ c.author.login +' '+ c.commit.message );
    });
  });

/*
  file.fetchContent(function (err, res) {
    if(err) { throw "outch ..." }
    text_src.append("xhtml:pre")
          //.attr("x", 10)
          .attr("dy", "1.2em")
          //.attr("class","log")
          .style("color", "#00ff00")
          .style("font-size", "5px")
          .text(file.getRawContent());
          console.log(file);
  });

  file.fetchCommits(function (err, res) {
    if(err) { throw "outch ..." }
    file.eachCommit(function (commit) {
      text_commits.append("xhtml:p")
          //.attr("x", 10)
          .attr("dy", "1.2em")
          .style("font-size", "15px")
          //.attr("class","log")
          .style("color", "#00ff00")
          //.attr("width", w/2)
          .text(commit.date +' '+ commit.author.name +' '+ commit.message );

    });

  });
*/
}

function deleteDetails(d){
  svg.select("#detail").remove();
}

function showCommitsOntheMap(filesToNumbers){
  console.log(filesToNumbers);
  var commits = {};
  //read all commits
  d3.json(api_url+"/commits?"+o_str,function(error, data) {
      if(error) {
        console.log(error);
        return;
      }
      //for all commits
      data.forEach(function(e, idx) {
        if(idx > 5) return;
        //read each commit
        d3.json(e.url+"?"+o_str,function(error, data) {
          if(error) {
            console.log(error);
            return;
          }
          //for single commit
          data.files.forEach(function(e) {
            d3.select(escape("#"+e.filename))
              ;
            //  .style("fill", function(d){return d3.rgb(this.style.fill).brighter(0.5);});
            //console.log(e.filename);
            var fileNo = filesToNumbers[e.filename];
            //var radialDef = d3.select("#grad"+fileNo.toString());
            var stop = d3.select("#stop"+fileNo.toString());
            var curStopColor = stop.attr("stop-color");
            console.log(curStopColor);
            stop.transition().duration(1000).attr("stop-color",function(d){
                            return d3.rgb(curStopColor).brighter(3);
            });


          });

          //console.log(commits);
          /*
          for( key in commits) {
            d3.select(escape("#"+key))
            .transition().duration(1000)
            .style("fill", function(d){return d3.rgb(this.style.fill).brighter(commits[key]);});
          }
          */

        });

      });
  //makeItShine(commits);
  });
}

function makeItShine(d){

  console.log(d, Object.keys(d));

  for(var k in d) {
    //d3.select(escape("#"+key))
    //.transition().duration(1000)
    //.style("fill", function(d){return d3.rgb(this.style.fill).brighter(d[key]);});
    console.log(k);
  }

}
