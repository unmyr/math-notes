const xLeft = [];
const yLeft = [];
for (let x = -0.2; x <= 0; x += 0.01) {
  xLeft.push(x);
  yLeft.push(0);
}

const xRight = [];
const yRight = [];
for (let x = 0.01; x <= 2 * Math.PI; x += 0.01) {
  xRight.push(x);
  yRight.push(Math.exp(-1 / x));
}

const traceLeft = {
  x: xLeft,
  y: yLeft,
  mode: 'lines',
  name: 'x <= 0',
  line: {
    color: '#1f77b4',
    width: 2
  }
};

const traceRight = {
  x: xRight,
  y: yRight,
  mode: 'lines',
  name: 'e^(-1/x)  x > 0',
  line: {
    color: '#d62728',
    width: 2
  }
};

const layout_exp_neg_inv_x_piecewise = {
  title: 'f(x) = e^(-1/x) for x > 0, 0 for x <= 0',
  xaxis: {
    title: 'x',
    zeroline: true
  },
  yaxis: {
    title: 'f(x)',
    zeroline: true
  },
  showlegend: true,
  margin: {
    l: 60,
    r: 20,
    t: 50,
    b: 50
  }
};

Plotly.newPlot('chap02_3_1_exp_neg_inv_x_piecewise_plot_area', [traceLeft, traceRight], layout_exp_neg_inv_x_piecewise);