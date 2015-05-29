describe("trantula-data-api", function() {

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
});