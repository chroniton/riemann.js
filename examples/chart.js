/**
 * Create a colorized chart of zeta(s) on the complex plane.
 */
$(document).ready(function(){

  var zeta_chart = new RiemannJS.chart({
    // <canvas> element id attribute.
    elem: 'riemann',
  
    // resolution of the chart image data.
    res: { x: 384, y: 384 },

    // display resolution of canvas
    width:  '384px',
    height: '384px',
  
    fn: RiemannJS.zeta,
    preview: true,

    // TODO configurable sources for pre-computed datasets
    // data = <external data source>,
  
    // function domain settings
    domain: {
      x: [-10,  6], // x-axis input range
      y: [-30, 30] // y-axis input range
    },
  
    // colorization settings
    clr: {
      r_axis: '(0/3)*pi',
      g_axis: '(2/3)*pi',
      b_axis: '(4/3)*pi',
      hue: 'abs(1/(1-abs(z)))',
      alpha: '1'
    },
  
    // configure chart generation mode.
    // TODO enable/disable deferred rendering (one-shot or staggered)
    //  chunk_size: 256, // compute n pixel value per render
    //  sleep_time:  16,   // milliseconds between render chunks

    oncomplete: function(plot) {
      $('button.render-control').hide();
      $('#render-status').hide();
      // TODO only tested with FF
      $('#chart-download').attr({
        target: '_blank',
        download: 'chart_' + plot.xres + 'x' + plot.yres + '.png',
      }).show();
    },

    onstartplot: function(plot) {
      $("#render-status").show();
      $("#pixels-rendered").text(0);
      $("#pixels-total").text(plot.pos.len);
    },

    onchunk: function(plot) {
      $("#pixels-rendered").text(plot.pos.idx);
    }
  
  });
 
  function updateConfig() {
    var cfg = zeta_chart.cfg;
    cfg.fn = $('#fn-chart').val();
    cfg.preview = $("#render-preview")[0].checked;
    cfg.domain = {
      x: [ parseFloat($('#dom-xmin').val()), parseFloat($('#dom-xmax').val()) ],
      y: [ parseFloat($('#dom-ymin').val()), parseFloat($('#dom-ymax').val()) ]
    };
    cfg.clr = {
      r_axis: $('#r-axis').val(),
      g_axis: $('#g-axis').val(),
      b_axis: $('#b-axis').val(),
      hue: $('#fn-hue').val(),
      alpha: $('#fn-alpha').val()
    };

    cfg.res = {
      x: parseInt($('#x-res').val()),
      y: parseInt($('#y-res').val())
    };

    // recompute aspect ratio.
    var w = Math.min(600, cfg.res.x);
    var h = w / (cfg.res.x / cfg.res.y);
    cfg.width = w + 'px';
    cfg.height = h + 'px';

  };

  $('.chart-cfg').change(function(e){
    $('#btn-render').show();
  });
 
  $('#chart-download').click(function(e) {
    this.href = $('#riemann canvas')[0].toDataURL();
  });

  // render a new chart
  $('#btn-render').click(function(e){
    $('#chart-download').hide();
    zeta_chart.stop();
    updateConfig();
    zeta_chart.draw();
    $('#btn-resume').hide();
    $('#btn-pause').show();
  });

  // resume chart rendering
  $('#btn-resume').click(function(e){
    $(this).hide();
    zeta_chart.start();
    $('#btn-pause').show();
  });

  // pause chart rendering
  $('#btn-pause').click(function(e){
    $(this).hide();
    zeta_chart.stop();
    $('#btn-resume').show();
  });


  // initialize config
  $('#x-res').val(screen.width);
  $('#y-res').val(screen.height);

  // hide rendering control
  $('#chart-download').hide();
  $('#btn-pause').hide();
  $('#btn-resume').hide();


  updateConfig();


});
