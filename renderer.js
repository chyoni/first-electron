const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    console.log("?");
    const isDarkMode = await window.darkMode.toggle();
    console.log("?!");
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "System";
  });

document.getElementById("drag1").ondragstart = (event) => {
  event.preventDefault();
  window.drag.startDrag("drag-and-drop-1.md");
};

document.getElementById("drag2").ondragstart = (event) => {
  event.preventDefault();
  window.drag.startDrag("drag-and-drop-2.md");
};
