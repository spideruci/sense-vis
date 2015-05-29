// API Docs
// getFileSusupiciousNess(absoluteSourceFileName)double
// getLineSusupiciousNess(absoluteSourceFileName, int)double
// getLineSusupiciousNess(absoluteSourceFileName)double[]
// getFirstLine(absoluteSourceFileName)int
// getLastLine(absoluteSourceFileName)int

function TarantulaData() {

}

TarantulaData.prototype.getFileSusupiciousness = function(absoluteSourceFileName) {
  var fileSusupiciousness = -1.0;
  return fileSusupiciousness;
};

TarantulaData.prototype.getLineSusupiciousness = function(absoluteSourceFileName, lineNumber) {
  var lineSusupiciousness = -1.0;
  return lineSusupiciousness;
};

TarantulaData.prototype.getSusupiciousnessArray = function(absoluteSourceFileName) {
  var lineSusupiciousness = [-1.0];
  return lineSusupiciousness;
};

TarantulaData.prototype.getFirstLine = function(absoluteSourceFileName) {
  var firstLine = 0;
  return firstLine;
};

TarantulaData.prototype.getLastLine = function(absoluteSourceFileName) {
  var lastLine = 0;
  return lastLine;
};