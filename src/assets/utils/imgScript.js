export function getImgUrl(fileName) {
  if (!fileName) return "src/assets/vue.svg";

  return `http://localhost:8080/identity/uploads/${fileName}`;
}
