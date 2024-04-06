let cross = document.querySelector(".cross");
let cros = document.querySelector(".cros");

function addSite() {
  document.querySelector(".siteform").style.display = "block";
  document.querySelector(".show").style.filter = "blur(20px)";
}
cross.addEventListener("click", () => {
  document.querySelector(".siteform").style.display = "none";
  document.querySelector(".show").style.filter = "none";
});
cros.addEventListener("click", () => {
  document.querySelector(".advform").style.display = "none";
  document.querySelector(".show").style.filter = "none";
});
function addadv() {
  document.querySelector(".advform").style.display = "block";
  document.querySelector(".show").style.filter = "blur(20px)";
}
