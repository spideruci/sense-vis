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

function SourceCoverage(data) {
  this.sourceName = data.source.fullName;
  this.fLine = data.source.firstLine;
  this.lLine = data.source.lastLine;
  this.tests = data.activatingTests;
  this.testStmtMatrix = data.testStmtMatrix;
  this.coverableLines = data.coverableLines;
}

SourceCoverage.prototype.isLineCovered = function(lineNumber, testsLiveness) {
  var useTestsLiveness = true;

  if(testsLiveness === null 
    || testsLiveness == undefined 
    || testsLiveness.length === 0) {
    useTestsLiveness = false;
  }

  var sourceIndex = lineNumber - this.fLine;
  if(sourceIndex < 0) {
    return false;
  }

  for(var i = 0; i < this.testStmtMatrix.length; i += 1) {
    var testIndex = this.tests[i];
    var isTestLive = !useTestsLiveness ? true : testsLiveness[testIndex];
    if(!isTestLive) {
      continue;
    }
    var stmtCoverages = this.testStmtMatrix[i];
    var isLineCovered = stmtCoverages[sourceIndex];
    if(isLineCovered) {
      return true;
    }
  }
  return false;
};

SourceCoverage.prototype.canExecuteLine = function(lineNumber) {
  var index = lineNumber - this.fLine;
  if(index < 0) {
    return false;
  }

  var canExec = coverableLines[index];
  return canExec;
};