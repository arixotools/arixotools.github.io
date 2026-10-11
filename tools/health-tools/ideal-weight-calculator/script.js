ARIXO.tool({ compute(v) {
  if (v.height === null) return { error: "Enter your height in centimeters." };
  if (v.height < 140 || v.height > 220) return { error: "This calculator works for heights from 140 to 220 cm." };
  const inch = v.height / 2.54, over = inch - 60, m = v.sex === "m";
  const devine = (m ? 50 : 45.5) + 2.3 * over;
  const robinson = m ? 52 + 1.9 * over : 49 + 1.7 * over;
  const miller = m ? 56.2 + 1.41 * over : 53.1 + 1.36 * over;
  const hamwi = m ? 48 + 2.7 * over : 45.5 + 2.2 * over;
  const hm = v.height / 100;
  const lo = 18.5 * hm * hm, hi = 24.9 * hm * hm;
  const f = (x) => x.toFixed(1) + " kg";
  const avg = (devine + robinson + miller + hamwi) / 4;
  return { main: ["Healthy BMI weight range", lo.toFixed(1) + " to " + hi.toFixed(1) + " kg"], items: [["Devine", f(devine)], ["Robinson", f(robinson)], ["Miller", f(miller)], ["Hamwi", f(hamwi)], ["Average of the four", f(avg)]], stats: "Estimates only. Not medical advice." };
}});