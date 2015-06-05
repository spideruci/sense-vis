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