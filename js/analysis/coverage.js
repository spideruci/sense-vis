function CoverageDataFetcher() {
}

CoverageDataFetcher.prototype.fetch = function(projectName, callback) {
  var url = 'data/' + projectName + '-cov-matrix.json';
  d3.json(url, function(error, data) {
      if(error) {
        data = null;
      }
      if(callback != null 
        && callback != undefined
        && (callback instanceof Function)) {
        callback(data);
      }
  });
};

function Coverage(data) {
  this.testsIndex = data.testsIndex;
  this.testCount = data.testCount;
  this.sources = new Array();

  console.log(data.sources);
  console.log(this.sources);

  for(var i = 0; i < data.sources.length; i += 1) {
    var element = data.sources[i];
    if(element === null || element === undefined || element.length === 0) {
      return;
    }
    var sourceCoverage = new SourceCoverage(element);
    this.sources.push(sourceCoverage);
  }

  this.testsLiveness = [];
  this.testsFailness = [];

  for(var i = 0; i < this.testCount; i += 1) {
    this.testsLiveness.push(true);
    this.testsFailness.push(false);
  }
}

Coverage.prototype.getTestNames = function() {
  console.log(this.testsIndex.length + 'names')
  return this.testsIndex;
};

Coverage.prototype.getTestName = function(index) {
  var testName = this.testsIndex[index];
  return testName;
};

Coverage.prototype.getTestCount = function() {
  return this.testCount;
};


Coverage.prototype.isTestLive = function(index) {
  if(index >= this.testCount || index < 0) return undefined;
  return this.testsLiveness[index];
};

Coverage.prototype.killTest = function(index) {
  if(index >= this.testCount || index < 0) return;
  this.testsLiveness[index] = false;
};

Coverage.prototype.reviveTest = function(index) {
  if(index >= this.testCount || index < 0) return;
  this.testsLiveness[index] = true;
};


Coverage.prototype.doesTestFail = function(index) {
  if(index >= this.testCount || index < 0) return undefined;
  return this.testsFailness[index];
};

Coverage.prototype.makeTestFail = function(index) {
  if(index >= this.testCount || index < 0) return;
  this.testsFailness[index] = true;
};

Coverage.prototype.makeTestPass = function(index) {
  if(index >= this.testCount || index < 0) return;
  this.testsFailness[index] = false;
};

Coverage.prototype.getPassFailCount = function() {
  var passCount = 0;
  var failCount = 0;
  for(var i = 0; i < this.testCount; i += 1) {
    var isTestFailing = this.testsFailness[i];
    if(isTestFailing) {
      failCount += 1;
    } else {
      passCount += 1;
    }
  }
  return [passCount, failCount];
};

Coverage.prototype.getLivePassFailCount = function() {
  var passCount = 0;
  var failCount = 0;
  for(var i = 0; i < this.testCount; i += 1) {
    var isTestLive = this.testsLiveness[i];
    if(!isTestLive) continue;
    var isTestFailing = this.testsFailness[i];
    if(isTestFailing) {
      failCount += 1;
    } else {
      passCount += 1;
    }
  }
  return [passCount, failCount];
};

Coverage.prototype.getSourceCoverage = function(sourceName) {
  var sourceCoverage = null;
  for(var i = 0; i < this.sources.length; i += 1) {
    var element = this.sources[i];
    if(element === null || element === undefined || element.length === 0) {
      continue;
    }
    if(element.sourceName === sourceName) {
      sourceCoverage = element;
      break;
    }
  }

  return sourceCoverage;
};

Coverage.prototype.getLinesSus = function(sourceName) {
  var sourceCoverage = this.getSourceCoverage(sourceName);
  if(sourceCoverage === null) return undefined;
  var livePassFail = coverage.getLivePassFailCount();
  var totalLivePass = livePassFail[0];
  var totalLiveFail = livePassFail[1];
  sourceCoverage.getPassFailOnStmt(this);
  sourceCoverage.getPassRatioAndFailRatio(totalLivePass, totalLiveFail);
  sourceCoverage.getSpiderSense(totalLivePass, totalLiveFail);
  return sourceCoverage.spiderStmts;
};

Coverage.prototype.firstAndLastLine = function(sourceName) {
  var sourceCoverage = this.getSourceCoverage(sourceName);
  if(sourceCoverage === null) return undefined;
  return [sourceCoverage.first(), sourceCoverage.last()];
};

Coverage.prototype.isLineCovered = function(sourceName, lineNumber) {
  var sourceCoverage = this.getSourceCoverage(sourceName);
  if(sourceCoverage === null) return undefined;
  return sourceCoverage.isLineCovered(lineNumber);
};

Coverage.prototype.canExecuteLine = function(sourceName, lineNumber) {
  var sourceCoverage = this.getSourceCoverage(sourceName);
  if(sourceCoverage === null) return undefined;
  return sourceCoverage.canExecuteLine(lineNumber);
};