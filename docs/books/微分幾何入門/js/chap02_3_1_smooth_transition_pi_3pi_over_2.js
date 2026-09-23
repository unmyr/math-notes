function exp_neg_inv_x(x) {
  return x > 0 ? Math.exp(-1 / x) : 0;
}

function smooth_partition_of_unity(x, a, b) {
  const psi_a = exp_neg_inv_x(x - a);
  const psi_b = exp_neg_inv_x(b - x);
  const denom = psi_a + psi_b;
  return psi_a / denom;
}

const v1V2OverlapStart = Math.PI;
const v1V2OverlapEnd = 1.5 * Math.PI;
const v2RangeEnd = 2.5 * Math.PI;

const xs = [];
const rho1s = [];
const rho2s = [];

// V₁ = {θ∈R | θ∈(0,3π/2)},φ₁((cos θ,sin θ))=θ, U₁ = φ₁⁻¹(V₁) = {(cos θ,sin θ)|θ∈V₁}
// V₂ = {θ∈R | θ∈(π,5π/2)},φ₂((cos θ,sin θ))=θ, U₂ = φ₂⁻¹(V₂) = {(cos θ,sin θ)|θ∈V₂}
// 1 = ρ₁ + ρ₂
for (let x = -0.5 * Math.PI; x <= 3 * Math.PI; x += 0.01) {
  // ρ₁∘φ₁⁻¹(θ):
  // ρ₁∘φ₁⁻¹(θ) = f_[0,π/2](θ) for θ in (0,3π/4]
  // ρ₁∘φ₁⁻¹(θ) = 1 - f_[π,3π/2](θ) for θ in (3π/4,3π/2)
  // ρ₁∘φ₁⁻¹(θ) = 0 for θ in [3π/2,2π]
  const rho1 = function (theta) {
    if (theta <= 0 || theta >= (3 * Math.PI) / 2) {
      // If φ₁⁻¹(θ) not in U₁, return 0
      return 0;
    }
    // From here, all θ are in V₁(=φ₁(U₁))
    if (0 < theta && theta <= (3 * Math.PI) / 4) {
      // θ in (0, 3π/4]
      // φ₁⁻¹((0,π/2)) ∈ U₁ ∩ U₂ → (0,1) ∈ f_[0,π/2](θ)
      // φ₁⁻¹((π/2,3π/4]) ∉ U₁ ∩ U₂ → 1 ∈ f_[0,π/2](θ)
      const a = 0;
      const b = 0.5 * Math.PI;
      return smooth_partition_of_unity(theta, a, b);
    } else if ((3 * Math.PI) / 4 < theta && theta < (3 * Math.PI) / 2) {
      const a = Math.PI;
      const b = (3 * Math.PI) / 2;
      return 1 - smooth_partition_of_unity(theta, a, b);
    } else {
      // φ₁⁻¹(θ) not in U₁
      return 0;
    }
  };

  // ρ₂∘φ₂⁻¹(θ):
  // ρ₂∘φ₂⁻¹(θ) = 0 for θ in [0,π]
  // ρ₂∘φ₂⁻¹(θ) = 1 - ρ₁∘φ₁⁻¹(θ) = f_[π,3π/2](θ) for θ in (π,3π/2)
  // ρ₂∘φ₂⁻¹(θ) = 1 for θ in (3π/2,5π/2)
  // ρ₂∘φ₂⁻¹(θ) = 0 for θ in otherwise
  const rho2 = function (theta) {
    if (theta <= Math.PI || theta >= (5 * Math.PI) / 2) {
      // If φ₂⁻¹(θ) not in U₂, return 0
      return 0;
    }
    // From here, all θ are in V₂(=φ₂(U₂))
    if (Math.PI < theta && theta <= (3 * Math.PI) / 2) {
      // θ in (π,3π/2): φ₂⁻¹(θ) ∈ U₂ ∩ U₁
      return 1 - rho1(theta);
    } else if ((3 * Math.PI) / 2 < theta && theta <= 2 * Math.PI) {
      // θ in (3π/2,2π): φ₂⁻¹(θ) ∉ U₁ ∩ U₂
      return 1;
    } else if (2 * Math.PI < theta && theta < (5 * Math.PI) / 2) {
      // θ in (2π,5π/2): On S¹, U₂=φ₂⁻¹(0<θ<(5π/2)) is overlapping with U₁=φ₁⁻¹(0<θ<π/2), but θ is not in V₁ ∩ V₂
      const a = 2 * Math.PI;
      const b = v2RangeEnd;
      return 1 - smooth_partition_of_unity(theta, a, b);
    } else {
      // In case of θ is not contained in V₂. A fallback mechanism to handle cases where the condition check is incorrect.
      return 0;
    }
  };

  xs.push(x);
  rho1s.push(rho1(x));
  rho2s.push(rho2(x));
}

const traceRho1 = {
  x: xs,
  y: rho1s,
  mode: "lines",
  name: "ρ₁(x)",
  line: {
    color: "#d62728",
    width: 2,
  },
};

const traceRho2 = {
  x: xs,
  y: rho2s,
  mode: "lines",
  name: "ρ₂(x)",
  line: {
    color: "#1f77b4",
    width: 2,
  },
};

const layout_smooth_transition_pi_3pi_over_2 = {
  title: "Smooth Partition of Unity with a = π and b = 3π/2",
  xaxis: {
    title: "x",
    zeroline: true,
  },
  yaxis: {
    title: "ρ₁(x), ρ₂(x)",
    range: [-0.05, 1.05],
    zeroline: true,
  },
  shapes: [
    {
      type: "line",
      x0: Math.PI / 2,
      x1: Math.PI / 2,
      y0: 0,
      y1: 1,
      line: {
        color: "#888",
        width: 1,
        dash: "dot",
      },
    },
    {
      type: "line",
      x0: v1V2OverlapStart,
      x1: v1V2OverlapStart,
      y0: 0,
      y1: 1,
      line: {
        color: "#888",
        width: 1,
        dash: "dot",
      },
    },
    {
      type: "line",
      x0: v1V2OverlapEnd,
      x1: v1V2OverlapEnd,
      y0: 0,
      y1: 1,
      line: {
        color: "#888",
        width: 1,
        dash: "dot",
      },
    },
    {
      type: "line",
      x0: 2 * Math.PI,
      x1: 2 * Math.PI,
      y0: 0,
      y1: 1,
      line: {
        color: "#888",
        width: 1,
        dash: "dot",
      },
    },
  ],
  annotations: [
    {
      x: 0.75 * Math.PI,
      y: 1.02,
      text: "$\\frac{3\\pi}{4}$",
      showarrow: false,
    },
    {
      x: 0.5 * Math.PI,
      y: 1.02,
      text: "$\\frac{\\pi}{2}$",
      showarrow: false,
    },
    {
      x: v1V2OverlapStart,
      y: 1.02,
      text: "$\\pi$",
      showarrow: false,
    },
    {
      x: v1V2OverlapEnd,
      y: 1.02,
      text: "$\\frac{3\\pi}{2}$",
      showarrow: false,
    },
    {
      x: 2 * Math.PI,
      y: 1.02,
      text: "$2\\pi$",
      showarrow: false,
    },
    {
      x: v2RangeEnd,
      y: 1.02,
      text: "$\\frac{5\\pi}{2}$",
      showarrow: false,
    },
  ],
};

Plotly.newPlot(
  "chap02_3_1_smooth_transition_pi_3pi_over_2_plot_area",
  [traceRho1, traceRho2],
  layout_smooth_transition_pi_3pi_over_2,
);
