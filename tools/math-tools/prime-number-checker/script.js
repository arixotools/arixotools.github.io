ARIXO.tool({ compute(v) {
  if (v.n === null) return { error: "Enter a whole number." };
  const n = v.n;
  if (!Number.isInteger(n) || n < 2) return { error: "Enter a whole number of 2 or more." };
  if (n > 1e12) return { error: "Use a number up to 1,000,000,000,000." };
  const isPrime = (x) => { if (x < 2) return false; if (x % 2 === 0) return x === 2; for (let i = 3; i * i <= x; i += 2) if (x % i === 0) return false; return true; };
  const factors = [];
  let m = n;
  for (let p = 2; p * p <= m; p += (p === 2 ? 1 : 2)) { let c = 0; while (m % p === 0) { m /= p; c++; } if (c) factors.push([p, c]); }
  if (m > 1) factors.push([m, 1]);
  const prime = factors.length === 1 && factors[0][1] === 1;
  const fmt = (x) => x.toLocaleString("en-US");
  let prev = n - 1; while (prev >= 2 && !isPrime(prev)) prev--;
  let next = n + 1; while (!isPrime(next)) next++;
  const fac = factors.map((f) => fmt(f[0]) + (f[1] > 1 ? "^" + f[1] : "")).join(" × ");
  return { main: [fmt(n), prime ? "is a prime number" : "is not a prime number"], items: [["Prime factorisation", prime ? fmt(n) + " (prime)" : fac], ["Previous prime", prev >= 2 ? fmt(prev) : "None"], ["Next prime", fmt(next)]] };
}});