var canvasH = 650;
var canvasW = 650;

var cx = canvasW / 2;
var cy = canvasH / 2;

var earthR = 15;
var moonR = earthR * 0.27;
//var sunR = earthR * 109;
var earthOrbitR = (cx * 0.75) - earthR;
//var moonOrbitR = earthR + (earthR * 30);
var moonOrbitR = earthR + (earthR * 2);
var epoch = new Date(2014, 6, 26).getTime();

var earthDaysScale = d3.scale.linear()
  .range([0, 2 * Math.PI])
  .domain([0, 365.2563]);

var moonDaysScale = d3.scale.linear()
  .range([0, 2 * Math.PI])
  .domain([0, 29.53]);

var svg = d3.select('#graph')
  .append('svg')
  .attr('width', canvasH)
  .attr('height', canvasW);

var earthOrbit = svg
  .append('circle')
  .attr('cx', cx)
  .attr('cy', cy)
  .attr('r', earthOrbitR)
  .attr('fill', 'transparent')
  .attr('stroke', '#fff')
  .attr('stroke-width', '2')
  .attr('stroke-opacity', 0.35);

var filter = svg.append("filter")
  .attr("id", "blur")
  .append("feGaussianBlur")
  .attr("stdDeviation", 5);

var sun = svg
  .append('circle')
  .attr('r', 100)
  .attr('cx', cx)
  .attr('cy', cy)
  .attr("filter", "url(#blur)")
  .attr('fill', '#FC0');

var earth = svg
  .append('circle')
  .attr('r', earthR)
  .attr('fill', '#9CF')
  .on('mousedown', function() {
    d3.event.preventDefault();
    var originX = d3.event.pageX;
    var draggedDay = day;

    function mousemove(evt) {
      var delta = originX - evt.pageX;
      draggedDay = day + Math.round(365 * (delta / 400));
      update(draggedDay);
    }

    function mouseup(evt) {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      day = draggedDay;
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  });

var moon = svg
  .append('circle')
  .attr('r', moonR)
  .attr('fill', '#999');

var day = 0;
var dayLength = 1000 * 60 * 60 * 24;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function update(d) {
  d = d || day;
  var earthX = cx + earthOrbitR * Math.cos(earthDaysScale(d));
  var earthY = cy + earthOrbitR * Math.sin(earthDaysScale(d));

  var moonX = earthX + moonOrbitR * Math.cos(moonDaysScale(d));
  var moonY = earthY + moonOrbitR * Math.sin(moonDaysScale(d));

  earth
    .attr('cx', earthX)
    .attr('cy', earthY);

  moon
    .attr('cx', moonX)
    .attr('cy', moonY);

  var date = new Date(epoch + (d * dayLength));
  var dateStr = months[date.getMonth()] +' ';
  dateStr += date.getDate() + ', ';
  dateStr += date.getFullYear();
  document.getElementById('date').innerText = dateStr;
}

//setInterval(update, 200);
update();