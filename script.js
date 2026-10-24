// MR CERAMICS site script
(function () {
  // Mobile menu
  var burger = document.querySelector(".burger"), menu = document.getElementById("menu");
  if (burger && menu) burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Filter chips (products + inspiration)
  document.querySelectorAll("[data-filter-group]").forEach(function (bar) {
    var items = document.querySelectorAll(bar.getAttribute("data-filter-group"));
    function apply(key) {
      bar.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.dataset.key === key ? "true" : "false"); });
      items.forEach(function (el) { el.hidden = !(key === "all" || el.dataset.cat === key); });
    }
    bar.addEventListener("click", function (e) { var c = e.target.closest(".chip"); if (c) apply(c.dataset.key); });
    var h = (location.hash || "").slice(1);
    if (h && bar.querySelector('.chip[data-key="' + h + '"]')) apply(h);
  });

  // Before / after sliders
  document.querySelectorAll(".slider input").forEach(function (r) {
    r.addEventListener("input", function () { r.parentElement.style.setProperty("--pos", r.value + "%"); });
  });

  // Copy buttons
  document.querySelectorAll(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var text = b.dataset.text;
      function done() { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1500); }
      try { navigator.clipboard.writeText(text).then(done, function () {}); } catch (e) {}
    });
  });

  // Contact form -> WhatsApp message
  var form = document.getElementById("enquiry");
  if (form) {
    var link = document.getElementById("send-wa"), err = document.getElementById("form-error");
    function build() {
      var v = function (id) { return (document.getElementById(id).value || "").trim(); };
      var lines = ["Hi Mr Ceramics, I have an enquiry."];
      if (v("f-name")) lines.push("Name: " + v("f-name"));
      if (v("f-phone")) lines.push("Phone: " + v("f-phone"));
      if (v("f-email")) lines.push("Email: " + v("f-email"));
      if (v("f-topic")) lines.push("About: " + v("f-topic"));
      if (v("f-msg")) lines.push("", v("f-msg"));
      link.href = "https://wa.me/60126791315?text=" + encodeURIComponent(lines.join("\n"));
      return v("f-name") && v("f-msg");
    }
    form.addEventListener("input", function () { build(); err.hidden = true; });
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    link.addEventListener("click", function (e) {
      if (!build()) { e.preventDefault(); err.hidden = false; }
    });
    build();
  }
})();
