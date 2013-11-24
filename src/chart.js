(function(){
  RiemannJS.import_math_context(this);

  /**
   * Create complex colorwheel charts using this constructor.
   */
  RiemannJS.chart = function(cfg) {
    this.cfg = cfg;
  };

  // configure then render the chart
  RiemannJS.chart.prototype.draw = function() {
    this._plots = null;
    this.configure();
    this.initialize();
    this.start();
  };

  // halt chart rendering
  RiemannJS.chart.prototype.stop = function() {
    if (this._rndr_int != null) {
      clearTimeout(this._rndr_int);
      this._rndr_int = null;
      return true;
    }
    return false;
  };

  // start/resume chart rendering
  RiemannJS.chart.prototype.start = function() {
    if (this._rndr_int == null) {
      this._rndr_int = setTimeout(this._rndr_fn, 10);
      return true;
    }
    return false;
  };

 
  // domain and position config
  RiemannJS.chart.prototype.configure = function() {
    var cfg = this.cfg;

    var self = this;
    this._rndr_fn = function(){ self.genPoints(); };
    this._rndr_int = null;

    // configure domain mapping parameters
    var domain = cfg.domain;
    domain.xsize = domain.x[1] - domain.x[0];
    domain.ysize = domain.y[1] - domain.y[0];
    domain.xoff = domain.x[0];
    domain.yoff = domain.y[0];

    // generate or set chart function
    if (typeof cfg.fn == 'function') {
      this._fn = cfg.fn;
    } else if (typeof cfg.fn == 'string') {
      try {
        this._fn = eval(cfg.fn);
        if (typeof this._fn != 'function')
          throw('not a function');
      } catch (err) {
        this._fn = eval('(function(s){ return ' + cfg.fn + '; })');
      }
    }

    // generate color mapping values.
    var clr = cfg.clr;
    clr._ar = eval(clr.r_axis || '(0/3)*pi');
    clr._ag = eval(clr.g_axis || '(2/3)*pi');
    clr._ab = eval(clr.b_axis || '(4/3)*pi');
    clr._hue = eval('(function(z){ return (' + (clr.hue||'abs(z)') + '); })');
    clr._alpha = eval('(function(z){ return (' + (clr.alpha||'1.0') + '); })');
  };
 

  // initialize the canvas and rendering context.
  RiemannJS.chart.prototype.initialize = function() {
    var cfg = this.cfg;

    this._elem = document.getElementById(cfg.elem);
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
      this._canvas.classList.add('complex-colorwheel-chart');
      this._elem.insertBefore(this._canvas, this._elem.lastChild);

      // get a rendering context.
      this._ctx = this._canvas.getContext('2d');
      this._ctx.mozImageSmoothingEnabled = false;
    }

    // chart resolution and aspect ratio
    this._canvas.width  = parseInt(cfg.res.x);
    this._canvas.height = parseInt(cfg.res.y);
    this._aspect_ratio  = cfg.res.x / cfg.y;

    // display resolution
    this._canvas.style.width  = ( cfg.width  || parseInt(cfg.res.x)+'px' );
    this._canvas.style.height = ( cfg.height || parseInt(cfg.res.y)+'px' );

    // clear the canvas.
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    if (cfg.preview) {
      // reduce until less than 20,000 pixels total.
      var cres = new complex(cfg.res.x, cfg.res.y);
      var cn = 2;
      while (abs(cres.div(cn)) > 200.0)
        cn += 1;
      this.create_plot(cfg.res.x, cfg.res.y, cn, cn);
    }

    this.create_plot(cfg.res.x, cfg.res.y);
  };


  // create plot data and position iterator
  RiemannJS.chart.prototype.create_plot = function(xres, yres, xscale, yscale) {
    var cfg = this.cfg;
    if (xscale==undefined)
      xscale = 1;
    if (yscale==undefined)
      yscale = 1;

    xres = Math.round(xres / xscale);
    yres = Math.round(yres / yscale);

    var plot = {};
    plot.image_data = null;
    plot.complete = false;
    plot.xscale = xscale;
    plot.yscale = yscale;
    plot.xres = xres;
    plot.yres = yres;
    plot.chunk_size = (cfg.chunk_size || plot.yres);
    plot.sleep_time = (cfg.sleep_time || pow(ln(plot.yres)/ln2,2)/2);

    // set initial position iterator data
    plot.pos = {
      idx: 0,
      len: xres * yres,
    };

    if (!this._plots)
      this._plots = [ plot, ];
    else
      this._plots[this._plots.length] = plot;

  };

  // set pixel rgba data
  RiemannJS.chart.prototype.setPixel = function(plot, x, y, rgba) {
    var data = plot.image_data.data;
    var idx = (x+y*plot.xres)*4;
    data[idx+0] = rgba[0];
    data[idx+1] = rgba[1];
    data[idx+2] = rgba[2];
    data[idx+3] = rgba[3];
  };

  // map a pixel to the zeta function domain.
  RiemannJS.chart.prototype.mapPixel = function(plot, x, y) {
    var cfg = this.cfg;
    var dom = cfg.domain;
    return new complex(
        dom.xsize * (  x / plot.xres) + dom.xoff,
        dom.ysize * (1-y / plot.yres) + dom.yoff);
  };
    
  // encode color (uint8) data for a complex value.
  RiemannJS.chart.prototype.encodeValue = function(z) {
    var cfg = this.cfg;
    var clr = cfg.clr;

    var ar = arg(z);
    var ab = abs(z);
  
    // generate hue scaling value
    var hue = clr._hue(z);

    // arg [-pi, pi] -> [0, 2pi]
    if (ar < 0)
      ar = (pi - abs(ar)) + pi;

    var r = abs(1 - abs(clr._ar - ar)/pi) * hue;
    var g = abs(1 - abs(clr._ag - ar)/pi) * hue;
    var b = abs(1 - abs(clr._ab - ar)/pi) * hue;
    var a = clr._alpha(z);
  
    // convert to uint8
    r = clamp(0, 255, r*255);
    g = clamp(0, 255, g*255);
    b = clamp(0, 255, b*255);
    a = clamp(0, 255, a*255);
  
    return [r,g,b,a];
  };

  // iteratively generate points without blocking
  RiemannJS.chart.prototype.genPoints = function() {
    var cfg = this.cfg;
    var plot = null;
    var pn = null;

    // XXX very lazy hack
    for (pn=0; pn < this._plots.length; pn++) {
      if (!this._plots[pn].complete) {
        plot = this._plots[pn];
        if (!plot.image_data) {

          if (pn > 0)
            plot.image_data = this._ctx.getImageData(0,0,cfg.res.x,cfg.res.y);
          else
            plot.image_data = this._ctx.createImageData(plot.xres, plot.yres);

          if (typeof this.cfg.onstartplot == 'function')
            this.cfg.onstartplot.call(this, plot);

        }
        break;
      }
    }

    if (!plot) {
      if (typeof this.cfg.oncomplete == 'function')
        this.cfg.oncomplete.call(this, this._plots[this._plots.length - 1]); 
      return;
    }

    var pos = plot.pos;
    //this._ctx.save();
  
    var fn = this._fn;
    var n = 0;
    var s = null;
    var z = null;
  
    var idx = null;
    var x = null;
    var y = null;
    var tidx = null;

    // Render loop (left-to-right)
    for (idx = pos.idx; idx < pos.len; idx++) {

      y = idx % plot.yres;
      x = Math.floor(idx / plot.yres);

      s = this.mapPixel(plot, x, y);
      z = fn(s);

      this.setPixel(plot, x, y, this.encodeValue(z));

      if (++n >= plot.chunk_size)
        break;

    };

    pos.idx = idx;

    // NOTE this hack gets us full-size preview
    this._ctx.putImageData(plot.image_data, 0, 0);
    if ((plot.xscale != 1) || (plot.yscale != 1)) {
      this._ctx.drawImage(this._canvas, 0, 0, plot.xres, plot.yres, 0, 0, this._canvas.width, this._canvas.height);
    }
    //this._ctx.restore();
  
    if (typeof this.cfg.onchunk == 'function')
      this.cfg.onchunk.call(this, plot);

    if (pos.idx >= pos.len)
      plot.complete = true;

    // carry on...
    this._rndr_int = setTimeout(this._rndr_fn, plot.sleep_time);
  
  };

})();
