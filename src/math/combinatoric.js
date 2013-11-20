RiemannJS.factorial = function(n) {
  var nf = 1.0;
  for (var k = 1; k <= n; k++) {
    nf *= k;
  }
  return nf;
};

RiemannJS.binomial = function(n, k) {
  return RiemannJS.factorial(n) / (RiemannJS.factorial(k) * RiemannJS.factorial(n-k));
};
