describe("Color Palette",function () {
	it("should return 10 colors in HSL",function(){
		var color10 = colors(10);
		var len = color10.length;
		// expect(color10).toBeArray();
		expect(len).toEqual(10);
		for(var i = 0; i < len; i++){
			var colorRGB = color10[i].rgb();
			expect(colorRGB.r).toBeLessThan(256); 
			expect(colorRGB.r).toBeGreaterThan(-1);

			expect(colorRGB.g).toBeLessThan(256); 
			expect(colorRGB.g).toBeGreaterThan(-1);

			expect(colorRGB.b).toBeLessThan(256); 
			expect(colorRGB.b).toBeGreaterThan(-1);
		};
	});

	it("should return 50 colors in HSL",function(){
		var color50 = colors(50);
		var len = color50.length;
		// expect(color10).toBeArray();
		expect(len).toEqual(50);
		for(var i = 0; i < len; i++){
			var colorRGB = color50[i].rgb();
			expect(colorRGB.r).toBeLessThan(256); 
			expect(colorRGB.r).toBeGreaterThan(-1);

			expect(colorRGB.g).toBeLessThan(256); 
			expect(colorRGB.g).toBeGreaterThan(-1);

			expect(colorRGB.b).toBeLessThan(256); 
			expect(colorRGB.b).toBeGreaterThan(-1);
		};
	});

	it("should return 150 colors in HSL",function(){
		var color150 = colors(150);
		var len = color150.length;
		// expect(color10).toBeArray();
		expect(len).toEqual(150);
		for(var i = 0; i < len; i++){
			var colorRGB = color150[i].rgb();
			expect(colorRGB.r).toBeLessThan(256); 
			expect(colorRGB.r).toBeGreaterThan(-1);

			expect(colorRGB.g).toBeLessThan(256); 
			expect(colorRGB.g).toBeGreaterThan(-1);

			expect(colorRGB.b).toBeLessThan(256); 
			expect(colorRGB.b).toBeGreaterThan(-1);
		};
	});
});