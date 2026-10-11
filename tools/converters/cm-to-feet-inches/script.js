ARIXO.tool({ compute(v) {
  const f = (n, d) => parseFloat(n.toFixed(d)).toString();
  if (v.cm !== null) {
    if (v.cm < 0) return { error: "Height cannot be negative." };
    const totalIn = v.cm / 2.54;
    let ft = Math.floor(totalIn / 12);
    let inch = Math.round((totalIn - ft * 12) * 100) / 100;
    if (inch >= 12) { ft += 1; inch = 0; }
    return { main: [v.cm + " cm equals", ft + " ft " + f(inch, 2) + " in"], items: [["Total inches", f(totalIn, 2)], ["Total feet", f(totalIn / 12, 3)], ["Meters", f(v.cm / 100, 3)]] };
  }
  if (v.ft !== null || v.inch !== null) {
    const ft = v.ft || 0, inch = v.inch || 0;
    if (ft < 0 || inch < 0) return { error: "Feet and inches cannot be negative." };
    const cm = (ft * 12 + inch) * 2.54;
    return { main: [ft + " ft " + inch + " in equals", f(cm, 2) + " cm"], items: [["Meters", f(cm / 100, 3)], ["Total inches", f(ft * 12 + inch, 2)]] };
  }
  return { error: "Enter centimeters, or feet and inches." };
}});