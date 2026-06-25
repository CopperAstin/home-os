function openApp(app) {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  const content = document.getElementById("appContent");

  if (app === "notes") {
    content.innerHTML = `
      <h2>Notes</h2>
      <textarea id="noteBox" placeholder="Write something..."></textarea>
    `;

    document.getElementById("noteBox").value =
      localStorage.getItem("notes") || "";

    document.getElementById("noteBox").addEventListener("input", (e) => {
      localStorage.setItem("notes", e.target.value);
    });
  }

  if (app === "tools") {
    content.innerHTML = `
      <h2>Tools</h2>
      <p>More tools coming soon...</p>
    `;
  }

  if (app === "about") {
    content.innerHTML = `
      <h2>About Home OS</h2>
      <p>Your personal mobile system built in the browser.</p>
    `;
  }
}

function closeApp() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}
