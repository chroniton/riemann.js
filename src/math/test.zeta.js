if (RiemannJS.test == undefined) {
  RiemannJS.test = Object.create(null);
}

RiemannJS.test.zeta = function(verbose) {
  console.log("[TEST] (zeta) start");
  var results = [
    this.test_zeta(verbose),
    //this.test_arithmetic(verbose),
    //this.test_logexp(verbose),
    //this.test_polar_functions(verbose),
    //this.test_powroot(verbose),
    ];
  var fsum = function(a,b) { return a+b; };
  var sum = results.reduce(fsum);
  if (sum > 0) {
    console.error("... total test failures:", sum);
  }
  console.log("[TEST] (zeta) end");
};

RiemannJS.test.zeta.prototype.test_zeta = function(verbose) {
  console.log("... testing zeta(s) for real and complex inputs");

  var tv = [
    [(new RiemannJS.complex(   +3.300997,   +4.300676)), (new RiemannJS.complex(   +0.911609,   +0.007277))],
    [(new RiemannJS.complex(   -5.839974,   -3.202604)), (new RiemannJS.complex(   -0.050950,   +0.119499))],
    [(new RiemannJS.complex(   -4.642856,   +6.104000)), (new RiemannJS.complex(   -1.298604,   +0.573630))],
    [(new RiemannJS.complex(   +2.201754,   +2.493864)), (new RiemannJS.complex(   +0.849535,   -0.176081))],
    [(new RiemannJS.complex(   +6.350591,   +2.705088)), (new RiemannJS.complex(   +0.995280,   -0.011713))],
    [(new RiemannJS.complex(   +1.572071,   -0.933510)), (new RiemannJS.complex(   +1.099110,   +0.716104))],
    [(new RiemannJS.complex(   -0.142123,   +3.410410)), (new RiemannJS.complex(   +0.451682,   +0.048246))],
    [(new RiemannJS.complex(   +0.868561,   +0.557950)), (new RiemannJS.complex(   +0.169018,   -1.656645))],

    // the first few complex zeros
    [(new RiemannJS.complex(   +0.500000,  +14.134725)), (new RiemannJS.complex(   -0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +21.022040)), (new RiemannJS.complex(   +0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +25.010858)), (new RiemannJS.complex(   -0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +30.424876)), (new RiemannJS.complex(   -0.000000,   -0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +32.935062)), (new RiemannJS.complex(   -0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +37.586178)), (new RiemannJS.complex(   -0.000000,   -0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +40.918719)), (new RiemannJS.complex(   +0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +43.327073)), (new RiemannJS.complex(   -0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +48.005151)), (new RiemannJS.complex(   -0.000000,   -0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +49.773832)), (new RiemannJS.complex(   +0.000000,   -0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +52.970321)), (new RiemannJS.complex(   +0.000000,   -0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +56.446248)), (new RiemannJS.complex(   +0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +59.347044)), (new RiemannJS.complex(   +0.000000,   +0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +60.831779)), (new RiemannJS.complex(   +0.000000,   -0.000000))],
    [(new RiemannJS.complex(   +0.500000,  +65.112544)), (new RiemannJS.complex(   -0.000000,   -0.000000))],

    // some positive integers > 1
    [(new RiemannJS.complex(  2, 0 )), (new RiemannJS.complex( 1.644934066848226, 0))],
    [(new RiemannJS.complex(  3, 0 )), (new RiemannJS.complex( 1.202056903159594, 0))],
    [(new RiemannJS.complex(  4, 0 )), (new RiemannJS.complex( 1.082323233711138, 0))],
    [(new RiemannJS.complex(  5, 0 )), (new RiemannJS.complex( 1.036927755143370, 0))],
    [(new RiemannJS.complex(  6, 0 )), (new RiemannJS.complex( 1.017343061984449, 0))],
    [(new RiemannJS.complex(  7, 0 )), (new RiemannJS.complex( 1.008349277381923, 0))],
    [(new RiemannJS.complex(  8, 0 )), (new RiemannJS.complex( 1.004077356197944, 0))],
    [(new RiemannJS.complex(  9, 0 )), (new RiemannJS.complex( 1.002008392826082, 0))],
    [(new RiemannJS.complex( 10, 0 )), (new RiemannJS.complex( 1.000994575127818, 0))],
    [(new RiemannJS.complex( 11, 0 )), (new RiemannJS.complex( 1.000494188604119, 0))],
    [(new RiemannJS.complex( 12, 0 )), (new RiemannJS.complex( 1.000246086553308, 0))],
    [(new RiemannJS.complex( 13, 0 )), (new RiemannJS.complex( 1.000122713347578, 0))],
    [(new RiemannJS.complex( 14, 0 )), (new RiemannJS.complex( 1.000061248135059, 0))],
    [(new RiemannJS.complex( 15, 0 )), (new RiemannJS.complex( 1.000030588236307, 0))],

    // some integers <= 0
    [(new RiemannJS.complex(   0, 0)), (new RiemannJS.complex( -0.500000000000000, 0))],
    [(new RiemannJS.complex(  -1, 0)), (new RiemannJS.complex( -0.083333333333333, 0))],
    [(new RiemannJS.complex(  -2, 0)), (new RiemannJS.complex( +0.000000000000000, 0))],
    [(new RiemannJS.complex(  -3, 0)), (new RiemannJS.complex( +0.008333333333333, 0))],
    [(new RiemannJS.complex(  -4, 0)), (new RiemannJS.complex( +0.000000000000000, 0))],
    [(new RiemannJS.complex(  -5, 0)), (new RiemannJS.complex( -0.003968253968254, 0))],
    [(new RiemannJS.complex(  -6, 0)), (new RiemannJS.complex( +0.000000000000000, 0))],
    [(new RiemannJS.complex(  -7, 0)), (new RiemannJS.complex( +0.004166666666667, 0))],
    [(new RiemannJS.complex(  -8, 0)), (new RiemannJS.complex( +0.000000000000000, 0))],
    [(new RiemannJS.complex(  -9, 0)), (new RiemannJS.complex( -0.007575757575758, 0))],
    [(new RiemannJS.complex( -10, 0)), (new RiemannJS.complex( +0.000000000000000, 0))],
    [(new RiemannJS.complex( -11, 0)), (new RiemannJS.complex( +0.021092796092796, 0))],
    [(new RiemannJS.complex( -12, 0)), (new RiemannJS.complex( +0.000000000000000, 0))],
    [(new RiemannJS.complex( -13, 0)), (new RiemannJS.complex( -0.083333333333333, 0))],

    ];


  var z;
  var w;

  for (var x=0; x<tv.length; x++) {
    z = tv[x][0];
    w = tv[x][1];
    console.log("...   zeta("+z+") = " + w + " deviance: " + (w.sub(RiemannJS.zeta(z))).abs());// Math.abs(zabs - z.abs()));
  }

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

