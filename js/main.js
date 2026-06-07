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
  const tabKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];

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
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  };

  const getNextIndex = (currentIndex, key) => {
    if (key === "Home") return 0;
    if (key === "End") return tabs.length - 1;
    if (key === "ArrowLeft" || key === "ArrowUp") {
      return (currentIndex - 1 + tabs.length) % tabs.length;
    }
    return (currentIndex + 1) % tabs.length;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectProject(tab.dataset.projectTab);
    });

    tab.addEventListener("keydown", (e) => {
      if (!tabKeys.includes(e.key)) return;
      e.preventDefault();

      const nextIndex = getNextIndex(index, e.key);
      selectProject(tabs[nextIndex].dataset.projectTab, true);
    });
  });

  const activeTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
  if (activeTab) selectProject(activeTab.dataset.projectTab);
})();
