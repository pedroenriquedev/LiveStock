export function getTodayString() {
  const today = new Date(Date.now()).toLocaleDateString().split("/");
  const todayString = `${today[2]}-${
    parseInt(today[0]) < 10 ? `0${today[0]}` : today[0]
  }-${parseInt(today[1]) < 10 ? `0${today[1]}` : today[1]}`;
  return todayString;
}
