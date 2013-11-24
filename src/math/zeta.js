RiemannJS.zeta = function(s) {
  // we'll be working with the negation of the input
  if (typeof s == 'number')
    ns = new RiemannJS.complex(-s, 0.0);
  else
    ns = new RiemannJS.complex(-s.r, -s.i);

  var tk = new RiemannJS.complex(0,0);
  var sk = new RiemannJS.complex(0,0);
  var sn = new RiemannJS.complex(0,0);

  var nlim = Math.min(40, Math.max(20, Math.abs(ns.i) * 4));

  var n = 0;
  var k = 0;

  var bnk = 0;
  var tn_last = 1e10;
  var tn_abs = null;

  var _cache = [];

  var n0 = 1;

  for (n=0; n<80; n++) {
    n0 *= 2;
    sk.r = 0; sk.i = 0;

    for(k=0; k<=n; k++) {
      if (!_cache[k]) { // == undefined) {
        tk.r = k+1;
        _cache[k] = tk.pow(ns);
        if (k%2) {
          _cache[k].r *= -1;
          _cache[k].i *= -1;
        }
      }
      bnk = RiemannJS.binomial(n,k) / n0;
      sk.r += _cache[k].r * bnk;
      sk.i += _cache[k].i * bnk;
    }

    if (n > nlim){//-Math.abs(ns.i)) {
      tn_abs = sk.abs();
      if (tn_abs>tn_last)
        break;
      tn_last = tn_abs;
    }

    sn.r += sk.r;
    sn.i += sk.i;
  }

  //tk.r = 2.0;
  //return tk.pow(ns.add(1)).neg().add(1).inverse().mul(sn);

  tk.r = 2.0;
  ns.r += 1;
  tk = tk.pow(ns);
  tk.r *= -1;
  tk.i *= -1;
  tk.r += 1;
  return tk.inverse().mul(sn);
};
