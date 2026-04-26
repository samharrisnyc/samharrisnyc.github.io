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

  const browser = document.querySelector("[data-project-browser]");
  if (!browser) return;

  const tabs = Array.from(browser.querySelectorAll("[data-project-tab]"));
  const panels = Array.from(browser.querySelectorAll("[data-project-panel]"));
  const selectProject = (projectId, focusTab = false) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.projectTab === projectId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focusTab) tab.focus();
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.projectPanel === projectId;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectProject(tab.dataset.projectTab);
    });

    tab.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();

      let nextIndex = index;
      if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = tabs.length - 1;

      selectProject(tabs[nextIndex].dataset.projectTab, true);
    });
  });
})();
