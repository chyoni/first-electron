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
