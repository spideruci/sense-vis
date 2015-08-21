function SourceCoverage(data) {
  this.sourceName = data.source.fullName;
  this.fLine = data.source.firstLine;
  this.lLine = data.source.lastLine;
  this.tests = data.activatingTests;
  this.testStmtMatrix = data.testStmtMatrix;
  this.coverableLines = data.coverableLines;
  var x = this.lLine - this.fLine + 1;
  this.failOnStmt = Array.apply(null, Array(x)).map(Number.prototype.valueOf,0);
  this.passOnStmt = Array.apply(null, Array(x)).map(Number.prototype.valueOf,0);
  this.failRatio = Array.apply(null, Array(x)).map(Number.prototype.valueOf,0);
  this.passRatio = Array.apply(null, Array(x)).map(Number.prototype.valueOf,0);
  this.spiderStmts = Array.apply(null, Array(x)).map(Number.prototype.valueOf,0);
}

SourceCoverage.prototype.first = function() {
  return this.fLine;
};

SourceCoverage.prototype.last = function() {
  return this.lLine;
};

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

SourceCoverage.prototype.getPassFailOnStmt = function(coverage, testsLiveness) {

  var useTestsLiveness = true;

  if(testsLiveness === null 
    || testsLiveness == undefined 
    || testsLiveness.length === 0) {
    useTestsLiveness = false;
  }

  for(var i = 0; i < this.testStmtMatrix.length; i += 1) {
    var testIndex = this.tests[i];
    var isTestLive = !useTestsLiveness ? true : testsLiveness[testIndex];
    if(!isTestLive) {
      continue;
    }

    for (var j = this.fLine; j <= this.lLine; j += 1) {
      var stmt_index = j - this.fLine;
      if(coverage.doesTestFail(testIndex)) {
        this.failOnStmt[stmt_index] += 1;
      } else {
        this.passOnStmt[stmt_index] += 1;
      }
    }
  }
};

SourceCoverage.prototype.getPassRatioAndFailRatio = function(livePass, liveFail) {
  var livePassFail = coverage.getLivePassFailCount();
  var livePass = livePassFail[0];
  var liveFail = livePassFail[1];

  for(var i = this.fLine; i <= this.lLine; i += 1) {
    var stmt_Index = i - this.fLine;
    if (livePass == 0) {
        this.passRatio[stmt_Index] = 0.0;
    } else {
      this.passRatio[stmt_Index] = this.passOnStmt[stmt_Index] / livePass;
      console.log("numPass=" + this.passOnStmt[stmt_Index]);
    }

    if (liveFail == 0) {
        this.failRatio[stmt_Index] = 0.0;
    } else {
      this.failRatio[stmt_Index] = this.failOnStmt[stmt_Index] / liveFail;
      console.log("numFail=" + this.failOnStmt[stmt_Index]);
    }
  }
};

SourceCoverage.prototype.getSpiderSense = function(totalLivePass, totalLiveFail) {
  for(var i = this.fLine; i <= this.lLine; i += 1) {
    var stmt_Index = i - this.fLine;
    if ((totalLiveFail == 0) && (totalLivePass == 0)) {
        this.spiderStmts[stmt_Index] = -1;
    } else if ((this.failRatio[stmt_Index] == 0) && (this.passRatio[stmt_Index] == 0)) {
        this.spiderStmts[stmt_Index] = -1;
    } else {
        this.spiderStmts[stmt_Index] = 
          this.failRatio[stmt_Index] / (this.failRatio[stmt_Index] + this.passRatio[stmt_Index]);
    }
  }
};

SourceCoverage.prototype.canExecuteLine = function(lineNumber) {
  var index = lineNumber - this.fLine;
  if(index < 0) {
    return false;
  }

  var canExec = this.coverableLines[index];
  return canExec;
};