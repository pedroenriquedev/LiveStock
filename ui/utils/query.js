export function getQueryStrFromArr(array, field) {
  if (array.includes(`${field}=null`)) {
    return `${field}=null`;
  } else {
    const filteredArr = array.filter((str) => str !== `${field}=null`);

    const finalArr = filteredArr.map((str) => `${field}=${str}`);

    return finalArr.join("&");
  }
}
