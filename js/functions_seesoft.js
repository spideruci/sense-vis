function seeSoftZoom(thresh,fileCounter) {
  var colSize = Math.floor((thresh-1)/4);
  colSize = (colSize+1) * 3;
  var colClass = "col-md-" + colSize.toString();
  var fileSelectID = '#File'+currentFile.toString();
  var codespaceOuter = d3.select('#SeeSoftView');
  var codespace = codespaceOuter.select(fileSelectID);
  var allPre = codespace.selectAll('pre');
  //console.log(thresh);
  var newFontSize = thresh.toString() +"px";
  //console.log(newFontSize);
  allPre.style("font-size",newFontSize);
  codespace.attr("class",colClass)
}

function displayFileFromTab(file, decoder,fileCounter) {
  d3.select("#TreemapSpaceOuter").style("display","none");
  currentFile = fileCounter;
  var user = d3.select("#user").property('value');
  var repo = d3.select("#repo").property('value');
  var fileURL = "https://github.com/"+user+'/'+repo+"/blob/master/"+file.path;
  var fileName = file.path;

  var tabSelector = d3.select("#Tabs");
  var contentSelector = d3.select("#TabContent");

  var fileDivID = "File" + fileCounter.toString();
  var codespaceOuter = d3.select('#SeeSoftView');
  codespaceOuter.html("");
  codespaceOuter.append("div")
    .attr("class","col-md-3")
    .attr("id",fileDivID);
  var hashFileDivID = '#' + fileDivID;
  var codespace = codespaceOuter.select(hashFileDivID);

  d3.json(file.url, function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    var coded_source = data.content;
    var source = decoder(coded_source);
    console.log(file.name);
    codespace.append("pre")
      .text("The program is: ");
    var lines = source.split("<br/>");

    var colors = ["red","green","yellow"];
    var colors = ["#F2D8D8","#CCEBCD","#F2F1D5"];
    for(var line = 0; line<lines.length; ++line){
      var lineNo = line+1;
      var lineId = "L" + fileCounter.toString() + '_'+ lineNo.toString();
      codespace.append("div")
        .attr("id",lineId)
        .append("pre")
        .text(lines[line])
        .style("font-family", "Courier")
        .style("font-size", "3px")
        .style("background-color", colors[line%3])
        .style("margin-top", "0px")
        .style("margin-bottom", "0px")
        .style("overflow", "auto");
    }

    /*for(var line = 0; line<lines.length; ++line){
      var codeLine = lines[line];
      var regex1 = new RegExp('<', 'g');
      var regex2 = new RegExp('>', 'g');
      codeLine= "<code>" + codeLine.replace(regex1,'&lt;').replace(regex2,'&gt;')+ "</code>";

      codespace.append("pre")
        //.attr("id",colors[line%3])
        .text(codeLine)
        .style("font-family", "Courier")
        //.style("background-color", colors[line%3])
        .style("margin-top", "2px")
        .style("margin-bottom", "2px")
        .style("overflow", "auto");
    }*/


    var allPre = codespace.selectAll('pre')
      .on("click", function(d,i) {
        console.log(d);
        var lineNo = i-8;
        if(lineNo<1){
          var lineId = "#L8";
        }
        else{
          var lineId = "#L" + fileCounter.toString()  + '_'+ lineNo.toString();
        }

        seeSoftZoom(16);

        //var codespace = d3.select('#SeeSoftView');
        //var allPre = codespace.selectAll('pre');
        //var slider = d3.select("zoomSlider);
        allPre.style("font-size","16px");
        $('html, body').animate({
          scrollTop: $(lineId).offset().top
        }, 300);
      })
      .on("dblclick", function(d,i) {
        var outURL = fileURL + '#L' + i.toString();
        console.log(outURL);
        window.open(outURL);
      });
  });
}

function displayFile(file, decoder) {
  d3.select("#TreemapSpaceOuter").style("display","none");
  displayCounter++;
  var fileCounter = displayCounter;
  currentFile = fileCounter;
  var user = d3.select("#user").property('value');
  var repo = d3.select("#repo").property('value');
  var fileURL = "https://github.com/"+user+'/'+repo+"/blob/master/"+file.path;
  var fileName = file.path;

  var tabSelector = d3.select("#Tabs");
  var contentSelector = d3.select("#TabContent");
  var contentID = "file" + fileCounter.toString();
  d3.selectAll("li")
    .attr("class"," ");
  var listElement = tabSelector.append("li")
    .attr("id",contentID)
    .attr("class","active")
    .append("a");
  listElement.attr("data-toggle","tab")
    .attr("class",contentID)
    .text(file.name + "  ");
    //<input id="zoomRestoreButton" type="button" value="Restore"/>
  /*listElement.append("button")
    .attr("id","X"+contentID)
    .attr("type","button")
    .attr("class","btn btn-default btn-xs")*/
  listElement.append("span")
    .attr("id","X"+contentID)
    .attr("class","glyphicon glyphicon-remove "+contentID)
    .attr("aria-hidden","true");
    //.text("value","X");
  console.log(fileURL);

  /*d3.select("#TabContent")
    .html("");
  d3.select("#TabContent")
    .append("h3")
    .text(file.path);*/
  d3.select("#X"+contentID).on('click',function(d,i){
    d3.select("#TreemapSpaceOuter").style("display","");
    var className = d3.select(this).attr("id");
    className = className.substring(1,className.length);
    d3.select("."+className).attr("class","defunct");
    d3.select("#"+className).remove();
    d3.selectAll("li").attr("class"," ");
    d3.select("#Tab1").attr("class","active");
    console.log("Reached here");
    d3.select('#SeeSoftView').html("");
  });
  d3.select("."+contentID).on('click',function(d,i){

    var className = d3.select(this).attr("class");
    if(className != "defunct") {
      console.log(className);
      d3.selectAll("li").attr("class"," ");
      d3.select("#"+className).attr("class","active");
      displayFileFromTab(file,decoder,fileCounter);
    }
  });

  var fileDivID = "File" + fileCounter.toString();
  //d3.selectAll('pre').remove();
  var codespaceOuter = d3.select('#SeeSoftView');
  codespaceOuter.html("");
  codespaceOuter.append("div")
    .attr("class","col-md-3")
    .attr("id",fileDivID);
  var hashFileDivID = '#' + fileDivID;
  var codespace = codespaceOuter.select(hashFileDivID);

  d3.json(file.url, function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    var coded_source = data.content;
    var source = decoder(coded_source);
    console.log(file.name);
    codespace.append("pre")
      .text("The program is: ");
    var lines = source.split("<br/>");

    var colors = ["red","green","yellow"];
    var colors = ["#F2D8D8","#CCEBCD","#F2F1D5"];
    for(var line = 0; line<lines.length; ++line){
      var lineNo = line+1;
      var lineId = "L" + fileCounter.toString() + '_'+ lineNo.toString();
      codespace.append("div")
        .attr("id",lineId)
        .append("pre")
        .text(lines[line])
        .style("font-family", "Courier")
        .style("font-size", "3px")
        .style("background-color", colors[line%3])
        .style("margin-top", "0px")
        .style("margin-bottom", "0px")
        .style("overflow", "auto");
    }

    /*for(var line = 0; line<lines.length; ++line){
      var codeLine = lines[line];
      var regex1 = new RegExp('<', 'g');
      var regex2 = new RegExp('>', 'g');
      codeLine= "<code>" + codeLine.replace(regex1,'&lt;').replace(regex2,'&gt;')+ "</code>";

      codespace.append("pre")
        //.attr("id",colors[line%3])
        .text(codeLine)
        .style("font-family", "Courier")
        //.style("background-color", colors[line%3])
        .style("margin-top", "2px")
        .style("margin-bottom", "2px")
        .style("overflow", "auto");
    }*/


    var allPre = codespace.selectAll('pre')
      .on("click", function(d,i) {
        console.log(d);
        var lineNo = i-8;
        if(lineNo<1){
          var lineId = "#L8";
        }
        else{
          var lineId = "#L" + fileCounter.toString()  + '_'+ lineNo.toString();
        }
        seeSoftZoom(16);
        //var codespace = d3.select('#SeeSoftView');
        //var allPre = codespace.selectAll('pre');
        //var slider = d3.select("zoomSlider);
        allPre.style("font-size","16px");
        $('html, body').animate({
          scrollTop: $(lineId).offset().top
        }, 300);
      })
      .on("dblclick", function(d,i) {
        var outURL = fileURL + '#L' + i.toString();
        console.log(outURL);
        window.open(outURL);
      });
  });
}
