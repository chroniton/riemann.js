/**
 * Inject a more convenient math environment.
 */
RiemannJS.import_math_context = function(obj) {
  if (!obj)
    obj = this;

  obj.pi = Math.PI;
  obj.e = Math.E;
  obj.phi = (1+Math.sqrt(5))/2;
  obj.ln2 = Math.LN2;
  obj.ln10 = Math.LN10;

  obj.random = Math.random;
  obj.round = Math.round;
  obj.ceil = Math.ceil;
  obj.floor = Math.floor;
  obj.min = Math.min;
  obj.max = Math.max;

  obj.sin = Math.sin;
  obj.cos = Math.cos;
  obj.tan = Math.tan;
  obj.asin = Math.sin;
  obj.acos = Math.cos;
  obj.atan = Math.tan;
  obj.atan2 = Math.tan;

  obj.clamp = function(vmin, vmax, value) {
    return max(vmin, min(vmax, value));
  };

  obj.abs = function(x) {
    if (typeof x == 'number')
      return Math.abs(x);
    else
      return x.abs();
  };

  obj.arg = function(x) {
    if (typeof x == 'number')
      return 0.0;
    else
      return x.arg();
  };

  obj.exp = function(x) {
    if (typeof x == 'number')
      return Math.exp(x);
    else
      return x.exp();
  };

  obj.ln = function(x) {
    if (typeof x == 'number')
      return Math.log(x);
    else
      return x.ln();
  };

  obj.pow = function(x,y) {
    if (typeof x == 'number')
      return Math.pow(x,y);
    else
      return x.pow(y);
  };

  obj.sqrt = function(x) {
    if (typeof x == 'number')
      return Math.sqrt(x);
    else
      return x.pow(1/2);
  };

  obj.real = function(x) {
    if (typeof x == 'number')
      return x;
    else
      return x.r;
  };

  obj.imag = function(x) {
    if (typeof x == 'number')
      return 0.0;
    else
      return x.i;
  };

  obj.sin = function(x) {
    if (typeof x == 'number')
      return Math.sin(x);
    else
      return x.sin();
  };

  obj.cos = function(x) {
    if (typeof x == 'number')
      return Math.cos(x);
    else
      return x.cos();
  };

  obj.tan = function(x) {
    if (typeof x == 'number')
      return Math.tan(x);
    else
      return x.tan();
  };

  obj.C = function(real,imag) {
    return new RiemannJS.complex(real,imag);
  };

  // RiemannJS functions
  obj.complex = RiemannJS.complex;
  obj.zeta = RiemannJS.zeta;

  return obj;
};
