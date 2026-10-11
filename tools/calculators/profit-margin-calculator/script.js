ARIXO.tool({ compute(v) {
  if (v.cost === null || v.cost <= 0) return { error: "Enter the cost price." };
  const inr = (n) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const p = (n) => n.toFixed(2) + "%";
  if (v.price !== null) {
    if (v.price <= 0) return { error: "Selling price must be greater than zero." };
    const profit = v.price - v.cost;
    return { main: ["Profit margin", p(profit / v.price * 100)], items: [["Profit", inr(profit)], ["Markup", p(profit / v.cost * 100)], ["Cost price", inr(v.cost)], ["Selling price", inr(v.price)]] };
  }
  if (v.target !== null) {
    if (v.target < 0 || v.target >= 100) return { error: "Target margin must be from 0% up to less than 100%." };
    const price = v.cost / (1 - v.target / 100);
    return { main: ["Selling price needed", inr(price)], items: [["Profit", inr(price - v.cost)], ["Margin", p(v.target)], ["Markup", p((price - v.cost) / v.cost * 100)]] };
  }
  return { error: "Enter a selling price, or a target margin." };
}});