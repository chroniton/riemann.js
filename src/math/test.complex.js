if (RiemannJS.test == undefined) {
  RiemannJS.test = Object.create(null);
}

RiemannJS.test.complex = function(verbose) {
  console.log("[TEST] (complex) start");
  var results = [
    this.test_arithmetic(verbose),
    this.test_logexp(verbose),
    this.test_polar_functions(verbose),
    this.test_powroot(verbose),
    ];
  var fsum = function(a,b) { return a+b; };
  var sum = results.reduce(fsum);
  if (sum > 0) {
    console.error("... total test failures:", sum);
  }
  console.log("[TEST] (complex) end");
};

RiemannJS.test.complex.prototype.test_arithmetic = function(verbose) {
  console.log("... test complex arithmetic");

  var test_values = [
    (new RiemannJS.complex(  +12.656885,  +10.975728)),
    (new RiemannJS.complex(  +24.154518,  -26.957548)),
    (new RiemannJS.complex(   +0.000000,   +0.000000)),
    (new RiemannJS.complex(  +43.749210,   +0.000000)),
    (new RiemannJS.complex(  -34.409374,  +23.716083)),
    (new RiemannJS.complex(   -4.782366,   +0.000000)),
    (new RiemannJS.complex(  +57.266296,  -33.311968)),
    (new RiemannJS.complex(  -36.632587,   +0.000000)),
    (new RiemannJS.complex(   +0.000000,  -58.659045)),
    (new RiemannJS.complex(  -38.910186,  -81.575845)),
    (new RiemannJS.complex(   -4.656134,  +28.743833)),
    (new RiemannJS.complex(   -3.934181,  +37.531105)),
    (new RiemannJS.complex(   +0.000000,  -21.768841)),
    (new RiemannJS.complex(   +0.000000,  -43.210377)),
    (new RiemannJS.complex(  +22.467603,  -17.278755)),
    (new RiemannJS.complex(  +12.881813,   +4.611726)),
    (new RiemannJS.complex(  -49.029998,   +0.000000)),
    (new RiemannJS.complex(  -34.834072,  -18.886983)),
    (new RiemannJS.complex(  -51.048191,  +67.229594)),
    (new RiemannJS.complex(   +0.000000,   +4.902955)),
    (new RiemannJS.complex(   +0.000000,   +0.000000)),
    (new RiemannJS.complex(  -12.059282,  -14.671320)),
    (new RiemannJS.complex(  -87.468218,   +0.000000)),
    (new RiemannJS.complex(   +0.000000,   -0.319388)),
    (new RiemannJS.complex(   -8.865351,   +0.000000)),
    (new RiemannJS.complex(  +10.639062,   +4.013078)),
    (new RiemannJS.complex(  -13.128009,  -25.032727)),
    (new RiemannJS.complex(   -0.000000,  -17.344908)),
    (new RiemannJS.complex(   +0.000000,   -4.032525)),
    (new RiemannJS.complex(   -0.667561,  +21.711344)),
    (new RiemannJS.complex(  +95.236299,   +0.000000)),
    (new RiemannJS.complex(  -25.358224,   +0.000000)),
    ];

  var test_sum = new RiemannJS.complex(-126.73204691799998,-159.61478387789995);

  var csum = function(z,w) { return z.add(w); }
  var x = 0;
  var result_sum_add = new RiemannJS.complex(0,0);
  var result_sum_accum = new RiemannJS.complex(0,0);
  for (x=0; x<test_values.length; x++) {
    result_sum_accum.accum(test_values[x]);
    result_sum_add = result_sum_add.add(test_values[x]);
  }

  //var result_sum = test_values.reduce(csum);
  console.log("diff add/accum:", (result_sum_add.sub(result_sum_accum)).abs());

  console.log("sum correct:", test_sum);
  console.log("sum result: ", result_sum_add);
  console.log("abs diff:", (test_sum.sub(result_sum_add)).abs());

  for (var x = test_values.length-1; x >= 0; x--) {
    result_sum_add = result_sum_add.sub(test_values[x]);
  }
  console.log("sum sub: result: ", result_sum_add);

  var mul_v = [
    (new RiemannJS.complex(   +3.300997,   +4.300676)),
    (new RiemannJS.complex(   -5.839974,   -3.202604)),
    (new RiemannJS.complex(   -4.642856,   +6.104000)),
    (new RiemannJS.complex(   +2.201754,   +2.493864)),
    (new RiemannJS.complex(   +6.350591,   +2.705088)),
    (new RiemannJS.complex(   +1.572071,   -0.933510)),
    (new RiemannJS.complex(   -0.142123,   +3.410410)),
    (new RiemannJS.complex(   +0.868561,   +0.557950)),
    ];
  var chk_prod = new RiemannJS.complex(-39660.964457822534, -10272.799103675807);
  var cprod = function(z,w) { return z.mul(w); }
  var result_prod = mul_v.reduce(cprod);

  console.log("prod correct:", chk_prod);
  console.log("prod result: ", result_prod);
  console.log("prod diff:", (chk_prod.sub(result_prod)).abs());

  return 0;

  //var n = 0;
  //var v = 1;
  //var failures = 0;
  //for (var x=0; x<tv.length; x++) {
  //  n = tv[x][0];
  //  v = tv[x][1];
  //  r = RiemannJS.factorial(n);
  //  if (v != r) {
  //    console.error("... factorial(" + n + ") -> " + r, "actual: " + v); 
  //    failures++;
  //  } else if (verbose) {
  //    console.log("... factorial(" + n + ") -> " + r); 
  //  }
  //}

  //if (failures > 0) {
  //  console.error("... factorial test failures:", failures);
  //}
  //return failures;
};


RiemannJS.test.complex.prototype.test_polar_functions = function(verbose) {
  var tv = [
    [(new RiemannJS.complex(   +3.300997,   +4.300676)),     5.421475,     0.916156],
    [(new RiemannJS.complex(   -5.839974,   -3.202604)),     6.660478,    -2.639984],
    [(new RiemannJS.complex(   -4.642856,   +6.104000)),     7.669089,     2.221063],
    [(new RiemannJS.complex(   +2.201754,   +2.493864)),     3.326722,     0.847527],
    [(new RiemannJS.complex(   +6.350591,   +2.705088)),     6.902717,     0.402682],
    [(new RiemannJS.complex(   +1.572071,   -0.933510)),     1.828346,    -0.535855],
    [(new RiemannJS.complex(   -0.142123,   +3.410410)),     3.413370,     1.612445],
    [(new RiemannJS.complex(   +0.868561,   +0.557950)),     1.032330,     0.571003],
    ];

  var z;
  var zarg;
  var zabs;

  for (var x=0; x<tv.length; x++) {
    z = tv[x][0];
    zabs = tv[x][1];
    zarg = tv[x][2];
    console.log("... ["+x+"]: " + z);
    console.log("...   abs(z) = " + zabs + " deviance: " + Math.abs(zabs - z.abs()));
    console.log("...   arg(z) = " + zarg + " deviance: " + Math.abs(zarg - z.arg()));
  }

  return 0;
};

RiemannJS.test.complex.prototype.test_logexp = function(verbose) {
  var tv = [
    [(new RiemannJS.complex(   +3.300997,   +4.300676)),(new RiemannJS.complex(  -10.860751,  -24.871801)),(new RiemannJS.complex(   +1.690368,   +0.916156))],
    [(new RiemannJS.complex(   -5.839974,   -3.202604)),(new RiemannJS.complex(   -0.002904,   +0.000177)),(new RiemannJS.complex(   +1.896191,   -2.639984))],
    [(new RiemannJS.complex(   -4.642856,   +6.104000)),(new RiemannJS.complex(   +0.009476,   -0.001716)),(new RiemannJS.complex(   +2.037198,   +2.221063))],
    [(new RiemannJS.complex(   +2.201754,   +2.493864)),(new RiemannJS.complex(   -7.209691,   +5.455038)),(new RiemannJS.complex(   +1.201987,   +0.847527))],
    [(new RiemannJS.complex(   +6.350591,   +2.705088)),(new RiemannJS.complex( -519.119593, +242.178363)),(new RiemannJS.complex(   +1.931915,   +0.402682))],
    [(new RiemannJS.complex(   +1.572071,   -0.933510)),(new RiemannJS.complex(   +2.865967,   -3.871175)),(new RiemannJS.complex(   +0.603411,   -0.535855))],
    [(new RiemannJS.complex(   -0.142123,   +3.410410)),(new RiemannJS.complex(   -0.836358,   -0.230404)),(new RiemannJS.complex(   +1.227700,   +1.612445))],
    [(new RiemannJS.complex(   +0.868561,   +0.557950)),(new RiemannJS.complex(   +2.022005,   +1.261928)),(new RiemannJS.complex(   +0.031819,   +0.571003))],
    ];

  var z;
  var zexp;
  var zlog;

  for (var x=0; x<tv.length; x++) {
    z = tv[x][0];
    zexp = tv[x][1];
    zlog = tv[x][2];
    console.log("... ["+x+"]: " + z);
    console.log("...   exp(z) = " + zexp + " deviance: " + (zexp.sub(z.exp())).abs());
    console.log("...   log(z) = " + zlog + " deviance: " + (zlog.sub(z.ln())).abs());
  }

};

RiemannJS.test.complex.prototype.test_powroot = function(verbose) {

  // z**m
  var tv = [
    [(new RiemannJS.complex(   +3.300997,   +4.300676)),    -2.500767, (new RiemannJS.complex(   -0.009626,   -0.010968))],
    [(new RiemannJS.complex(   -5.839974,   -3.202604)),    +3.917800, (new RiemannJS.complex(-1022.648886,+1337.862627))],
    [(new RiemannJS.complex(   -4.642856,   +6.104000)),    -1.284765, (new RiemannJS.complex(   -0.069991,   -0.020737))],
    [(new RiemannJS.complex(   +2.201754,   +2.493864)),    -1.427584, (new RiemannJS.complex(   +0.063485,   -0.168214))],
    [(new RiemannJS.complex(   +6.350591,   +2.705088)),    -2.518044, (new RiemannJS.complex(   +0.004077,   -0.006549))],
    [(new RiemannJS.complex(   +1.572071,   -0.933510)),    +0.498476, (new RiemannJS.complex(   +1.303013,   -0.356570))],
    [(new RiemannJS.complex(   -0.142123,   +3.410410)),    -1.222272, (new RiemannJS.complex(   -0.086851,   -0.205392))],
    [(new RiemannJS.complex(   +0.868561,   +0.557950)),    +0.941724, (new RiemannJS.complex(   +0.885000,   +0.527765))],
    [(new RiemannJS.complex(   +3.300997,   +4.300676)),(new RiemannJS.complex(   +3.505550,   -0.254317)),(new RiemannJS.complex( -442.512825, +166.488160))],
    [(new RiemannJS.complex(   -5.839974,   -3.202604)),(new RiemannJS.complex(   -1.783188,   -4.671680)),(new RiemannJS.complex(   -0.000000,   +0.000000))],
    [(new RiemannJS.complex(   -4.642856,   +6.104000)),(new RiemannJS.complex(   -5.692516,   -3.382111)),(new RiemannJS.complex(   +0.013041,   -0.010630))],
    [(new RiemannJS.complex(   +2.201754,   +2.493864)),(new RiemannJS.complex(   +2.362430,   -3.304715)),(new RiemannJS.complex( -109.449702, -259.447121))],
    [(new RiemannJS.complex(   +6.350591,   +2.705088)),(new RiemannJS.complex(   -3.683668,   -4.500248)),(new RiemannJS.complex(   -0.003627,   +0.003397))],
    [(new RiemannJS.complex(   +1.572071,   -0.933510)),(new RiemannJS.complex(   -2.084884,   -2.652027)),(new RiemannJS.complex(   +0.060770,   -0.031875))],
    [(new RiemannJS.complex(   -0.142123,   +3.410410)),(new RiemannJS.complex(   +5.966631,   +0.000000)),(new RiemannJS.complex(-1489.035329, -295.785807))],
    [(new RiemannJS.complex(   +0.868561,   +0.557950)),(new RiemannJS.complex(   -7.925408,   +4.517056)),(new RiemannJS.complex(   -0.019134,   +0.055736))],
    ];

  var z;
  var m;
  var w;

  for (var x=0; x<tv.length; x++) {
    z = tv[x][0];
    m = tv[x][1];
    w = tv[x][2];
    console.log("... ["+x+"]: " + z);
    console.log("...   z^"+ m +" = " + w + " deviance: " + (w.sub(z.pow(m))).abs());// Math.abs(zabs - z.abs()));
  }

  var root_v = [
    [(new RiemannJS.complex(   +3.300997,   +4.300676)), 2, (new RiemannJS.complex(   +2.088357,   +1.029679))],
    [(new RiemannJS.complex(   -5.839974,   -3.202604)), 5, (new RiemannJS.complex(   +1.262186,   -0.736144))],
    [(new RiemannJS.complex(   -4.642856,   +6.104000)), 3, (new RiemannJS.complex(   +1.455815,   +1.330235))],
    [(new RiemannJS.complex(   +2.201754,   +2.493864)), 4, (new RiemannJS.complex(   +1.320328,   +0.284016))],
    [(new RiemannJS.complex(   +6.350591,   +2.705088)), 4, (new RiemannJS.complex(   +1.612689,   +0.162901))],
    [(new RiemannJS.complex(   +1.572071,   -0.933510)), 3, (new RiemannJS.complex(   +1.203338,   -0.217253))],
    [(new RiemannJS.complex(   -0.142123,   +3.410410)), 3, (new RiemannJS.complex(   +1.293366,   +0.770861))],
    [(new RiemannJS.complex(   +0.868561,   +0.557950)), 5, (new RiemannJS.complex(   +0.999829,   +0.114680))],
    ];

  for (var x=0; x<root_v.length; x++) {
    z = root_v[x][0];
    m = root_v[x][1];
    w = root_v[x][2];
    console.log("... ["+x+"]: " + z);
    console.log("...   root(z,"+ m +") = " + w + " deviance: " + (w.sub(z.root(m))).abs());// Math.abs(zabs - z.abs()));
  }



  return 0;
};
