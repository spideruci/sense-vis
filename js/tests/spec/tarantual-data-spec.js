describe("trantula-data-api is behaving sanely", function() {

  var tarantula_data;

  beforeEach(function() {
    tarantula_data = new TarantulaData();
  });

  it("File Susupiciousness is a defined non-null number", function() {
    var susupiciousness = tarantula_data.getFileSusupiciousness(null);
    var susupiciousness_type = typeof susupiciousness;
    expect(susupiciousness).not.toBe(null);
    expect(susupiciousness).not.toBe(undefined);
    expect(susupiciousness_type).toEqual('number');
  });

  it("Line Susupiciousness is a defined non-null number", function() {
    var susupiciousness = tarantula_data.getLineSusupiciousness(null, null);
    var susupiciousness_type = typeof susupiciousness;
    expect(susupiciousness).not.toBe(null);
    expect(susupiciousness).not.toBe(undefined);
    expect(susupiciousness_type).toEqual('number');
  });

  it("Susupiciousness Array is a defined non-null, non-empty array", function() {
    var array = tarantula_data.getSusupiciousnessArray(null);
    var expectedMessage = 'an actual array';
    var isArrayResult = null;
    if(Array.isArray(array)) {
      isArrayResult = expectedMessage;
    } else {
      isArrayResult = 'susupiciousness array';
    }

    var susupiciousness_type = typeof susupiciousness;
    expect(array).not.toBe(null);
    expect(array).not.toBe(undefined);
    expect(array.length).not.toBe(0);
    expect(isArrayResult).toBe('an actual array');
  });

  it("First Line is a defined non-null number", function() {
    var fLine = tarantula_data.getFirstLine(null);
    var fLine_type = typeof fLine;
    expect(fLine).not.toBe(null);
    expect(fLine).not.toBe(undefined);
    expect(fLine_type).toEqual('number');
  });

  it("Last Line is a defined non-null number", function() {
    var lLine = tarantula_data.getLastLine(null);
    var lLine_type = typeof lLine;
    expect(lLine).not.toBe(null);
    expect(lLine).not.toBe(undefined);
    expect(lLine_type).toEqual('number');
  });

});