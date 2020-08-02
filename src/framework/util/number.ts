function sign(n: number) {
  /* only needed for IE off course */
	if (typeof Math.sign === 'undefined') {
    if (!n) { return 0; }
		return (n > 0) ? 1 : -1;
	}
	return Math.sign(n);
}

export function preciseRound(n: number, exp = 4) {
	var t = Math.pow(10, exp);
  var f = ( 10 / Math.pow(100, exp) );
  var a = ( (n * t) + (exp>0 ? 1 : 0) * (sign(n) * f) );
	return parseFloat( (Math.round(a) / t).toFixed(exp) );
}
