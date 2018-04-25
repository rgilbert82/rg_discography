var COLORSCHEMES = [
  ['#1B0029', '#30014A', '#410264', '#50047A', '#610792', '#50047A', '#410264', '#30014A'],
  ['#280028', '#480048', '#610061', '#770077', '#8E008E', '#770077', '#610061', '#480048'],
  ['#32001C', '#580032', '#780044', '#930053', '#B00064', '#930053', '#780044', '#580032'],
  ['#370011', '#62001E', '#860029', '#A40032', '#C4003B', '#A40032', '#860029', '#62001E'],
  ['#3E0000', '#6E0000', '#950000', '#B70000', '#DB0000', '#B70000', '#950000', '#6E0000'],
  ['#3E1200', '#6E1F00', '#952A00', '#B73400', '#DB3E00', '#B73400', '#952A00', '#6E1F00'],
  ['#3E1C00', '#6E3200', '#954400', '#B75300', '#DB6300', '#B75300', '#954400', '#6E3200'],
  ['#3E2300', '#6E3F00', '#955500', '#B76900', '#DB7D00', '#B76900', '#955500', '#6E3F00'],
  ['#3E2900', '#6E4900', '#956400', '#B77A00', '#DB9200', '#B77A00', '#956400', '#6E4900'],
  ['#3E2E00', '#6E5300', '#957000', '#B78900', '#DBA400', '#B78900', '#957000', '#6E5300'],
  ['#3E3300', '#6E5B00', '#957C00', '#B79800', '#DBB500', '#B79800', '#957C00', '#6E5B00'],
  ['#3E3800', '#6E6400', '#958800', '#B7A700', '#DBC700', '#B7A700', '#958800', '#6E6400'],
  ['#3E3E00', '#6E6E00', '#959500', '#B7B700', '#DBDB00', '#B7B700', '#959500', '#6E6E00'],
  ['#313C00', '#586A00', '#779000', '#93B100', '#AFD300', '#93B100', '#779000', '#586A00'],
  ['#263A00', '#456700', '#5D8B00', '#72AB00', '#88CC00', '#72AB00', '#5D8B00', '#456700'],
  ['#193700', '#2C6200', '#3C8500', '#4AA300', '#58C300', '#4AA300', '#3C8500', '#2C6200'],
  ['#003103', '#005706', '#007608', '#009009', '#00AC0B', '#009009', '#007608', '#005706'],
  ['#002A18', '#004C2B', '#00663A', '#007E48', '#009656', '#007E48', '#00663A', '#004C2B'],
  ['#002525', '#004242', '#005A5A', '#006E6E', '#008383', '#006E6E', '#005A5A', '#004242'],
  ['#001728', '#012947', '#033860', '#054576', '#08538D', '#054576', '#033860', '#012947'],
  ['#000D29', '#02184A', '#052264', '#082B7B', '#0E3693', '#082B7B', '#02184A', '#000D29'],
  ['#01012B', '#03034D', '#070769', '#0D0D80', '#151599', '#0D0D80', '#070769', '#03034D']
];

var countDown = 5;
var schemeID = 0;
var rand = 0;

function visualizer() {
  var canvas = document.getElementById('visualizer');
  var ctx = canvas.getContext('2d');

  // var canvas2 = document.getElementById('visualizer2');
  // var ctx2 = canvas2.getContext('2d');

  const CANVAS_HEIGHT = canvas.height;
  const CANVAS_WIDTH = canvas.width;

  // const CANVAS_HEIGHT2 = canvas2.height;
  // const CANVAS_WIDTH2 = canvas2.width;

  var context = new AudioContext();
  var analyser = context.createAnalyser();

  function rafCallback(time) {
    window.requestAnimationFrame(rafCallback, canvas);

    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqByteData);
    // analyser.getByteTimeDomainData(freqByteData);

    var SPACER_WIDTH = 20;
    var BAR_WIDTH = 10;
    var OFFSET = 350;
    var CUTOFF = 23;
    var numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);

    // var SPACER_WIDTH2 = 20;
    // var BAR_WIDTH2 = 15;
    // var OFFSET2 = 500;
    // var CUTOFF2 = 300;
    // var numBars2 = Math.round(CANVAS_WIDTH2 / SPACER_WIDTH2);

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineCap = 'round';

    // Draw rectangle for each frequency bin.
    // for (var i = 0; i < numBars / 2 - CUTOFF; ++i) {
    //   var magnitude = freqByteData[i + OFFSET];
    //   ctx.fillRect(i * SPACER_WIDTH, CANVAS_HEIGHT, BAR_WIDTH, -magnitude);
    // }

    for (var i = 0; i < numBars; ++i) {
      var magnitude = freqByteData[i + OFFSET];
      var n = i % COLORSCHEMES[schemeID].length;
      var fill = COLORSCHEMES[schemeID][n];
      var grdBottom = '#181818';
      var grdTop = fill;

      var grd= ctx.createLinearGradient(0,0,0,255);
      grd.addColorStop(0,grdTop);
      grd.addColorStop(1, grdBottom);

      ctx.fillStyle = grd;
      ctx.fillRect(i * SPACER_WIDTH, CANVAS_HEIGHT, BAR_WIDTH, -magnitude);
    }

    // for (var i = 0; i < numBars2; ++i) {
    //   var magnitude2 = freqByteData[i - analyser.maxDecibels];
    //   var grdTop = '#181818';
    //   // var grdBottom = '#212121';
    //   var grdBottom = '#112828';

      // var grd= ctx2.createLinearGradient(0,0,0,100);
      // grd.addColorStop(0,grdTop);
      // grd.addColorStop(1, grdBottom);

      // Lite Visualizer
      //
      // ctx2.line(i * -SPACER_WIDTH2, CANVAS_HEIGHT2, 0, -CANVAS_HEIGHT2, grd);
      // ctx2.line(i * SPACER_WIDTH2, CANVAS_HEIGHT2, BAR_WIDTH2, 0, grd);
      //
      // ctx2.line(i * SPACER_WIDTH2, -CANVAS_HEIGHT2, 0, CANVAS_HEIGHT2, grd);
      // ctx2.line(i * -SPACER_WIDTH2, -CANVAS_HEIGHT2, -BAR_WIDTH2, 0, grd);
      //
      // ctx2.line((100 - i) * SPACER_WIDTH2, 0, CANVAS_WIDTH2 / 2, CANVAS_HEIGHT2, grd);
      // ctx2.line((100 - i) * -SPACER_WIDTH2, 0, CANVAS_WIDTH2 / 2, -CANVAS_WIDTH2, grd);

      //  Heavy Visualizer
      //
      // ctx2.line(i * -SPACER_WIDTH2, CANVAS_HEIGHT2, i * magnitude2 * schemeID, -CANVAS_HEIGHT2, grd);
      // ctx2.line(i * SPACER_WIDTH2, CANVAS_HEIGHT2, BAR_WIDTH2, rand * 50 * -magnitude2, grd);
      //
      // ctx2.line(i * SPACER_WIDTH2, -CANVAS_HEIGHT2, i * -magnitude2 * schemeID, CANVAS_HEIGHT2, grd);
      // ctx2.line(i * -SPACER_WIDTH2, -CANVAS_HEIGHT2, -BAR_WIDTH2, rand * 50 * magnitude2, grd);
      //
      // ctx2.line((100 - i) * SPACER_WIDTH2, -CANVAS_HEIGHT2 * -magnitude2 * schemeID * rand, CANVAS_WIDTH2 / 2, CANVAS_HEIGHT2, grd);
      // ctx2.line((100 - i) * -SPACER_WIDTH2, -CANVAS_HEIGHT2 * -magnitude2 * schemeID * rand, CANVAS_WIDTH2 / 2, -CANVAS_WIDTH2, grd);
    // }

    if (countDown === 0) {
      schemeID = (schemeID + 1) % COLORSCHEMES.length;
      countDown = 5;
      // rand = Math.random();
      // ctx2.clear();
    } else {
      countDown--;
    }

  }

  var audio = document.getElementsByTagName("audio")[0];
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  rafCallback();
}

// ===================================

// CanvasRenderingContext2D.prototype.line = function(x1, y1, x2, y2, fill) {
//   this.lineCap = 'round';
//   this.beginPath();
//   this.moveTo(x1, y1);
//   this.lineTo(x2, y2);
//   this.closePath();
//   this.strokeStyle = fill;
//   this.stroke();
// }
// CanvasRenderingContext2D.prototype.circle = function(x, y, r, fill_opt) {
//   this.beginPath();
//   this.arc(x, y, r, 0, Math.PI * 2, true);
//   this.closePath();
//   if (fill_opt) {
//     this.fillStyle = 'rgba(0,0,0,1)';
//     this.fill();
//     this.stroke();
//   } else {
//     this.stroke();
//   }
// }
// CanvasRenderingContext2D.prototype.rectangle = function(x, y, w, h, fill_opt) {
//   this.beginPath();
//   this.rect(x, y, w, h);
//   this.closePath();
//   if (fill_opt) {
//     this.fillStyle = 'rgba(0,0,0,1)';
//     this.fill();
//   } else {
//     this.stroke();
//   }
// }
// CanvasRenderingContext2D.prototype.triangle = function(p1, p2, p3, fill_opt) {
//   // Stroked triangle.
//   this.beginPath();
//   this.moveTo(p1.x, p1.y);
//   this.lineTo(p2.x, p2.y);
//   this.lineTo(p3.x, p3.y);
//   this.closePath();
//   if (fill_opt) {
//     this.fillStyle = 'rgba(0,0,0,1)';
//     this.fill();
//   } else {
//     this.stroke();
//   }
// }
CanvasRenderingContext2D.prototype.clear = function() {
  this.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
}
