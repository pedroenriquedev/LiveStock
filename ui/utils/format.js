export function formatDate(date) {
  const str = new Date(date).toLocaleDateString("pt-BR");
  if (str === "Invalid Date") {
    return "N/A";
  }
  return str;
}

export function formateGrowth(growthRatio) {
  if (growthRatio === undefined) return "0%";
  return `${Number(
    Math.round(parseFloat(growthRatio + "e" + 2)) + "e-" + 2
  ).toFixed(2)}%`;
}

export function formateFloat(float) {
  if (float === undefined) return "0%";
  return `${Number(Math.round(parseFloat(float + "e" + 2)) + "e-" + 2).toFixed(
    2
  )}`;
}

export function formatePrice(price) {
  return `${Number(Math.round(parseFloat(price + "e" + 2)) + "e-" + 2).toFixed(
    2
  )}`;
}
