// Plot vector field X = x ∂/∂y - y ∂/∂x

let x_min = -5;
let x_max = 5;
let x_sample_size = 10;
let dx = (x_max - x_min) / x_sample_size;

let y_min = -5;
let y_max = 5;
let y_sample_size = 10;
let dy = (y_max - y_min) / y_sample_size;

const x = [];
const y = [];
const u = [];
const v = [];

// Generate vector field data
for (let i = x_min; i <= x_max; i += dx) {
  for (let j = y_min; j <= y_max; j += dy) {
    x.push(i);
    y.push(j);
    // x ∂/∂y - y ∂/∂x
    u.push(-j);
    v.push(i);
  }
}

var arrowLines = {
  x: [],
  y: [],
  mode: "lines",
  type: "scatter",
  line: { color: "blue" },
  hoverinfo: "none",
};

const arrowHeadSize = 0.2; // Length of the arrowhead
for (let k = 0; k < x.length; k++) {
  const x0 = x[k];
  const y0 = y[k];
  const x1 = x0 + u[k] * 0.2; // Scale the vector for better visualization
  const y1 = y0 + v[k] * 0.2;

  // line from (x0, y0) to (x1, y1)
  arrowLines.x.push(x0, x1, null);
  arrowLines.y.push(y0, y1, null);

  // Skip if the vector has zero length to avoid division by zero in angle calculation
  if (u[k] === 0 && v[k] === 0) {
    continue;
  }

  // Arrowhead angle is 135 degrees (3π/4 radians) from the vector direction
  const angle = Math.atan2(v[k], u[k]);
  const leftAngle = angle + (Math.PI * 3) / 4;
  const rightAngle = angle - (Math.PI * 3) / 4;

  arrowLines.x.push(x1, x1 + arrowHeadSize * Math.cos(leftAngle), null);
  arrowLines.y.push(y1, y1 + arrowHeadSize * Math.sin(leftAngle), null);

  arrowLines.x.push(x1, x1 + arrowHeadSize * Math.cos(rightAngle), null);
  arrowLines.y.push(y1, y1 + arrowHeadSize * Math.sin(rightAngle), null);
}

var cd_layout = {
  hovermode: "closest",
  autosize: false,
  width: 600,
  height: 600,
  xaxis: { range: [x_min, x_max], scaleanchor: "y", scaleratio: 1 },
  yaxis: { range: [y_min, y_max] },
  paper_bgcolor: "#efefef",
};

Plotly.newPlot("chap01_01_14_vector_field_plot_area", [arrowLines], cd_layout, {
  displayModeBar: false,
});
