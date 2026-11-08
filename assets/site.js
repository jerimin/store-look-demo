(function () {
  var drawer = document.getElementById("drawer"), scrim = document.getElementById("scrim");
  function toggle(on) { drawer.classList.toggle("open", on); scrim.classList.toggle("open", on); document.body.classList.toggle("lock", on); }
  document.querySelectorAll("[data-drawer]").forEach(function (b) { b.addEventListener("click", function () { toggle(b.dataset.drawer === "open"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });

  document.querySelectorAll("[data-go]").forEach(function (b) {
    b.addEventListener("click", function () {
      var rail = b.closest(".block").querySelector(".rail");
      rail.scrollBy({ left: Number(b.dataset.go) * rail.clientWidth * 0.8, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); f.querySelector("output").textContent = "This is a sample form. Nothing was sent."; });
  });

  var grid = document.querySelector(".grid");
  if (!grid) return;
  var q = new URLSearchParams(location.search), cat = q.get("cat") || "", term = (q.get("q") || "").trim().toLowerCase(), shown = 0;
  grid.querySelectorAll(".card").forEach(function (c) {
    var ok = (!cat || c.dataset.cat === cat) && (!term || c.dataset.name.indexOf(term) !== -1);
    c.hidden = !ok; if (ok) shown++;
  });
  document.getElementById("count").textContent = shown ? "Showing " + shown + " product" + (shown === 1 ? "" : "s") : "No products match your search.";
  document.querySelectorAll("[data-side]").forEach(function (a) { a.classList.toggle("on", a.dataset.side === cat); });
  var box = document.querySelector(".search"); box.elements.cat.value = cat; box.elements.q.value = q.get("q") || "";
})();
