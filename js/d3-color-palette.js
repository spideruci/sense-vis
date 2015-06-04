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
	var c = [];

	for (var i=0; i < N; i++) {
  
  		tmp = i.toString(base).split("").reverse().join("");
  		// console.log(tmp);
  		hue = 360 * parseInt(tmp, base) / Math.pow(base, tmp.length);
  		lightness = lightnessMin + (lightnessMax - lightnessMin) * (1 - Math.exp(-i/lightnessDecay));

  		// data.push({h: hue, s: saturation, l: lightness, code: tmp});
  		c.push(d3.hsl(hue,saturation,lightness));
	}
	return c;
}

function colors2(N,color_array){
	var c = [];
	var n_color = color_array.length;
	var color_domain = [];
	for(var i = 0; i < n_color;i++){
		color_domain.push(i);
	}
	var color = d3.scale.linear().domain(color_domain).range(color_array);
	var len = n_color - 1;
	for(var i = 0; i < N;i++){
		c.push(color(i*(len/(N-1))));
	}
	return c;
}
