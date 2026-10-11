ARIXO.tool({ compute(v) {
  if (v.age === null || v.height === null || v.weight === null) return { error: "Enter your age, height and weight." };
  if (v.age < 15 || v.age > 100) return { error: "This calculator is for ages 15 to 100." };
  if (v.height < 100 || v.height > 250 || v.weight < 30 || v.weight > 300) return { error: "Check your height (100 to 250 cm) and weight (30 to 300 kg)." };
  const bmr = 10 * v.weight + 6.25 * v.height - 5 * v.age + (v.sex === "m" ? 5 : -161);
  const tdee = bmr * parseFloat(v.act);
  const r = (n) => Math.round(n).toLocaleString("en-IN");
  return { main: ["Daily calories to maintain weight (TDEE)", r(tdee) + " kcal"], items: [["BMR (at rest)", r(bmr) + " kcal"], ["Mild deficit (about -250)", r(tdee - 250) + " kcal"], ["Mild surplus (about +250)", r(tdee + 250) + " kcal"]], stats: "Estimates only. Not medical advice." };
}});