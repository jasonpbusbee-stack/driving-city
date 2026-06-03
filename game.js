const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const pointsEl = document.querySelector("#points");
const speedEl = document.querySelector("#speed");
const damageEl = document.querySelector("#damage");
const modeEl = document.querySelector("#mode");
const arcadeButton = document.querySelector("#arcade");
const sandboxButton = document.querySelector("#sandbox");
const battleButton = document.querySelector("#battle");
const racingButton = document.querySelector("#racing");
const creatorButton = document.querySelector("#creator");
const mapsButton = document.querySelector("#maps");
const shopButton = document.querySelector("#shop");
const shopBackButton = document.querySelector("#shop-back");
const usernameForm = document.querySelector("#username-form");
const usernameInput = document.querySelector("#username-input");
const usernameDisplay = document.querySelector("#username-display");
const reportButton = document.querySelector("#report");
const reportBackButton = document.querySelector("#report-back");
const reportForm = document.querySelector("#report-form");
const bugReportText = document.querySelector("#bug-report-text");
const settingsButton = document.querySelector("#settings");
const settingsBackButton = document.querySelector("#settings-back");
const mapsBackButton = document.querySelector("#maps-back");
const creatorBackButton = document.querySelector("#creator-back");
const creatorForm = document.querySelector("#creator-form");
const customMapName = document.querySelector("#custom-map-name");
const customMapSeed = document.querySelector("#custom-map-seed");
const customMapStyle = document.querySelector("#custom-map-style");
const adminOpenButton = document.querySelector("#admin-open");
const adminBackButton = document.querySelector("#admin-back");
const adminGrantCarsButton = document.querySelector("#admin-grant-cars");
const adminGivePointsButton = document.querySelector("#admin-give-points");
const adminPointsAmountInput = document.querySelector("#admin-points-amount");
const adminSendAnnouncementButton = document.querySelector("#admin-send-announcement");
const adminAnnouncementText = document.querySelector("#admin-announcement-text");
const adminInvincibilityToggle = document.querySelector("#admin-invincibility");
const adminInfinitePointsToggle = document.querySelector("#admin-infinite-points");
const adminStatus = document.querySelector("#admin-status");
const restartButton = document.querySelector("#restart");
const menuButton = document.querySelector("#menu");
const mapToggleButton = document.querySelector("#map-toggle");
const touchControls = document.querySelector("#touch-controls");
const announcementEl = document.querySelector("#announcement");
const overlay = document.querySelector("#overlay");
const mainMenu = document.querySelector("#main-menu");
const mapPanel = document.querySelector("#map-panel");
const creatorPanel = document.querySelector("#creator-panel");
const shopPanel = document.querySelector("#shop-panel");
const reportPanel = document.querySelector("#report-panel");
const adminPanel = document.querySelector("#admin-panel");
const settingsPanel = document.querySelector("#settings-panel");
const menuKicker = document.querySelector("#menu-kicker");
const menuTitle = document.querySelector("#menu-title");
const mapList = document.querySelector("#map-list");
const shopList = document.querySelector("#shop-list");
const shopPointsEl = document.querySelector("#shop-points");
const carButtons = Array.from(document.querySelectorAll(".car-option"));
const swatchButtons = Array.from(document.querySelectorAll(".swatch"));
const lookButtons = Array.from(document.querySelectorAll(".look-option"));
const touchButtons = Array.from(document.querySelectorAll(".touch-button"));

const VIEW = { w: 1280, h: 720 };
const ROAD = 132;
const BLOCK = 460;
const LANES = 4;
const TRAFFIC_TARGET = 36;
const PICKUP_TARGET = 90;
const keys = new Set();
const rand = mulberry32(84);
const TOUCH_KEYS = {
  left: "arrowleft",
  right: "arrowright",
  throttle: "arrowup",
  brake: "arrowdown",
  boost: " ",
};

const SETTINGS = {
  background: "night",
  look: window.localStorage.getItem("cityDriveLook") || "clean",
};

const ADMIN_OPTIONS = {
  invincible: window.localStorage.getItem("cityDriveAdminInvincible") === "true",
  infinitePoints: window.localStorage.getItem("cityDriveAdminInfinitePoints") === "true",
};

const GAME_MODES = {
  arcade: "Arcade",
  sandbox: "Sandbox",
  battle: "Battle Royale",
  racing: "Racing",
  creator: "Create Map",
};

const THEMES = {
  night: {
    world: "#13201d",
    base: "#14221d",
    grid: "rgba(255,255,255,0.028)",
    road: "#20282b",
    roadEdge: "rgba(255,255,255,0.14)",
    line: "#e6d178",
    intersection: "rgba(111,227,165,0.18)",
    park: "rgba(111, 227, 165, 0.1)",
    parkLine: "rgba(111, 227, 165, 0.2)",
    buildingHue: 172,
  },
  dusk: {
    world: "#201824",
    base: "#241b25",
    grid: "rgba(255,202,100,0.035)",
    road: "#2a2428",
    roadEdge: "rgba(255,232,190,0.12)",
    line: "#ffca64",
    intersection: "rgba(255,202,100,0.16)",
    park: "rgba(255, 202, 100, 0.09)",
    parkLine: "rgba(255, 202, 100, 0.18)",
    buildingHue: 214,
  },
  rain: {
    world: "#10181a",
    base: "#121d1f",
    grid: "rgba(183,193,184,0.035)",
    road: "#1b2629",
    roadEdge: "rgba(220,235,235,0.13)",
    line: "#b7c1b8",
    intersection: "rgba(85,199,255,0.12)",
    park: "rgba(85, 199, 255, 0.08)",
    parkLine: "rgba(85, 199, 255, 0.16)",
    buildingHue: 180,
  },
  neon: {
    world: "#10161d",
    base: "#111b20",
    grid: "rgba(111,227,165,0.035)",
    road: "#1c2430",
    roadEdge: "rgba(111,227,165,0.16)",
    line: "#55c7ff",
    intersection: "rgba(255,109,109,0.14)",
    park: "rgba(111, 227, 165, 0.08)",
    parkLine: "rgba(255, 109, 109, 0.16)",
    buildingHue: 244,
  },
};

const MAPS = {
  tokyo: {
    label: "Tokyo",
    detail: "Dense neon blocks inspired by Tokyo, Japan.",
    world: "#121621",
    base: "#151b25",
    grid: "rgba(216,140,255,0.035)",
    road: "#202431",
    roadEdge: "rgba(216,140,255,0.16)",
    line: "#ff8bdc",
    intersection: "rgba(85,199,255,0.16)",
    park: "rgba(216,140,255,0.08)",
    parkLine: "rgba(85,199,255,0.16)",
    buildingHue: 250,
  },
  newyork: {
    label: "New York",
    detail: "Tall grid streets with cool glass towers.",
    world: "#12191c",
    base: "#151e21",
    grid: "rgba(246,241,231,0.035)",
    road: "#23292d",
    roadEdge: "rgba(246,241,231,0.15)",
    line: "#f6f1e7",
    intersection: "rgba(255,202,100,0.14)",
    park: "rgba(111,227,165,0.1)",
    parkLine: "rgba(111,227,165,0.2)",
    buildingHue: 198,
  },
  mountains: {
    label: "Mountains",
    detail: "Sparse roads, cold rock, and pine ridges.",
    world: "#15201a",
    base: "#17231c",
    grid: "rgba(111,227,165,0.03)",
    road: "#26302d",
    roadEdge: "rgba(183,193,184,0.14)",
    line: "#b7c1b8",
    intersection: "rgba(111,227,165,0.12)",
    park: "rgba(111,227,165,0.13)",
    parkLine: "rgba(111,227,165,0.24)",
    buildingHue: 135,
  },
  hawaii: {
    label: "Hawaii",
    detail: "Coastal color, bright roads, island greens.",
    world: "#102421",
    base: "#123028",
    grid: "rgba(93,242,214,0.035)",
    road: "#24413d",
    roadEdge: "rgba(93,242,214,0.16)",
    line: "#ffca64",
    intersection: "rgba(93,242,214,0.14)",
    park: "rgba(111,227,165,0.16)",
    parkLine: "rgba(255,202,100,0.18)",
    buildingHue: 160,
  },
  arctic: {
    label: "Arctic Circle",
    detail: "Ice roads, pale buildings, low contrast snow.",
    world: "#142026",
    base: "#18262d",
    grid: "rgba(246,241,231,0.04)",
    road: "#263942",
    roadEdge: "rgba(246,241,231,0.2)",
    line: "#9dd1ff",
    intersection: "rgba(157,209,255,0.16)",
    park: "rgba(157,209,255,0.08)",
    parkLine: "rgba(246,241,231,0.18)",
    buildingHue: 188,
  },
  farm: {
    label: "Farm",
    detail: "Open fields with quiet rural crossings.",
    world: "#182515",
    base: "#1d2b18",
    grid: "rgba(255,202,100,0.03)",
    road: "#2d2a22",
    roadEdge: "rgba(255,202,100,0.11)",
    line: "#a9b06a",
    intersection: "rgba(255,202,100,0.12)",
    park: "rgba(169,176,106,0.14)",
    parkLine: "rgba(255,202,100,0.18)",
    buildingHue: 80,
  },
  island: {
    label: "Deserted Island",
    detail: "Sand, palms, and washed-out service roads.",
    world: "#1f2318",
    base: "#272818",
    grid: "rgba(255,202,100,0.025)",
    road: "#343123",
    roadEdge: "rgba(255,202,100,0.14)",
    line: "#5df2d6",
    intersection: "rgba(255,202,100,0.13)",
    park: "rgba(93,242,214,0.1)",
    parkLine: "rgba(111,227,165,0.16)",
    buildingHue: 44,
  },
  mine: {
    label: "Mine",
    detail: "Dark quarry lanes with amber utility lights.",
    world: "#151414",
    base: "#1d1a18",
    grid: "rgba(255,139,77,0.035)",
    road: "#292520",
    roadEdge: "rgba(255,139,77,0.14)",
    line: "#ff8b4d",
    intersection: "rgba(255,139,77,0.12)",
    park: "rgba(255,139,77,0.07)",
    parkLine: "rgba(255,202,100,0.14)",
    buildingHue: 24,
  },
  canyon: {
    label: "Canyon",
    detail: "Red rock streets with long dusty runs.",
    world: "#211814",
    base: "#271a14",
    grid: "rgba(255,139,77,0.03)",
    road: "#33251e",
    roadEdge: "rgba(255,202,100,0.14)",
    line: "#ffca64",
    intersection: "rgba(255,109,109,0.14)",
    park: "rgba(255,139,77,0.08)",
    parkLine: "rgba(255,202,100,0.14)",
    buildingHue: 12,
  },
};

const ADMIN_OWNER_ID = "jasonpbusbee-stack";
const LOCAL_ADMIN_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const LEGACY_ADMIN_OWNER_IDS = new Set([ADMIN_OWNER_ID, "hunter"]);

const CARS = {
  sport: {
    label: "Sport",
    price: 0,
    color: "#6fe3a5",
    accent: "#101315",
    accel: 1.1,
    top: 1.14,
    handling: 1.03,
    boost: 1.08,
    damageTaken: 1,
    length: 58,
    width: 28,
  },
  taxi: {
    label: "Taxi",
    price: 120,
    color: "#ffca64",
    accent: "#1b1810",
    accel: 0.98,
    top: 0.98,
    handling: 0.98,
    boost: 1,
    damageTaken: 0.88,
    length: 60,
    width: 29,
  },
  cruiser: {
    label: "Cruiser",
    price: 180,
    color: "#55c7ff",
    accent: "#10151b",
    accel: 0.94,
    top: 1.02,
    handling: 1.22,
    boost: 0.94,
    damageTaken: 0.92,
    length: 54,
    width: 26,
  },
  heavy: {
    label: "Heavy",
    price: 260,
    color: "#ff6d6d",
    accent: "#1b1010",
    accel: 0.78,
    top: 0.86,
    handling: 0.76,
    boost: 0.78,
    damageTaken: 0.58,
    length: 72,
    width: 34,
  },
  roadster: {
    label: "Roadster",
    price: 340,
    color: "#f6f1e7",
    accent: "#111315",
    accel: 1.22,
    top: 1.18,
    handling: 1.08,
    boost: 1.1,
    damageTaken: 1.08,
    length: 52,
    width: 25,
  },
  drift: {
    label: "Drift",
    price: 430,
    color: "#d88cff",
    accent: "#18101f",
    accel: 1.02,
    top: 1.07,
    handling: 1.42,
    boost: 1,
    damageTaken: 1.02,
    length: 56,
    width: 27,
  },
  rally: {
    label: "Rally",
    price: 520,
    color: "#ff8b4d",
    accent: "#1d120e",
    accel: 1.08,
    top: 1,
    handling: 1.26,
    boost: 0.98,
    damageTaken: 0.82,
    length: 60,
    width: 30,
  },
  electric: {
    label: "Electric",
    price: 660,
    color: "#5df2d6",
    accent: "#0d1b19",
    accel: 1.35,
    top: 1.09,
    handling: 1.12,
    boost: 1.18,
    damageTaken: 0.96,
    length: 57,
    width: 27,
  },
  gt: {
    label: "GT",
    price: 820,
    color: "#9dd1ff",
    accent: "#101722",
    accel: 1.12,
    top: 1.32,
    handling: 1,
    boost: 1.25,
    damageTaken: 0.92,
    length: 64,
    width: 29,
  },
  titan: {
    label: "Titan",
    price: 980,
    color: "#a9b06a",
    accent: "#15170e",
    accel: 0.7,
    top: 0.8,
    handling: 0.66,
    boost: 0.72,
    damageTaken: 0.34,
    length: 82,
    width: 38,
  },
  muscle: {
    label: "Muscle",
    price: 1120,
    color: "#f04444",
    accent: "#1b0d0d",
    accel: 1.18,
    top: 1.18,
    handling: 0.9,
    boost: 1.12,
    damageTaken: 0.86,
    length: 66,
    width: 31,
  },
  compact: {
    label: "Compact",
    price: 1240,
    color: "#85f06c",
    accent: "#0f1b0e",
    accel: 1.28,
    top: 0.96,
    handling: 1.48,
    boost: 0.92,
    damageTaken: 1.04,
    length: 48,
    width: 24,
  },
  van: {
    label: "Van",
    price: 1380,
    color: "#ded7c4",
    accent: "#171511",
    accel: 0.82,
    top: 0.88,
    handling: 0.78,
    boost: 0.84,
    damageTaken: 0.52,
    length: 78,
    width: 36,
  },
  police: {
    label: "Interceptor",
    price: 1540,
    color: "#f4f8ff",
    accent: "#111822",
    accel: 1.18,
    top: 1.2,
    handling: 1.12,
    boost: 1.08,
    damageTaken: 0.82,
    length: 62,
    width: 29,
  },
  limo: {
    label: "Limo",
    price: 1710,
    color: "#22252a",
    accent: "#f6f1e7",
    accel: 0.76,
    top: 0.98,
    handling: 0.62,
    boost: 0.82,
    damageTaken: 0.48,
    length: 92,
    width: 33,
  },
  courier: {
    label: "Courier",
    price: 1880,
    color: "#43b7ff",
    accent: "#101722",
    accel: 1.16,
    top: 1.08,
    handling: 1.34,
    boost: 1.02,
    damageTaken: 0.9,
    length: 55,
    width: 26,
  },
  offroad: {
    label: "Offroad",
    price: 2060,
    color: "#8f6b42",
    accent: "#15100c",
    accel: 0.98,
    top: 0.94,
    handling: 1.08,
    boost: 0.9,
    damageTaken: 0.62,
    length: 68,
    width: 35,
  },
  formula: {
    label: "Formula",
    price: 2290,
    color: "#ff2f7d",
    accent: "#1c0d14",
    accel: 1.42,
    top: 1.42,
    handling: 1.32,
    boost: 1.3,
    damageTaken: 1.32,
    length: 60,
    width: 24,
  },
  coupe: {
    label: "Coupe",
    price: 2460,
    color: "#b991ff",
    accent: "#171023",
    accel: 1.16,
    top: 1.24,
    handling: 1.16,
    boost: 1.12,
    damageTaken: 0.94,
    length: 58,
    width: 27,
  },
  monster: {
    label: "Monster",
    price: 2680,
    color: "#5bff90",
    accent: "#0c1b12",
    accel: 0.74,
    top: 0.82,
    handling: 0.7,
    boost: 0.76,
    damageTaken: 0.28,
    length: 86,
    width: 42,
  },
  kart: {
    label: "Kart",
    price: 2890,
    color: "#ffea61",
    accent: "#1d1908",
    accel: 1.48,
    top: 0.9,
    handling: 1.7,
    boost: 0.9,
    damageTaken: 1.42,
    length: 42,
    width: 23,
  },
  bullet: {
    label: "Bullet",
    price: 3120,
    color: "#d7e4ff",
    accent: "#101723",
    accel: 1.3,
    top: 1.54,
    handling: 1.02,
    boost: 1.36,
    damageTaken: 1.18,
    length: 66,
    width: 28,
  },
  phantom: {
    label: "Phantom",
    price: 3380,
    color: "#7c8a99",
    accent: "#101315",
    accel: 1.08,
    top: 1.24,
    handling: 1.04,
    boost: 1.22,
    damageTaken: 0.7,
    length: 64,
    width: 30,
  },
  emerald: {
    label: "Emerald",
    price: 3620,
    color: "#19d982",
    accent: "#0b1a12",
    accel: 1.24,
    top: 1.22,
    handling: 1.2,
    boost: 1.18,
    damageTaken: 0.86,
    length: 57,
    width: 27,
  },
  inferno: {
    label: "Inferno",
    price: 3890,
    color: "#ff5a2f",
    accent: "#1b0f0a",
    accel: 1.36,
    top: 1.36,
    handling: 1.08,
    boost: 1.42,
    damageTaken: 1.1,
    length: 62,
    width: 28,
  },
  snowcat: {
    label: "Snowcat",
    price: 4160,
    color: "#c8f5ff",
    accent: "#102029",
    accel: 0.88,
    top: 0.9,
    handling: 0.92,
    boost: 0.82,
    damageTaken: 0.4,
    length: 80,
    width: 38,
  },
  islander: {
    label: "Islander",
    price: 4380,
    color: "#2ee6c7",
    accent: "#0d1b18",
    accel: 1.02,
    top: 1.02,
    handling: 1.18,
    boost: 1,
    damageTaken: 0.72,
    length: 61,
    width: 31,
  },
  miner: {
    label: "Miner",
    price: 4620,
    color: "#c89a54",
    accent: "#1a1208",
    accel: 0.7,
    top: 0.78,
    handling: 0.64,
    boost: 0.7,
    damageTaken: 0.24,
    length: 90,
    width: 42,
  },
  canyoner: {
    label: "Canyoner",
    price: 4920,
    color: "#d8663b",
    accent: "#21100b",
    accel: 0.96,
    top: 1,
    handling: 1.02,
    boost: 0.95,
    damageTaken: 0.56,
    length: 70,
    width: 35,
  },
  hyper: {
    label: "Hyper",
    price: 5400,
    color: "#8cf8ff",
    accent: "#101822",
    accel: 1.55,
    top: 1.68,
    handling: 1.22,
    boost: 1.58,
    damageTaken: 1.28,
    length: 64,
    width: 27,
  },
};

let lastTime = 0;
let running = false;
let loopActive = false;
let gameMode = "menu";
let selectedCarId = "sport";
let username = loadUsername();
let wallet = loadWallet();
let ownedCars = loadOwnedCars();
let currentMapId = window.localStorage.getItem("cityDriveMap") || "tokyo";
let customMap = loadCustomMap();
if (currentMapId !== "custom" && !MAPS[currentMapId]) currentMapId = "tokyo";
let miniMapExpanded = false;
let score = 0;
let bestCombo = 1;
let messageTimer = 0;
let message = "";
let checkpoint = null;

const player = {
  x: roadCoord(0),
  y: roadCoord(0),
  angle: -Math.PI / 2,
  speed: 0,
  damage: 0,
  boost: 100,
  invuln: 0,
  skid: 0,
};

const camera = { x: player.x - VIEW.w / 2, y: player.y - VIEW.h / 2 };
const traffic = [];
const pickups = [];
const sparks = [];

function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, amount) {
  return a + (b - a) * amount;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function currentTheme() {
  if (currentMapId === "custom") return customMap.theme;
  return MAPS[currentMapId] || MAPS.tokyo;
}

function loadCustomMap() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("cityDriveCustomMap") || "null");
    if (saved && saved.theme) return saved;
  } catch {
    // Fall through to default custom map.
  }

  return {
    label: "My Map",
    detail: "Custom seeded map.",
    seed: "custom",
    theme: { ...MAPS.tokyo, label: "My Map", detail: "Custom seeded map." },
  };
}

function saveCustomMap() {
  window.localStorage.setItem("cityDriveCustomMap", JSON.stringify(customMap));
}

function loadReports() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("cityDriveBugReports") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveReport(text) {
  const reports = loadReports();
  reports.push({
    text,
    username,
    mode: gameMode,
    map: currentMapId,
    createdAt: new Date().toISOString(),
  });
  window.localStorage.setItem("cityDriveBugReports", JSON.stringify(reports.slice(-30)));
}

function isLocalAdminHost() {
  return LOCAL_ADMIN_HOSTS.has(window.location.hostname);
}

function ensureLocalAdminSession() {
  if (!isLocalAdminHost()) return null;

  try {
    const session = JSON.parse(window.localStorage.getItem("cityDriveAdminSession") || "null");
    if (session && LEGACY_ADMIN_OWNER_IDS.has(session.accountId) && session.verified === true) {
      return session;
    }
  } catch {
    // Replace broken local admin data below.
  }

  const session = {
    accountId: ADMIN_OWNER_ID,
    verified: true,
    localOnly: true,
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem("cityDriveAdminSession", JSON.stringify(session));
  return session;
}

function isAdmin() {
  return Boolean(ensureLocalAdminSession());
}

function adminInvincible() {
  return isAdmin() && ADMIN_OPTIONS.invincible;
}

function adminInfinitePoints() {
  return isAdmin() && ADMIN_OPTIONS.infinitePoints;
}

function saveAdminOptions() {
  window.localStorage.setItem("cityDriveAdminInvincible", String(ADMIN_OPTIONS.invincible));
  window.localStorage.setItem("cityDriveAdminInfinitePoints", String(ADMIN_OPTIONS.infinitePoints));
}

function syncAdminControls() {
  const admin = isAdmin();
  adminInvincibilityToggle.checked = admin && ADMIN_OPTIONS.invincible;
  adminInfinitePointsToggle.checked = admin && ADMIN_OPTIONS.infinitePoints;
  adminInvincibilityToggle.disabled = !admin;
  adminInfinitePointsToggle.disabled = !admin;
  adminGivePointsButton.disabled = !admin;
  adminPointsAmountInput.disabled = !admin;
}

function loadAnnouncement() {
  try {
    return JSON.parse(window.localStorage.getItem("cityDriveAnnouncement") || "null");
  } catch {
    return null;
  }
}

function cleanUsername(value) {
  const text = String(value || "")
    .replace(/[^a-z0-9 _-]/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 18);
  return text || "Guest Driver";
}

function loadUsername() {
  return cleanUsername(window.localStorage.getItem("cityDriveUsername") || "Guest Driver");
}

function saveUsername() {
  window.localStorage.setItem("cityDriveUsername", username);
}

function updateUsernameUi() {
  usernameInput.value = username === "Guest Driver" ? "" : username;
  usernameDisplay.textContent = username;
}

function showAnnouncement() {
  const announcement = loadAnnouncement();
  if (!announcement || !announcement.text) {
    announcementEl.classList.add("hidden");
    announcementEl.textContent = "";
    return;
  }

  announcementEl.textContent = announcement.text;
  announcementEl.classList.remove("hidden");
}

function loadWallet() {
  const saved = Number(window.localStorage.getItem("cityDrivePoints") || "0");
  return Number.isFinite(saved) && saved > 0 ? Math.floor(saved) : 0;
}

function saveWallet() {
  window.localStorage.setItem("cityDrivePoints", String(wallet));
}

function loadOwnedCars() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("cityDriveOwnedCars") || "[]");
    const ids = new Set(Array.isArray(saved) ? saved.filter((id) => CARS[id]) : []);
    ids.add("sport");
    return ids;
  } catch {
    return new Set(["sport"]);
  }
}

function saveOwnedCars() {
  window.localStorage.setItem("cityDriveOwnedCars", JSON.stringify(Array.from(ownedCars)));
}

function ownsCar(id) {
  return ownedCars.has(id);
}

function randomRange(min, max) {
  return min + rand() * (max - min);
}

function randomInt(min, max) {
  return Math.floor(randomRange(min, max + 1));
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(320, Math.round(rect.width * scale));
  canvas.height = Math.max(220, Math.round(rect.height * scale));
  canvas.dataset.scale = String(scale);
}

function roadCoord(index) {
  return ROAD / 2 + index * BLOCK;
}

function roadIndex(value) {
  return Math.round((value - ROAD / 2) / BLOCK);
}

function nearestRoadCenter(value) {
  return roadCoord(roadIndex(value));
}

function nearestRoadDistance(x, y) {
  return Math.min(Math.abs(x - nearestRoadCenter(x)), Math.abs(y - nearestRoadCenter(y)));
}

function onRoad(x, y) {
  return nearestRoadDistance(x, y) <= ROAD / 2;
}

function laneOffset(lane) {
  return -ROAD / 2 + 25 + lane * (ROAD - 50) / (LANES - 1);
}

function fract(value) {
  return value - Math.floor(value);
}

function noise2(x, y, salt = 0) {
  return fract(Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453123);
}

function mapSalt() {
  const id = currentMapId === "custom" ? customMap.seed : currentMapId;
  return Array.from(id || "tokyo").reduce((sum, char) => sum + char.charCodeAt(0), 0) / 17;
}

function buildingFor(gx, gy) {
  const salt = mapSalt();
  const skip = noise2(gx, gy, 9 + salt);
  if (skip < 0.11) return null;
  const theme = currentTheme();

  const leftRoad = roadCoord(gx);
  const topRoad = roadCoord(gy);
  const inset = 18 + noise2(gx, gy, 12 + salt) * 18;
  const width = BLOCK - ROAD - inset * 2;
  const height = BLOCK - ROAD - inset * 2;

  return {
    x: leftRoad + ROAD / 2 + inset,
    y: topRoad + ROAD / 2 + inset,
    w: width,
    h: height,
    floors: 2 + Math.floor(noise2(gx, gy, 4 + salt) * 9),
    hue: theme.buildingHue + noise2(gx, gy, 2 + salt) * 95,
    lit: noise2(gx, gy, 3 + salt),
    park: skip < 0.18,
  };
}

function nearbyBuildings(x, y) {
  const gx = Math.floor((x - ROAD / 2) / BLOCK);
  const gy = Math.floor((y - ROAD / 2) / BLOCK);
  const found = [];

  for (let yy = gy - 1; yy <= gy + 1; yy += 1) {
    for (let xx = gx - 1; xx <= gx + 1; xx += 1) {
      const building = buildingFor(xx, yy);
      if (building && !building.park) found.push(building);
    }
  }

  return found;
}

function setSelectedCar(id) {
  if (!ownsCar(id)) {
    showShop();
    return;
  }

  selectedCarId = CARS[id] ? id : "sport";
  syncCarButtons();
  renderShop();
  draw();
}

function hidePanels() {
  mainMenu.classList.add("panel-hidden");
  mapPanel.classList.add("panel-hidden");
  creatorPanel.classList.add("panel-hidden");
  shopPanel.classList.add("panel-hidden");
  reportPanel.classList.add("panel-hidden");
  adminPanel.classList.add("panel-hidden");
  settingsPanel.classList.add("panel-hidden");
}

function syncCarButtons() {
  carButtons.forEach((button) => {
    const id = button.dataset.car;
    const owned = ownsCar(id);
    const car = CARS[id];
    button.classList.toggle("selected", id === selectedCarId);
    button.classList.toggle("locked", !owned);
    button.title = owned ? `${car.label} owned` : `${car.label} costs ${car.price} points`;
    button.setAttribute("aria-label", owned ? car.label : `${car.label} locked`);
  });
}

function renderMaps() {
  mapList.innerHTML = "";
  const entries = [...Object.entries(MAPS)];

  if (customMap && customMap.theme) {
    entries.push(["custom", customMap.theme]);
  }

  entries.forEach(([id, map]) => {
    const button = document.createElement("button");
    button.className = `map-card${id === currentMapId ? " selected" : ""}`;
    button.type = "button";
    button.dataset.map = id;

    const name = document.createElement("strong");
    name.textContent = map.label;

    const detail = document.createElement("span");
    detail.textContent = map.detail;

    button.append(name, detail);
    mapList.append(button);
  });
}

function setMap(id) {
  currentMapId = id === "custom" ? "custom" : MAPS[id] ? id : "tokyo";
  window.localStorage.setItem("cityDriveMap", currentMapId);
  renderMaps();
  draw();
  showMessage((currentMapId === "custom" ? customMap.theme : MAPS[currentMapId]).label);
}

function addPoints(amount) {
  if (adminInfinitePoints()) {
    updateHud();
    renderShop();
    return;
  }

  wallet += amount;
  saveWallet();
  updateHud();
  renderShop();
}

function buyOrEquipCar(id) {
  const car = CARS[id];
  if (!car) return;

  if (ownsCar(id)) {
    setSelectedCar(id);
    return;
  }

  if (!adminInfinitePoints() && wallet < car.price) {
    showMessage("Need points");
    renderShop();
    return;
  }

  if (!adminInfinitePoints()) {
    wallet -= car.price;
  }
  ownedCars.add(id);
  saveWallet();
  saveOwnedCars();
  setSelectedCar(id);
  showMessage("Unlocked");
  updateHud();
  renderShop();
}

function renderShop() {
  if (!shopList) return;

  shopPointsEl.textContent = adminInfinitePoints() ? "INF" : wallet.toLocaleString();
  shopList.innerHTML = "";

  Object.entries(CARS).forEach(([id, car]) => {
    const owned = ownsCar(id);
    const equipped = selectedCarId === id;
    const card = document.createElement("div");
    card.className = `shop-card${owned ? " owned" : ""}${equipped ? " equipped" : ""}`;

    const chip = document.createElement("span");
    chip.className = `car-chip ${id}`;
    chip.setAttribute("aria-hidden", "true");
    chip.style.background = car.color;
    chip.style.width = `${clamp(car.length / 18, 2.7, 4.7)}rem`;

    const info = document.createElement("div");
    info.className = "shop-card-info";

    const name = document.createElement("strong");
    name.textContent = car.label;

    const price = document.createElement("span");
    price.textContent = owned ? "Owned" : `${car.price} points`;

    const button = document.createElement("button");
    button.className = "shop-buy";
    button.type = "button";
    button.dataset.car = id;
    button.textContent = equipped ? "Equipped" : owned ? "Equip" : "Buy";
    button.disabled = equipped || (!owned && !adminInfinitePoints() && wallet < car.price);

    info.append(name, price);
    card.append(chip, info, button);
    shopList.append(card);
  });
}

function showShop() {
  hidePanels();
  shopPanel.classList.remove("panel-hidden");
  renderShop();
  overlay.classList.remove("hidden");
}

function showMaps() {
  hidePanels();
  renderMaps();
  mapPanel.classList.remove("panel-hidden");
  overlay.classList.remove("hidden");
}

function showCreator() {
  hidePanels();
  customMapName.value = customMap.theme.label === "My Map" ? "" : customMap.theme.label;
  customMapSeed.value = customMap.seed || "";
  customMapStyle.value = MAPS[customMap.base] ? customMap.base : "tokyo";
  creatorPanel.classList.remove("panel-hidden");
  overlay.classList.remove("hidden");
}

function showReport() {
  hidePanels();
  bugReportText.value = "";
  reportPanel.classList.remove("panel-hidden");
  overlay.classList.remove("hidden");
}

function updateAdminVisibility() {
  adminOpenButton.classList.toggle("panel-hidden", !isAdmin());
}

function showAdmin() {
  hidePanels();
  const admin = isAdmin();
  adminStatus.textContent = admin ? `Local admin active for @${ADMIN_OWNER_ID}.` : "Admin access is not configured.";
  adminGrantCarsButton.disabled = !admin;
  adminGivePointsButton.disabled = !admin;
  adminSendAnnouncementButton.disabled = !admin;
  adminPointsAmountInput.disabled = !admin;
  syncAdminControls();
  adminPanel.classList.remove("panel-hidden");
  overlay.classList.remove("hidden");
}

function setBackground(id) {
  SETTINGS.background = THEMES[id] ? id : "night";
  document.body.dataset.bg = SETTINGS.background;
  swatchButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.bg === SETTINGS.background);
  });
  draw();
}

function setLook(id) {
  SETTINGS.look = ["clean", "cinematic", "retro", "contrast"].includes(id) ? id : "clean";
  window.localStorage.setItem("cityDriveLook", SETTINGS.look);
  document.body.dataset.look = SETTINGS.look;
  lookButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.look === SETTINGS.look);
  });
  draw();
}

function createCustomMap(event) {
  event.preventDefault();
  const baseId = MAPS[customMapStyle.value] ? customMapStyle.value : "tokyo";
  const base = MAPS[baseId];
  const label = customMapName.value.trim() || "My Map";
  const seed = customMapSeed.value.trim() || `seed-${Date.now().toString(36).slice(-4)}`;
  const hueShift = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 60;

  customMap = {
    label,
    detail: `Custom ${base.label} style.`,
    seed,
    base: baseId,
    theme: {
      ...base,
      label,
      detail: `Custom ${base.label} style.`,
      buildingHue: base.buildingHue + hueShift,
    },
  };

  saveCustomMap();
  setMap("custom");
  startMode("creator");
}

function submitReport(event) {
  event.preventDefault();
  const text = bugReportText.value.trim();
  if (!text) {
    showMessage("Add details");
    return;
  }

  saveReport(text);
  bugReportText.value = "";
  showMainMenu();
  showMessage("Report saved");
}

function submitUsername(event) {
  event.preventDefault();
  username = cleanUsername(usernameInput.value);
  saveUsername();
  updateUsernameUi();
  showMessage("Username saved");
}

function grantAdminCars() {
  if (!isAdmin()) return;
  Object.keys(CARS).forEach((id) => ownedCars.add(id));
  saveOwnedCars();
  syncCarButtons();
  renderShop();
  showMessage("Cars granted");
}

function grantAdminPoints() {
  if (!isAdmin()) return;

  const amount = clamp(Math.floor(Number(adminPointsAmountInput.value || 0)), 1, 999999);
  adminPointsAmountInput.value = String(amount);
  wallet += amount;
  saveWallet();
  updateHud();
  renderShop();
  showMessage(`+${amount.toLocaleString()} points`);
}

function sendAdminAnnouncement() {
  if (!isAdmin()) return;
  const text = adminAnnouncementText.value.trim();
  if (!text) {
    showMessage("Add message");
    return;
  }

  window.localStorage.setItem("cityDriveAnnouncement", JSON.stringify({
    text,
    createdAt: new Date().toISOString(),
    from: ADMIN_OWNER_ID,
  }));
  adminAnnouncementText.value = "";
  showAnnouncement();
  showMessage("Announcement sent");
}

function setAdminInvincibility(enabled) {
  if (!isAdmin()) return;
  ADMIN_OPTIONS.invincible = enabled;
  saveAdminOptions();
  syncAdminControls();
  if (enabled) player.damage = 0;
  updateHud();
  showMessage(enabled ? "Invincible on" : "Invincible off");
}

function setAdminInfinitePoints(enabled) {
  if (!isAdmin()) return;
  ADMIN_OPTIONS.infinitePoints = enabled;
  saveAdminOptions();
  syncAdminControls();
  updateHud();
  renderShop();
  showMessage(enabled ? "Points unlimited" : "Points normal");
}

function syncTouchControls() {
  if (!touchControls) return;
  touchControls.classList.toggle("active", running && overlay.classList.contains("hidden"));
}

function releaseTouchControls() {
  Object.values(TOUCH_KEYS).forEach((key) => keys.delete(key));
  touchButtons.forEach((button) => button.classList.remove("pressed"));
  syncTouchControls();
}

function toggleMiniMap() {
  miniMapExpanded = !miniMapExpanded;
  mapToggleButton.classList.toggle("expanded", miniMapExpanded);
  mapToggleButton.title = miniMapExpanded ? "Collapse mini map" : "Expand mini map";
  mapToggleButton.setAttribute("aria-label", mapToggleButton.title);
  draw();
}

function showSettings() {
  hidePanels();
  settingsPanel.classList.remove("panel-hidden");
  overlay.classList.remove("hidden");
}

function showMainMenu() {
  running = false;
  gameMode = "menu";
  keys.clear();
  releaseTouchControls();
  menuKicker.textContent = "Endless city";
  menuTitle.textContent = "City Drive";
  hidePanels();
  mainMenu.classList.remove("panel-hidden");
  syncCarButtons();
  renderShop();
  renderMaps();
  updateAdminVisibility();
  showAnnouncement();
  overlay.classList.remove("hidden");
  updateHud();
  draw();
}

function showGameOver() {
  if (gameMode === "sandbox" || adminInvincible()) {
    running = true;
    player.damage = 0;
    syncTouchControls();
    return;
  }

  running = false;
  keys.clear();
  releaseTouchControls();
  menuKicker.textContent = "Run complete";
  menuTitle.textContent = Math.floor(score).toLocaleString();
  hidePanels();
  mainMenu.classList.remove("panel-hidden");
  overlay.classList.remove("hidden");
}

function startMode(mode) {
  resetGame(mode);
  running = true;
  overlay.classList.add("hidden");
  syncTouchControls();
  lastTime = performance.now();
  if (mode === "battle") showMessage("Survive");
  if (mode === "racing") showMessage("Race checkpoints");
  if (mode === "creator") showMessage("Custom map");

  if (!loopActive) {
    loopActive = true;
    requestAnimationFrame(frame);
  }
}

function restartGame() {
  startMode(GAME_MODES[gameMode] ? gameMode : "arcade");
}

function resetGame(mode) {
  const startX = roadCoord(0);
  const startY = roadCoord(0);
  gameMode = mode;
  player.x = startX;
  player.y = startY;
  player.angle = -Math.PI / 2;
  player.speed = 0;
  player.damage = 0;
  player.boost = 100;
  player.invuln = 0;
  player.skid = 0;
  camera.x = player.x - VIEW.w / 2;
  camera.y = player.y - VIEW.h / 2;
  score = 0;
  bestCombo = 1;
  message = "";
  messageTimer = 0;
  keys.clear();
  sparks.length = 0;
  traffic.length = 0;
  pickups.length = 0;

  for (let i = 0; i < TRAFFIC_TARGET; i += 1) {
    traffic.push({});
    respawnTraffic(traffic[i], true);
  }

  for (let i = 0; i < PICKUP_TARGET; i += 1) {
    pickups.push({});
    respawnPickup(pickups[i]);
  }

  checkpoint = makeCheckpoint();
  updateHud();
}

function updateHud() {
  scoreEl.textContent = Math.floor(score).toLocaleString();
  pointsEl.textContent = adminInfinitePoints() ? "INF" : wallet.toLocaleString();
  speedEl.textContent = Math.round(Math.abs(player.speed) * 0.42).toString();
  damageEl.textContent = gameMode === "sandbox" || adminInvincible() ? "Safe" : `${Math.round(player.damage)}%`;
  damageEl.style.color = player.damage > 68 ? "var(--red)" : player.damage > 38 ? "var(--amber)" : "inherit";
  modeEl.textContent = GAME_MODES[gameMode] || "Menu";
}

function frame(now) {
  if (!running) {
    loopActive = false;
    draw();
    return;
  }

  const dt = clamp((now - lastTime) / 1000, 0, 0.033);
  lastTime = now;

  update(dt);
  draw();
  requestAnimationFrame(frame);
}

function update(dt) {
  if (adminInvincible()) player.damage = 0;
  updatePlayer(dt);
  updateTraffic(dt);
  updateCollectibles(dt);
  updateSparks(dt);
  updateCamera(dt);
  const modeScoreBoost = gameMode === "racing" ? 0.5 : gameMode === "battle" ? 0.42 : 0.32;
  score += Math.max(0, Math.abs(player.speed)) * dt * modeScoreBoost * bestCombo;
  messageTimer = Math.max(0, messageTimer - dt);
  updateHud();
}

function updatePlayer(dt) {
  const car = CARS[selectedCarId];
  const forward = keys.has("arrowup") || keys.has("w");
  const reverse = keys.has("arrowdown") || keys.has("s");
  const left = keys.has("arrowleft") || keys.has("a");
  const right = keys.has("arrowright") || keys.has("d");
  const boosting = keys.has(" ") && player.boost > 0 && Math.abs(player.speed) > 45;
  const roadGrip = onRoad(player.x, player.y) ? 1 : 0.48;
  const throttle = (boosting ? 520 : 340) * car.accel * (boosting ? car.boost : 1);
  const maxSpeed = (boosting ? 540 : 390) * car.top;
  const turnPower = clamp(Math.abs(player.speed) / 150, 0.25, 1.15) * roadGrip * car.handling;

  if (forward) player.speed += throttle * dt;
  if (reverse) player.speed -= 260 * car.accel * dt;
  if (!forward && !reverse) player.speed *= 1 - 1.7 * dt;

  player.speed = clamp(player.speed, -170 * car.top, maxSpeed);
  player.speed *= 1 - (onRoad(player.x, player.y) ? 0.025 : 0.16) * dt;

  if (left) player.angle -= 2.55 * turnPower * dt * Math.sign(player.speed || 1);
  if (right) player.angle += 2.55 * turnPower * dt * Math.sign(player.speed || 1);

  if (boosting) {
    player.boost = Math.max(0, player.boost - 24 * dt / car.boost);
    spawnExhaust(2);
  } else {
    player.boost = Math.min(100, player.boost + (onRoad(player.x, player.y) ? 8 : 3) * dt);
  }

  player.skid = lerp(player.skid, left || right ? Math.abs(player.speed) / maxSpeed : 0, 6 * dt);

  const oldX = player.x;
  const oldY = player.y;
  player.x += Math.cos(player.angle) * player.speed * dt;
  player.y += Math.sin(player.angle) * player.speed * dt;

  if (!onRoad(player.x, player.y)) {
    const hit = nearbyBuildings(player.x, player.y).find((building) => {
      return circleRect(player.x, player.y, 22, building.x, building.y, building.w, building.h);
    });

    if (hit) {
      player.x = oldX;
      player.y = oldY;
      player.speed *= -0.28;
      damagePlayer(12 * car.damageTaken, "Crash");
      burstSparks(player.x, player.y, 16, "#ffca64");
    }
  }

  for (const other of traffic) {
    if (gameMode === "sandbox") continue;

    if (distance(player, other) < (car.length + other.length) * 0.45) {
      const impact = Math.abs(player.speed - other.speed * Math.cos(other.angle - player.angle));
      player.speed *= -0.35;
      other.speed *= 0.45;
      other.honk = 0.5;
      damagePlayer((8 + impact * 0.035) * car.damageTaken, "Collision");
      burstSparks((player.x + other.x) / 2, (player.y + other.y) / 2, 20, "#ff6d6d");
    }
  }

  player.invuln = Math.max(0, player.invuln - dt);
}

function damagePlayer(amount, label) {
  if (player.invuln > 0) return;

  player.invuln = 0.45;
  showMessage(label);

  if (gameMode === "sandbox" || adminInvincible()) {
    player.damage = 0;
    return;
  }

  const modeDamage = gameMode === "battle" ? amount * 1.18 : amount;
  player.damage = clamp(player.damage + modeDamage, 0, 100);
  bestCombo = 1;

  if (player.damage >= 100) {
    showGameOver();
  }
}

function showMessage(text) {
  message = text;
  messageTimer = 1.2;
}

function updateTraffic(dt) {
  for (const car of traffic) {
    car.x += Math.cos(car.angle) * car.speed * dt;
    car.y += Math.sin(car.angle) * car.speed * dt;
    car.turnCooldown = Math.max(0, car.turnCooldown - dt);
    car.honk = Math.max(0, car.honk - dt);

    const tooFar = Math.hypot(car.x - player.x, car.y - player.y) > 2300;
    if (tooFar) {
      respawnTraffic(car, false);
      continue;
    }

    const centerX = nearestRoadCenter(car.x);
    const centerY = nearestRoadCenter(car.y);
    const atVerticalCrossing = Math.abs(car.x - centerX) < 5;
    const atHorizontalCrossing = Math.abs(car.y - centerY) < 5;

    if (car.turnCooldown <= 0 && rand() < dt * 0.78) {
      if (car.axis === "h" && atVerticalCrossing) {
        if (rand() < 0.55) {
          car.axis = "v";
          car.dir = rand() > 0.5 ? 1 : -1;
          car.x = centerX + laneOffset(car.lane);
          car.y = centerY;
          car.angle = car.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
          car.turnCooldown = 1.2;
        }
      } else if (car.axis === "v" && atHorizontalCrossing) {
        if (rand() < 0.55) {
          car.axis = "h";
          car.dir = rand() > 0.5 ? 1 : -1;
          car.x = centerX;
          car.y = centerY + laneOffset(car.lane);
          car.angle = car.dir > 0 ? 0 : Math.PI;
          car.turnCooldown = 1.2;
        }
      }
    }
  }
}

function respawnTraffic(car, anywhere) {
  let placed = false;
  let tries = 0;

  while (!placed && tries < 30) {
    tries += 1;
    const horizontal = rand() > 0.5;
    const lane = Math.floor(rand() * LANES);
    const dir = rand() > 0.5 ? 1 : -1;
    const nearX = roadIndex(player.x) + randomInt(-5, 5);
    const nearY = roadIndex(player.y) + randomInt(-4, 4);
    const spread = anywhere ? randomRange(300, 1800) : randomRange(1100, 2100);
    const side = rand() > 0.5 ? 1 : -1;

    car.axis = horizontal ? "h" : "v";
    car.dir = dir;
    car.lane = lane;
    car.speed = randomRange(58, 122);
    car.color = ["#ff6d6d", "#55c7ff", "#f6f1e7", "#ffca64"][Math.floor(rand() * 4)];
    car.length = randomRange(48, 62);
    car.width = randomRange(24, 29);
    car.honk = 0;
    car.turnCooldown = randomRange(0.2, 2.4);

    if (horizontal) {
      car.x = player.x + side * spread;
      car.y = roadCoord(nearY) + laneOffset(lane);
      car.angle = dir > 0 ? 0 : Math.PI;
    } else {
      car.x = roadCoord(nearX) + laneOffset(lane);
      car.y = player.y + side * spread;
      car.angle = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    }

    placed = distance(player, car) > 250;
  }
}

function respawnPickup(pickup) {
  const pointTypes = [
    { color: "#6fe3a5", value: 20 },
    { color: "#55c7ff", value: 35 },
    { color: "#ffca64", value: 60 },
  ];
  const pointType = pointTypes[Math.floor(rand() * pointTypes.length)];
  const horizontal = rand() > 0.5;
  const far = randomRange(360, 2200) * (rand() > 0.5 ? 1 : -1);
  const cross = randomRange(-1600, 1600);
  const lane = Math.floor(rand() * LANES);

  pickup.r = 14;
  pickup.taken = false;
  pickup.color = pointType.color;
  pickup.value = pointType.value;
  pickup.phase = rand() * Math.PI * 2;

  if (horizontal) {
    pickup.x = player.x + far;
    pickup.y = roadCoord(roadIndex(player.y + cross)) + laneOffset(lane);
  } else {
    pickup.x = roadCoord(roadIndex(player.x + cross)) + laneOffset(lane);
    pickup.y = player.y + far;
  }
}

function makeCheckpoint() {
  let dx = 0;
  let dy = 0;

  while (Math.abs(dx) + Math.abs(dy) < 4) {
    dx = randomInt(-6, 6);
    dy = randomInt(-5, 5);
  }

  return {
    x: roadCoord(roadIndex(player.x) + dx),
    y: roadCoord(roadIndex(player.y) + dy),
    r: 58,
    pulse: rand() * Math.PI * 2,
  };
}

function updateCollectibles(dt) {
  for (const pickup of pickups) {
    pickup.phase += dt * 3;

    if (distance(player, pickup) > 2700) {
      respawnPickup(pickup);
      continue;
    }

    if (!pickup.taken && distance(player, pickup) < 42) {
      pickup.taken = true;
      const points = pickup.value || 10;
      if (gameMode !== "sandbox") addPoints(points);
      score += (300 + points * 12) * bestCombo;
      bestCombo = Math.min(6, bestCombo + 0.25);
      player.boost = Math.min(100, player.boost + 18);
      showMessage(gameMode === "sandbox" ? "Boost" : `+${points} points`);
      burstSparks(pickup.x, pickup.y, 12, pickup.color);
      respawnPickup(pickup);
    }
  }

  if (checkpoint && distance(player, checkpoint) < checkpoint.r + 22) {
    score += 1100 * bestCombo;
    bestCombo = Math.min(8, bestCombo + 0.5);
    if (gameMode !== "sandbox") player.damage = Math.max(0, player.damage - 8);
    showMessage("Checkpoint");
    burstSparks(checkpoint.x, checkpoint.y, 24, "#6fe3a5");
    checkpoint = makeCheckpoint();
  }
}

function updateSparks(dt) {
  for (let i = sparks.length - 1; i >= 0; i -= 1) {
    const spark = sparks[i];
    spark.x += spark.vx * dt;
    spark.y += spark.vy * dt;
    spark.life -= dt;
    spark.size *= 1 - dt * 2.2;
    if (spark.life <= 0 || spark.size <= 0.4) sparks.splice(i, 1);
  }
}

function updateCamera(dt) {
  const lookAhead = clamp(player.speed, -80, 260) * 0.45;
  const targetX = player.x - VIEW.w / 2 + Math.cos(player.angle) * lookAhead;
  const targetY = player.y - VIEW.h / 2 + Math.sin(player.angle) * lookAhead;
  camera.x = lerp(camera.x, targetX, 5 * dt);
  camera.y = lerp(camera.y, targetY, 5 * dt);
}

function burstSparks(x, y, count, color) {
  for (let i = 0; i < count; i += 1) {
    const angle = rand() * Math.PI * 2;
    const speed = 90 + rand() * 260;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + rand() * 5,
      life: 0.25 + rand() * 0.45,
      color,
    });
  }
}

function spawnExhaust(count) {
  for (let i = 0; i < count; i += 1) {
    const back = player.angle + Math.PI + (rand() - 0.5) * 0.5;
    sparks.push({
      x: player.x + Math.cos(back) * 32,
      y: player.y + Math.sin(back) * 32,
      vx: Math.cos(back) * randomRange(80, 160),
      vy: Math.sin(back) * randomRange(80, 160),
      size: randomRange(2, 6),
      life: randomRange(0.25, 0.45),
      color: "#55c7ff",
    });
  }
}

function circleRect(cx, cy, radius, rx, ry, rw, rh) {
  const closestX = clamp(cx, rx, rx + rw);
  const closestY = clamp(cy, ry, ry + rh);
  return Math.hypot(cx - closestX, cy - closestY) < radius;
}

function draw() {
  const scale = Number(canvas.dataset.scale || 1);
  const width = canvas.width / scale;
  const height = canvas.height / scale;
  ctx.save();
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);

  const viewScale = Math.min(width / VIEW.w, height / VIEW.h);
  const offsetX = (width - VIEW.w * viewScale) / 2;
  const offsetY = (height - VIEW.h * viewScale) / 2;

  ctx.translate(offsetX, offsetY);
  ctx.scale(viewScale, viewScale);
  drawWorld();
  drawHudLayer();
  ctx.restore();
}

function drawWorld() {
  const theme = currentTheme();
  ctx.fillStyle = theme.world;
  ctx.fillRect(0, 0, VIEW.w, VIEW.h);
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  drawDistrictBase();
  drawRoads();
  drawBuildings();
  drawCheckpoints();
  drawPickups();
  drawTraffic();
  drawPlayer();
  drawSparks();
  ctx.restore();
  drawVignette();
}

function drawDistrictBase() {
  const theme = currentTheme();
  const left = camera.x - 60;
  const top = camera.y - 60;
  const right = camera.x + VIEW.w + 60;
  const bottom = camera.y + VIEW.h + 60;

  ctx.fillStyle = theme.base;
  ctx.fillRect(left, top, right - left, bottom - top);

  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 2;

  for (let x = Math.floor(left / 70) * 70; x <= right; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
  }

  for (let y = Math.floor(top / 70) * 70; y <= bottom; y += 70) {
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }
}

function drawRoads() {
  const theme = currentTheme();
  const left = camera.x - ROAD * 2;
  const top = camera.y - ROAD * 2;
  const right = camera.x + VIEW.w + ROAD * 2;
  const bottom = camera.y + VIEW.h + ROAD * 2;
  const startX = roadIndex(left) - 1;
  const endX = roadIndex(right) + 1;
  const startY = roadIndex(top) - 1;
  const endY = roadIndex(bottom) + 1;

  ctx.lineCap = "butt";
  ctx.strokeStyle = theme.road;
  ctx.lineWidth = ROAD;

  for (let i = startX; i <= endX; i += 1) {
    const x = roadCoord(i);
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
  }

  for (let i = startY; i <= endY; i += 1) {
    const y = roadCoord(i);
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = theme.roadEdge;
  ctx.lineWidth = 3;

  for (let i = startX; i <= endX; i += 1) {
    const x = roadCoord(i);
    ctx.beginPath();
    ctx.moveTo(x - ROAD / 2, top);
    ctx.lineTo(x - ROAD / 2, bottom);
    ctx.moveTo(x + ROAD / 2, top);
    ctx.lineTo(x + ROAD / 2, bottom);
    ctx.stroke();
  }

  for (let i = startY; i <= endY; i += 1) {
    const y = roadCoord(i);
    ctx.beginPath();
    ctx.moveTo(left, y - ROAD / 2);
    ctx.lineTo(right, y - ROAD / 2);
    ctx.moveTo(left, y + ROAD / 2);
    ctx.lineTo(right, y + ROAD / 2);
    ctx.stroke();
  }

  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 4;
  ctx.setLineDash([34, 30]);

  for (let i = startX; i <= endX; i += 1) {
    const x = roadCoord(i);
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
  }

  for (let i = startY; i <= endY; i += 1) {
    const y = roadCoord(i);
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  ctx.setLineDash([]);
  ctx.fillStyle = theme.intersection;

  for (let i = startX; i <= endX; i += 1) {
    for (let j = startY; j <= endY; j += 1) {
      const x = roadCoord(i);
      const y = roadCoord(j);
      ctx.fillRect(x - 24, y - 24, 48, 48);
    }
  }
}

function drawBuildings() {
  const theme = currentTheme();
  const startX = Math.floor((camera.x - BLOCK) / BLOCK) - 1;
  const endX = Math.floor((camera.x + VIEW.w + BLOCK) / BLOCK) + 1;
  const startY = Math.floor((camera.y - BLOCK) / BLOCK) - 1;
  const endY = Math.floor((camera.y + VIEW.h + BLOCK) / BLOCK) + 1;

  for (let gy = startY; gy <= endY; gy += 1) {
    for (let gx = startX; gx <= endX; gx += 1) {
      const building = buildingFor(gx, gy);
      if (!building) continue;

      if (building.park) {
        ctx.fillStyle = theme.park;
        roundRect(building.x, building.y, building.w, building.h, 10);
        ctx.fill();
        ctx.fillStyle = theme.parkLine;
        ctx.fillRect(building.x + 24, building.y + building.h / 2, building.w - 48, 5);
        continue;
      }

      const shade = `hsl(${building.hue}, 22%, ${16 + building.floors * 1.7}%)`;
      ctx.fillStyle = shade;
      ctx.shadowColor = "rgba(0,0,0,0.38)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 12;
      roundRect(building.x, building.y, building.w, building.h, 10);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(building.x + 12, building.y + 12, building.w - 24, 3);

      const rows = Math.max(2, Math.floor(building.h / 54));
      const cols = Math.max(2, Math.floor(building.w / 58));
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          if ((row * 13 + col * 7 + Math.floor(building.lit * 10)) % 4 === 0) {
            ctx.fillStyle = "rgba(255, 202, 100, 0.46)";
          } else {
            ctx.fillStyle = "rgba(85, 199, 255, 0.12)";
          }
          ctx.fillRect(building.x + 28 + col * 52, building.y + 30 + row * 46, 16, 10);
        }
      }
    }
  }
}

function drawCheckpoints() {
  if (!checkpoint) return;
  checkpoint.pulse += 0.025;
  const radius = checkpoint.r + Math.sin(checkpoint.pulse) * 7;
  ctx.strokeStyle = "#6fe3a5";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(checkpoint.x, checkpoint.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(111,227,165,0.13)";
  ctx.beginPath();
  ctx.arc(checkpoint.x, checkpoint.y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPickups() {
  for (const pickup of pickups) {
    if (pickup.taken) continue;
    const bob = Math.sin(pickup.phase) * 4;
    ctx.save();
    ctx.translate(pickup.x, pickup.y + bob);
    ctx.rotate(pickup.phase * 0.8);
    ctx.fillStyle = pickup.color;
    ctx.shadowColor = pickup.color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(0, -pickup.r);
    ctx.lineTo(pickup.r, 0);
    ctx.lineTo(0, pickup.r);
    ctx.lineTo(-pickup.r, 0);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function drawTraffic() {
  for (const car of traffic) {
    drawCar(car.x, car.y, car.angle, car.color, "#101315", car.length, car.width, car.honk > 0);
  }
}

function drawPlayer() {
  const car = CARS[selectedCarId];
  if (player.skid > 0.08) {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);
    ctx.fillStyle = `rgba(0,0,0,${0.18 * player.skid})`;
    ctx.fillRect(-38, -23, 32, 7);
    ctx.fillRect(-38, 16, 32, 7);
    ctx.restore();
  }
  drawCar(player.x, player.y, player.angle, car.color, car.accent, car.length, car.width, false, true);
}

function drawCar(x, y, angle, color, accent, length, width, alert, isPlayer = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(-length / 2 - 2, -width / 2 + 4, length + 4, width + 4, 8);
  ctx.fill();

  ctx.fillStyle = color;
  roundRect(-length / 2, -width / 2, length, width, 7);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  roundRect(-length * 0.12, -width * 0.38, length * 0.25, width * 0.76, 4);
  ctx.fill();

  ctx.fillStyle = isPlayer ? accent : "rgba(16,19,21,0.74)";
  ctx.fillRect(length * 0.24, -width * 0.38, 8, width * 0.76);

  ctx.fillStyle = "#f6f1e7";
  ctx.fillRect(length / 2 - 4, -width / 2 + 4, 4, 7);
  ctx.fillRect(length / 2 - 4, width / 2 - 11, 4, 7);
  ctx.fillStyle = "#ff6d6d";
  ctx.fillRect(-length / 2, -width / 2 + 4, 4, 7);
  ctx.fillRect(-length / 2, width / 2 - 11, 4, 7);

  if (alert) {
    ctx.strokeStyle = "rgba(255, 202, 100, 0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, width * 1.1, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSparks() {
  for (const spark of sparks) {
    ctx.globalAlpha = clamp(spark.life * 2.4, 0, 1);
    ctx.fillStyle = spark.color;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawHudLayer() {
  const boostWidth = 190;
  const x = 24;
  const y = VIEW.h - 42;

  ctx.fillStyle = "rgba(10,15,17,0.72)";
  roundRect(x, y, boostWidth, 16, 8);
  ctx.fill();
  ctx.fillStyle = player.boost > 20 ? "#55c7ff" : "#ffca64";
  roundRect(x + 3, y + 3, (boostWidth - 6) * player.boost / 100, 10, 5);
  ctx.fill();

  const mapSize = miniMapExpanded ? Math.min(360, VIEW.w - 48, VIEW.h - 120) : 150;
  const mapRange = miniMapExpanded ? 4200 : 1900;
  drawMiniMap(VIEW.w - mapSize - 34, VIEW.h - mapSize - 34, mapSize, mapRange);

  if (messageTimer > 0) {
    ctx.globalAlpha = clamp(messageTimer, 0, 1);
    ctx.fillStyle = "rgba(10,15,17,0.72)";
    roundRect(VIEW.w / 2 - 92, 48, 184, 42, 8);
    ctx.fill();
    ctx.fillStyle = "#f6f1e7";
    ctx.font = "800 18px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(message, VIEW.w / 2, 75);
    ctx.globalAlpha = 1;
  }
}

function drawMiniMap(x, y, size = 150, range = 1900) {
  const theme = currentTheme();
  const scale = size / range;
  const center = size / 2;
  const localLeft = player.x - range / 2;
  const localTop = player.y - range / 2;

  ctx.fillStyle = "rgba(10,15,17,0.76)";
  roundRect(x, y, size, size, 8);
  ctx.fill();

  if (miniMapExpanded) {
    ctx.fillStyle = "rgba(246,241,231,0.88)";
    ctx.font = "800 15px Inter, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText((currentMapId === "custom" ? customMap.theme.label : MAPS[currentMapId].label), x + 14, y + 26);
  }

  ctx.save();
  ctx.beginPath();
  roundRect(x, y, size, size, 8);
  ctx.clip();

  ctx.strokeStyle = theme.roadEdge;
  ctx.lineWidth = 2;

  const startX = roadIndex(localLeft) - 1;
  const endX = roadIndex(localLeft + range) + 1;
  const startY = roadIndex(localTop) - 1;
  const endY = roadIndex(localTop + range) + 1;

  for (let i = startX; i <= endX; i += 1) {
    const px = x + (roadCoord(i) - localLeft) * scale;
    ctx.beginPath();
    ctx.moveTo(px, y);
    ctx.lineTo(px, y + size);
    ctx.stroke();
  }

  for (let i = startY; i <= endY; i += 1) {
    const py = y + (roadCoord(i) - localTop) * scale;
    ctx.beginPath();
    ctx.moveTo(x, py);
    ctx.lineTo(x + size, py);
    ctx.stroke();
  }

  if (checkpoint) {
    const px = x + (checkpoint.x - localLeft) * scale;
    const py = y + (checkpoint.y - localTop) * scale;
    if (px >= x && px <= x + size && py >= y && py <= y + size) {
      ctx.fillStyle = "#6fe3a5";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.fillStyle = "#ff6d6d";
  for (const car of traffic) {
    const px = x + (car.x - localLeft) * scale;
    const py = y + (car.y - localTop) * scale;
    if (px >= x && px <= x + size && py >= y && py <= y + size) {
      ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
    }
  }

  ctx.fillStyle = "#f6f1e7";
  ctx.save();
  ctx.translate(x + center, y + center);
  ctx.rotate(player.angle);
  ctx.beginPath();
  ctx.moveTo(6, 0);
  ctx.lineTo(-4, -4);
  ctx.lineTo(-4, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.restore();
}

function drawVignette() {
  const gradient = ctx.createRadialGradient(VIEW.w / 2, VIEW.h / 2, 120, VIEW.w / 2, VIEW.h / 2, VIEW.w * 0.7);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.42)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.w, VIEW.h);
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

window.addEventListener("resize", () => {
  resize();
  draw();
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "w", "a", "s", "d"].includes(key)) {
    event.preventDefault();
    keys.add(key);
  }
  if (key === "enter" && !running) startMode("arcade");
  if (key === "escape") showMainMenu();
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

window.addEventListener("blur", releaseTouchControls);

touchButtons.forEach((button) => {
  const key = TOUCH_KEYS[button.dataset.control];
  if (!key) return;

  const press = (event) => {
    event.preventDefault();
    keys.add(key);
    button.classList.add("pressed");
  };

  const release = (event) => {
    event.preventDefault();
    keys.delete(key);
    button.classList.remove("pressed");
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointerleave", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("contextmenu", (event) => event.preventDefault());
});

carButtons.forEach((button) => {
  button.addEventListener("click", () => setSelectedCar(button.dataset.car));
});

arcadeButton.addEventListener("click", () => startMode("arcade"));
sandboxButton.addEventListener("click", () => startMode("sandbox"));
battleButton.addEventListener("click", () => startMode("battle"));
racingButton.addEventListener("click", () => startMode("racing"));
creatorButton.addEventListener("click", showCreator);
mapsButton.addEventListener("click", showMaps);
shopButton.addEventListener("click", showShop);
shopBackButton.addEventListener("click", showMainMenu);
usernameForm.addEventListener("submit", submitUsername);
reportButton.addEventListener("click", showReport);
reportBackButton.addEventListener("click", showMainMenu);
reportForm.addEventListener("submit", submitReport);
settingsButton.addEventListener("click", showSettings);
settingsBackButton.addEventListener("click", showMainMenu);
mapsBackButton.addEventListener("click", showMainMenu);
creatorBackButton.addEventListener("click", showMainMenu);
creatorForm.addEventListener("submit", createCustomMap);
adminOpenButton.addEventListener("click", showAdmin);
adminBackButton.addEventListener("click", showMainMenu);
adminGrantCarsButton.addEventListener("click", grantAdminCars);
adminGivePointsButton.addEventListener("click", grantAdminPoints);
adminSendAnnouncementButton.addEventListener("click", sendAdminAnnouncement);
adminInvincibilityToggle.addEventListener("change", () => setAdminInvincibility(adminInvincibilityToggle.checked));
adminInfinitePointsToggle.addEventListener("change", () => setAdminInfinitePoints(adminInfinitePointsToggle.checked));
restartButton.addEventListener("click", restartGame);
menuButton.addEventListener("click", showMainMenu);
mapToggleButton.addEventListener("click", toggleMiniMap);
swatchButtons.forEach((button) => {
  button.addEventListener("click", () => setBackground(button.dataset.bg));
});
lookButtons.forEach((button) => {
  button.addEventListener("click", () => setLook(button.dataset.look));
});
mapList.addEventListener("click", (event) => {
  const button = event.target.closest(".map-card");
  if (button) setMap(button.dataset.map);
});
shopList.addEventListener("click", (event) => {
  const button = event.target.closest(".shop-buy");
  if (button) buyOrEquipCar(button.dataset.car);
});

resize();
setBackground(SETTINGS.background);
setLook(SETTINGS.look);
updateUsernameUi();
syncCarButtons();
renderShop();
renderMaps();
updateAdminVisibility();
syncAdminControls();
showAnnouncement();
resetGame("arcade");
showMainMenu();
