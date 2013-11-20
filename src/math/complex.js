RiemannJS.complex = function(real, imag) {
  this.r = real;
  this.i = imag;
};


RiemannJS.complex.prototype.add = function(z) {
  if (typeof z == "number") {
    return new RiemannJS.complex((this.r+z), this.i);
  } else {
    return new RiemannJS.complex((this.r+z.r), (this.i+z.i));
  }
};

RiemannJS.complex.prototype.sub = function(z) {
  if (typeof z == "number") {
    return new RiemannJS.complex((this.r-z), this.i);
  } else {
    return new RiemannJS.complex((this.r-z.r), (this.i-z.i));
  }
};

RiemannJS.complex.prototype.mul = function(z) {
  if (typeof z == "number") {
    return new RiemannJS.complex(this.r*z, this.i*z);
  } else {
    return new RiemannJS.complex((this.r*z.r - this.i*z.i), (this.r*z.i + this.i*z.r));
  }
};

RiemannJS.complex.prototype.div = function(z) {
  if (typeof z == "number") {
    return new RiemannJS.complex(this.r/z, this.i/z);
  } else {
    return this.mul(z.inverse());
  }
};

RiemannJS.complex.prototype.pow = function(z) {
  if (typeof z == "number") {
    var a = this.arg();
    var t = new RiemannJS.complex(Math.cos(z*a), Math.sin(z*a));
    return t.mul(Math.pow(this.abs(),z));
  } else {
    return z.mul(this.ln()).exp();
  }
};

RiemannJS.complex.prototype.root = function(n) {
  var a = this.arg();
  var w = new RiemannJS.complex(Math.cos(a/n), Math.sin(a/n));
  return w.mul(Math.pow(this.abs(),1.0/n));
};

RiemannJS.complex.prototype.neg = function() {
  return new RiemannJS.complex(-this.r, -this.i);
};

RiemannJS.complex.prototype.conj = function() {
  return new RiemannJS.complex(this.r, -this.i);
};

RiemannJS.complex.prototype.norm = function() {
  return Math.pow(this.r,2.0) + Math.pow(this.i,2.0);
};

RiemannJS.complex.prototype.abs = function() {
  return Math.sqrt(this.norm());
};

RiemannJS.complex.prototype.inverse = function() {
  return this.conj().div(this.norm());
};

RiemannJS.complex.prototype.arg = function() {
  return Math.atan2(this.i, this.r);
};

RiemannJS.complex.prototype.zero = function() {
  this.r = 0;
  this.i = 0;
};

RiemannJS.complex.prototype.accum = function(z) {
  if (typeof z == "number") {
    this.r += z;
  } else {
    this.r += z.r;
    this.i += z.i;
  }
  return this;
};

RiemannJS.complex.prototype.exp = function() {
  var x = 0;
  var s = new RiemannJS.complex(0.0,0.0);
  for (var x = 0; x < 30; x++) {
    s.accum( this.pow(x).div(RiemannJS.factorial(x)) )
  }
  return s;
};

RiemannJS.complex.prototype.ln = function() {
  return new RiemannJS.complex(Math.log(this.abs()), this.arg());
};


RiemannJS.complex.__display_modes__ = [ 'rectangular', 'polar' ];
RiemannJS.complex.__display_mode__ = RiemannJS.complex.__display_modes__[0];

RiemannJS.complex.display_mode = function(m) {
  if (RiemannJS.complex.__display_modes__.indexOf(m) >= 0) {
    RiemannJS.complex.__display_mode__ = m;
  }
};

RiemannJS.complex.prototype.toStringRect = function() {
  var sign = "+";
  if (this.i < 0.0) {
    sign = "";
  }
  return ["(" + this.r, sign, this.i + "j)"].join("");
};

RiemannJS.complex.prototype.toStringPolar = function() {
  return [this.abs(), "*e**(", this.arg(), "j)"].join("");
};

RiemannJS.complex.prototype.toString = function() {
  if (RiemannJS.complex.__display_mode__ == 'rectangular') {
    return this.toStringRect();
  } else if (RiemannJS.complex.__display_mode__ == 'polar') {
    return this.toStringPolar();
  } else {
    return ["complex(" + this.r, this.i + ")"].join();
  }
};
