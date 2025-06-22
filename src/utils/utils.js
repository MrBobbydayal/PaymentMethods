
export function isValidCardNumber(num) {
  return /^\d{16}$/.test(num.replace(/\s/g, ""));
}

export function isValidExpiry(val) {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val)) return false;
  const [mm, yy] = val.split("/").map(Number);
  const exp = new Date(2000 + yy, mm - 1, 1);
  return exp > new Date(new Date().getFullYear(), new Date().getMonth(), 1);
}

export function isValidCVV(cvv, isAmex = false) {
  return new RegExp(`^\\d{${isAmex ? 4 : 3}}$`).test(cvv);
}
