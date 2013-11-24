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
  return Math.sqrt(Math.pow(this.r,2.0)+Math.pow(this.i,2.0));
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
  //(exp(re(x))*cos(im(x)), exp(re(x))*sin(im(x)))
  var a = Math.exp(this.r);
  return new RiemannJS.complex(
      a*Math.cos(this.i),
      a*Math.sin(this.i));

  //var vz = new RiemannJS.complex(1e-100,this.i);
  //var va = vz.abs();

  //return vz.div(va)
  //  .mul( Math.sin(va) )
  //  .add( Math.cos(va) )
  //  .mul( Math.pow(Math.E, this.r) );
};

RiemannJS.complex.prototype.ln = function() {
  return new RiemannJS.complex(Math.log(this.abs()), this.arg());
};

RiemannJS.complex.prototype.sin = function() {
  var z = new RiemannJS.complex(0,1);
  var n0 = this.mul(z).exp();
  z.i = -1;
  var n1 = this.mul(z).exp();
  z.i = 2;
  return n0.sub(n1).div(z);
};

RiemannJS.complex.prototype.cos = function() {
  var z = new RiemannJS.complex(0,1);
  var n0 = this.mul(z).exp();
  z.i = -1;
  var n1 = this.mul(z).exp();
  return n0.add(n1).div(2);
};

RiemannJS.complex.prototype.tan = function() {
  return this.sin().div(this.cos());
};

RiemannJS.complex.prototype.pow = function(z) {
  if (typeof z == "number") {
    var a = this.arg() * z;
    var b = Math.pow(this.abs(),z);
    return new RiemannJS.complex(b*Math.cos(a), b*Math.sin(a));
  } else {
    var a = Math.log(this.abs());
    var b = this.arg();
    var c = Math.exp(z.r*a - z.i*b);
    var d = (z.r*b + z.i*a);
    return new RiemannJS.complex(c*Math.cos(d),c*Math.sin(d));
    //return z.mul(this.ln()).exp();
  }
};

RiemannJS.complex.prototype.root = function(n) {
  var a = this.arg();
  var w = new RiemannJS.complex(Math.cos(a/n), Math.sin(a/n));
  return w.mul(Math.pow(this.abs(),1.0/n));
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
