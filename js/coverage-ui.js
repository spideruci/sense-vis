var userName = d3.select('#user').property('value');
var repoName = d3.select('#repo').property('value');
var spider = {};

var fetcher = new CoverageDataFetcher();
fetcher.fetch(repoName, function(data) {
  d3.select('#testcases').html("");
  if(data === null) {
    d3.select('#testcases').html("<big>NO TEST DATA AVAILABLE</big>");
    return;
  }

  console.log(data);
  var coverage = new Coverage(data);
  var testcount = coverage.getTestCount();
  var tests = coverage.getTestNames();
  console.log("tests");
  console.log(tests);
  var testCaseDivs = d3.select('#testcases').selectAll('div').data(tests)
  .enter().append('div')
  .attr('class', 'test');
  // .attr('id', function(d, i) {
  //   return i;
  // })

  function styleTestResults(testcasedivs) {
    testcasedivs.style('background', function(d, i) {
      var isTestFailing = coverage.doesTestFail(i);
      if(isTestFailing) {
        return 'lightpink';
      } else {
        return 'lightgreen';
      }
    });
  }

  function styleTestsLiveness(testcasedivs) {
    testcasedivs.html("");

    testcasedivs.append("span")
      .attr('class', function(d, i) {
        if(!coverage.isTestLive(i)) {
          return "glyphicon glyphicon-pause";
        }
        return "glyphicon glyphicon-play";
      })
      .attr("aria-hidden","true");
    testcasedivs.append("span")
      .text(function(d, i) {
        return "  " + i + ") "  + d;
      });
    /*testcasedivs.append("span")
      .text(function(d, i) {
        return i + ') ' + d;
      });*/
  }

  styleTestResults(testCaseDivs);
  styleTestsLiveness(testCaseDivs);

  // click is liveness
  testCaseDivs.on('click', function(d, i) {
    var isLive = coverage.isTestLive(i);

    if(isLive) {
      coverage.killTest(i);
    } else {
      coverage.reviveTest(i);
    }
    styleTestsLiveness(testCaseDivs);

  });

  // dlbclick is test-result
  testCaseDivs.on('dblclick', function(d, i) {
    var isFailing = coverage.doesTestFail(i);

    if(isFailing) {
      coverage.makeTestPass(i);
    } else {
      coverage.makeTestFail(i);
    }
    styleTestResults(testCaseDivs);

  });

  spider.coverage = coverage;

});
