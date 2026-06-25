// ---------- HASH ----------
async function hash(text) {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// ---------- STORAGE ----------
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(u) {
  localStorage.setItem("users", JSON.stringify(u));
}

// ---------- FIRST SETUP ----------
function firstSetup() {
  loginScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
}

async function createAdmin() {
  const pass = newPass.value;
  const users = getUsers();

  users["Astin"] = {
    pass: await hash(pass),
    role: "admin"
  };

  saveUsers(users);

  alert("Admin created. Now login.");
  location.reload();
}

// ---------- LOGIN ----------
async function login() {
  const u = user.value;
  const p = pass.value;

  const users = getUsers();

  if (!users[u]) return alert("User not found");

  const ok = await hash(p);

  if (ok === users[u].pass) {
    localStorage.setItem("session", u);
    openHome(u);
  } else {
    alert("Wrong password");
  }
}

// ---------- AUTO LOGIN ----------
window.onload = () => {
  const s = localStorage.getItem("session");
  if (s) openHome(s);
};

// ---------- HOME ----------
function openHome(u) {
  loginScreen.classList.add("hidden");
  setupScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");

  status.innerText = "Logged in as " + u;

  loadNotes();
}

// ---------- LOCK ----------
function lock() {
  localStorage.removeItem("session");
  location.reload();
}

// ---------- NOTES ----------
function saveNotes() {
  const u = localStorage.getItem("session");
  localStorage.setItem("notes_" + u, notes.value);
}

function loadNotes() {
  const u = localStorage.getItem("session");
  notes.value = localStorage.getItem("notes_" + u) || "";
}

// ---------- LIGHT CONTROL (placeholder) ----------
function toggleLight() {
  alert("Light system not connected yet");
}
