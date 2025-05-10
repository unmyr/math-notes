import cmath
import math


def f(x):
    return 2 * x / (1 - x * x)


initial_values = [
    0,
    -1j,
    1j,
    -math.sqrt(3),
    math.sqrt(3),
    -math.sqrt(5 + 2 * math.sqrt(5)),
    math.sqrt(5 + 2 * math.sqrt(5)),
    math.sqrt(5 - 2 * math.sqrt(5)),
    -math.sqrt(5 - 2 * math.sqrt(5)),
    -math.sqrt(
        23
        + 2 * math.pow(5, 1.5)
        + 2 * math.sqrt(3 * 5 * 17 + 2 * 3 * 19 * math.sqrt(5))
    ),
    math.sqrt(
        23
        + 2 * math.pow(5, 1.5)
        + 2 * math.sqrt(3 * 5 * 17 + 2 * 3 * 19 * math.sqrt(5))
    ),
    -math.sqrt(
        23
        - 2 * math.pow(5, 1.5)
        + 2 * math.sqrt(3 * 5 * 17 - 2 * 3 * 19 * math.sqrt(5))
    ),
    math.sqrt(
        23
        - 2 * math.pow(5, 1.5)
        + 2 * math.sqrt(3 * 5 * 17 - 2 * 3 * 19 * math.sqrt(5))
    ),
    -math.sqrt(
        23
        + 2 * math.pow(5, 1.5)
        - 2 * math.sqrt(3 * 5 * 17 + 2 * 3 * 19 * math.sqrt(5))
    ),
    math.sqrt(
        23
        + 2 * math.pow(5, 1.5)
        - 2 * math.sqrt(3 * 5 * 17 + 2 * 3 * 19 * math.sqrt(5))
    ),
    -math.sqrt(
        23
        - 2 * math.pow(5, 1.5)
        - 2 * math.sqrt(3 * 5 * 17 - 2 * 3 * 19 * math.sqrt(5))
    ),
    math.sqrt(
        23
        - 2 * math.pow(5, 1.5)
        - 2 * math.sqrt(3 * 5 * 17 - 2 * 3 * 19 * math.sqrt(5))
    ),
    -1.111,
    -0.445,
    -0.213,
]
for x0 in initial_values:
    y = f(x0)
    z = f(y)
    w = f(z)
    x1 = f(w)
    print(
        f"f({x0:+.4f})={y:+.4f}, f^2={z:+.4f}, f^3={w:+.4f}, f^4={x1:+.4f}, error={cmath.sqrt((x1 - x0)*(x1 - x0)):.4f}"
    )
