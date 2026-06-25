// ===== UTIL: SHA-256 HASH =====
async function hash(text) {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ===== INIT SYSTEM =====
let ADMIN_USER = "Astin";

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ===== FIRST TIME SETUP =====
function setup() {
  setupScreen.classList.remove("hidden");
  login.classList.add("hidden");
}

// Force first admin password change
async function saveNewPassword() {
  const pass = document.getElementById("newPass").value;
  const hashed = await hash(pass);

  let users = getUsers();

  users[ADMIN_USER] = {
    pass: hashed,
    role: "admin"
  };

  saveUsers(users);

  alert("Password set. Now login.");
  location.reload();
}

// ===== LOGIN =====
async function login() {
  const u = user.value;
  const p = pass.value;

  let users = getUsers();

  if (!users[u]) {
    alert("User not found");
    return;
  }

  const hashed = await hash(p);

  if (hashed === users[u].pass) {
    localStorage.setItem("session", u);
    showHome(u);
  } else {
    alert("Wrong password");
  }
}

// ===== AUTO LOGIN =====
window.onload = () => {
  const session = localStorage.getItem("session");
  if (session) showHome(session);
};

function showHome(u) {
  login.classList.add("hidden");
  home.classList.remove("hidden");

  welcome.innerText = "Logged in as " + u;

  loadNotes();
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("session");
  location.reload();
}

// ===== ADMIN WIPE =====
function wipe() {
  if (localStorage.getItem("session") !== ADMIN_USER) {
    alert("Admin only");
    return;
  }

  localStorage.clear();
  alert("System wiped");
  location.reload();
}

// ===== NOTES =====
function saveNotes() {
  localStorage.setItem("notes_" + localStorage.getItem("session"), notes.value);
}

function loadNotes() {
  const u = localStorage.getItem("session");
  notes.value = localStorage.getItem("notes_" + u) || "";
}
