function renderBackgroundImage() {
  var canvas2 = document.getElementById('background_design');
  var ctx2 = canvas2.getContext('2d');

  const CANVAS_HEIGHT2 = canvas2.height;
  const CANVAS_WIDTH2 = canvas2.width;

  function renderTronBackground() {
    var SPACER_WIDTH2 = 20;
    var BAR_WIDTH2 = 15;
    var OFFSET2 = 500;
    var CUTOFF2 = 300;
    var numBars2 = Math.round(CANVAS_WIDTH2 / SPACER_WIDTH2);

    for (var i = 0; i < numBars2; ++i) {
      var grdTop = '#181818';
      // var grdBottom = '#212121';
      var grdBottom = '#112828';

      var grd= ctx2.createLinearGradient(0,0,0,100);
      grd.addColorStop(0,grdTop);
      grd.addColorStop(1, grdBottom);

      ctx2.line(i * -SPACER_WIDTH2, CANVAS_HEIGHT2, 0, -CANVAS_HEIGHT2, grd);
      ctx2.line(i * SPACER_WIDTH2, CANVAS_HEIGHT2, BAR_WIDTH2, 0, grd);

      ctx2.line(i * SPACER_WIDTH2, -CANVAS_HEIGHT2, 0, CANVAS_HEIGHT2, grd);
      ctx2.line(i * -SPACER_WIDTH2, -CANVAS_HEIGHT2, -BAR_WIDTH2, 0, grd);

      ctx2.line((100 - i) * SPACER_WIDTH2, 0, CANVAS_WIDTH2 / 2, CANVAS_HEIGHT2, grd);
      ctx2.line((100 - i) * -SPACER_WIDTH2, 0, CANVAS_WIDTH2 / 2, -CANVAS_WIDTH2, grd);
    }
  }

  renderTronBackground();
}

// ===================================

CanvasRenderingContext2D.prototype.line = function(x1, y1, x2, y2, fill) {
  this.lineCap = 'round';
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.closePath();
  this.strokeStyle = fill;
  this.stroke();
}
