function colors(N){
	// var N = 50;
	var base = 3;
	var saturation = 0.6;
	var lightnessMin = 0.4;
	var lightnessMax = 0.8;
	var lightnessDecay = 30;
	var tmp = "";
	var hue, lightness;

	// data = [];
	color = [];

	for (var i=0; i < N; i++) {
  
  		tmp = i.toString(base).split("").reverse().join("");
  		// console.log(tmp);
  		hue = 360 * parseInt(tmp, base) / Math.pow(base, tmp.length);
  		lightness = lightnessMin + (lightnessMax - lightnessMin) * (1 - Math.exp(-i/lightnessDecay));

  		// data.push({h: hue, s: saturation, l: lightness, code: tmp});
  		color.push(d3.hsl(hue,saturation,lightness));
	}
	return color;
}
