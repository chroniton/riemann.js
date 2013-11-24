RiemannJS.factorial = function(n) {
  var nf = 1.0;
  for (var k = 1; k <= n; k++) {
    nf *= k;
  }
  return Math.round(nf);
};

RiemannJS._binomial_cache = [];

RiemannJS.binomial = function(n, k) {
  if (RiemannJS._binomial_cache[n] != undefined) {
    if (RiemannJS._binomial_cache[n][k] != undefined) {
      return RiemannJS._binomial_cache[n][k];
    }
  } else {
    RiemannJS._binomial_cache[n]=[];
  }
  if (n == k) {
    return 1;
  } else if (k > n) {
    return 0;
  }
  RiemannJS._binomial_cache[n][k] = Math.round(
     RiemannJS.factorial(n) / (RiemannJS.factorial(k) * RiemannJS.factorial(n-k))
     );
  return RiemannJS._binomial_cache[n][k];
};
