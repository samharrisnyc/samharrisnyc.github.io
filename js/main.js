(() => {
  const year = new Date().getFullYear();
  ["y", "year"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  const overlay = document.querySelector(".grid-overlay");
  if (overlay) {
    overlay.hidden = !document.body.hasAttribute("data-grid");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "g") return;
    if (/input|textarea|select/i.test(e.target.tagName)) return;
    document.body.toggleAttribute("data-grid");
    if (overlay) overlay.hidden = !document.body.hasAttribute("data-grid");
  });

  const dir = document.querySelector(".project-directory");
  if (!dir) return;

  const items = Array.from(dir.querySelectorAll("details.dir-item"));
  const openItem = (itemToOpen) => {
    items.forEach((item) => {
      if (item !== itemToOpen) item.open = false;
    });
    itemToOpen.open = true;
  };

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      openItem(item);
    });
  });

})();
