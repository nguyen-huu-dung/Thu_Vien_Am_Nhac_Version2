// Định tuyến
const root = null;
const useHash = true; // Defaults to: false
const hash = "#v"; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

const $app = document.getElementById("app");
