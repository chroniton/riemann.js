RiemannJS.factorial = function(n) {
  var nf = 1.0;
  for (var k = 1; k <= n; k++) {
    nf *= k;
  }
  return Math.round(nf);
};

RiemannJS.binomial = function(n, k) {
  if (n == k) {
    return 1;
  } else if (k > n) {
    return 0;
  }
  return Math.round(
     RiemannJS.factorial(n) / (RiemannJS.factorial(k) * RiemannJS.factorial(n-k))
     );
};
