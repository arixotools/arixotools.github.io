ARIXO.tool({ compute(v) {
  if (v.a === null || v.b === null || v.c === null) return { error: "Enter a, b and c." };
  if (v.a === 0) return { error: "'a' cannot be zero in a quadratic equation. With a = 0 it is a linear equation." };
  const r = (x) => parseFloat(x.toFixed(6)).toString();
  const D = v.b * v.b - 4 * v.a * v.c;
  const eq = (v.a + "x² + " + v.b + "x + " + v.c + " = 0").replace(/\+ -/g, "− ");
  if (D > 0) {
    const s = Math.sqrt(D), x1 = (-v.b + s) / (2 * v.a), x2 = (-v.b - s) / (2 * v.a);
    return { main: ["Two real roots", "x₁ = " + r(Math.max(x1, x2)) + ", x₂ = " + r(Math.min(x1, x2))], items: [["Discriminant", r(D)], ["Equation", eq]] };
  }
  if (D === 0) return { main: ["One repeated real root", "x = " + r(-v.b / (2 * v.a))], items: [["Discriminant", "0"], ["Equation", eq]] };
  const re = -v.b / (2 * v.a), im = Math.sqrt(-D) / (2 * Math.abs(v.a));
  return { main: ["Two complex roots", r(re) + " ± " + r(im) + "i"], items: [["Discriminant", r(D)], ["Equation", eq]] };
}});