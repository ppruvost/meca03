// ============================================================
// script.js — Version complète et finalisée + 3 graphiques
// ============================================================


// ============================================================
// PARAMÈTRES (PDF complet retranscrit)
// ============================================================
const parametres = {
  "FORET HSS": {
    "ALUMINIUM": { Vc: [70], fz: [0.1, 0.25] },
    "ACIER DOUX": { Vc: [25], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25, 35], fz: [0.08, 0.12] },
    "LAITON / CUIVRE": { Vc: [22], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [20], fz: [0.08] },
    "INOX": { Vc: [16], fz: [0.07] },
    "TITANE": { Vc: [12], fz: [0.03, 0.06] },
    "INCONEL / HASTELLOY": { Vc: [10], fz: [0.03, 0.06] }
  },

  "FORET CARBURE": {
    "ALUMINIUM": { Vc: [100, 150], fz: [0.15, 0.3] },
    "ACIER DOUX": { Vc: [60, 80], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [60, 100], fz: [0.08, 0.18] },
    "LAITON / CUIVRE": { Vc: [50], fz: [0.08, 0.1] },
    "ACIER PRETRAITE": { Vc: [35, 40], fz: [0.08, 0.12] },
    "INOX": { Vc: [30], fz: [0.08] },
    "TITANE": { Vc: [25], fz: [0.03, 0.06] },
    "INCONEL / HASTELLOY": { Vc: [22], fz: [0.02, 0.04] }
  },

  "FORET A PLAQUETTES": {
    "ALUMINIUM": { Vc: [200], fz: [0.1] },
    "ACIER DOUX": { Vc: [120], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [120], fz: [0.1] },
    "LAITON / CUIVRE": { Vc: [110], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [100], fz: [0.1] },
    "INOX": { Vc: [80], fz: [0.1] },
    "TITANE": { Vc: [60], fz: [0.1] },
    "INCONEL / HASTELLOY": { Vc: [50], fz: [0.08] }
  },

  "FRAISE HSS": {
    "ALUMINIUM": { Vc: [120], fz: [0.1, 0.25] },
    "ACIER DOUX": { Vc: [25], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25], fz: [0.08, 0.12] },
    "LAITON / CUIVRE": { Vc: [22], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [20], fz: [0.08] },
    "INOX": { Vc: [16], fz: [0.06] },
    "TITANE": { Vc: [12], fz: [0.025, 0.05] },
    "INCONEL / HASTELLOY": { Vc: [10], fz: [0.02, 0.04] }
  },

  "FRAISE CARBURE": {
    "ALUMINIUM": { Vc: [150, 250], fz: [0.15, 0.3] },
    "ACIER DOUX": { Vc: [60, 120], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [60, 80], fz: [0.1, 0.2] },
    "LAITON / CUIVRE": { Vc: [50], fz: [0.08, 0.1] },
    "ACIER PRETRAITE": { Vc: [35, 40], fz: [0.1, 0.15] },
    "INOX": { Vc: [30], fz: [0.08, 0.12] },
    "TITANE": { Vc: [25], fz: [0.025, 0.05] },
    "INCONEL / HASTELLOY": { Vc: [22], fz: [0.02, 0.04] }
  },

  "FRAISE A PLAQUETTES": {
    "ALUMINIUM": { Vc: [200, 300], fz: [0.05, 0.1] },
    "ACIER DOUX": { Vc: [140], fz: [0.05, 0.1] },
    "ACIER MI-DUR": { Vc: [120, 140], fz: [0.05, 0.1] },
    "LAITON / CUIVRE": { Vc: [120], fz: [0.05, 0.1] },
    "ACIER PRETRAITE": { Vc: [110], fz: [0.05, 0.1] },
    "INOX": { Vc: [100], fz: [0.05, 0.1] },
    "TITANE": { Vc: [80], fz: [0.05, 0.07] },
    "INCONEL / HASTELLOY": { Vc: [70], fz: [0.03, 0.05] }
  },

  "ALESOIR HSS": {
    "ALUMINIUM": { Vc: [30], fz: [0.1] },
    "ACIER DOUX": { Vc: [16], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [16], fz: [0.1] },
    "LAITON / CUIVRE": { Vc: [15], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [14], fz: [0.1] },
    "INOX": { Vc: [12], fz: [0.1] },
    "TITANE": { Vc: [10], fz: [0.1] },
    "INCONEL / HASTELLOY": { Vc: [10], fz: [0.08] }
  },

  "ALESOIR CARBURE": {
    "ALUMINIUM": { Vc: [50], fz: [0.1] },
    "ACIER DOUX": { Vc: [25], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25], fz: [0.1] },
    "LAITON / CUIVRE": { Vc: [24], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [22], fz: [0.1] },
    "INOX": { Vc: [20], fz: [0.1] },
    "TITANE": { Vc: [16], fz: [0.08] },
    "INCONEL / HASTELLOY": { Vc: [15], fz: [0.08] }
  },

  "TETE A ALESER": {
    "ALUMINIUM": { Vc: [200], fz: [0.05, 0.1] },
    "ACIER DOUX": { Vc: [120], fz: [0.05, 0.1] },
    "ACIER MI-DUR": { Vc: [120], fz: [0.05, 0.1] },
    "LAITON / CUIVRE": { Vc: [110], fz: [0.05, 0.1] },
    "ACIER PRETRAITE": { Vc: [100], fz: [0.05, 0.1] },
    "INOX": { Vc: [60, 80], fz: [0.05, 0.1] },
    "TITANE": { Vc: [50], fz: [0.05, 0.07] },
    "INCONEL / HASTELLOY": { Vc: [50], fz: [0.03, 0.05] }
  },

  "TARAUD": {
    "ALUMINIUM": { Vc: [25] },
    "ACIER DOUX": { Vc: [9] },
    "ACIER MI-DUR": { Vc: [9] },
    "LAITON / CUIVRE": { Vc: [8] },
    "ACIER PRETRAITE": { Vc: [8] },
    "INOX": { Vc: [5] },
    "TITANE": { Vc: [4] },
    "INCONEL / HASTELLOY": { Vc: [3] }
  }
};


// ============================================================
// OUTILS — FONCTIONS
// ============================================================
function moyenne(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function formatRange(arr) {
  return arr.length === 1 ? `${arr[0]}` : `${arr[0]} - ${arr[1]}`;
}

function calcRPM(Vc, D) {
  return (Vc * 1000) / (Math.PI * D);
}

function calcVf(N, fz, Z) {
  return N * fz * Z;
}


// ============================================================
// DOM ELEMENTS
// ============================================================
const outilSelect = document.getElementById("outil");
const matiereSelect = document.getElementById("matiere");
const diamInput = document.getElementById("diametre");
const zInput = document.getElementById("z");
const vcRecoInput = document.getElementById("vcReco");
const fzRecoInput = document.getElementById("fzReco");
const rpmInput = document.getElementById("rpm");
const vfInput = document.getElementById("vf");

const analyseVc = document.getElementById("analyseVc");
const analyseD = document.getElementById("analyseD");
const formuleExplication = document.getElementById("formuleExplication");


// ============================================================
// LISTES OUTILS + MATIÈRES
// ============================================================
function remplirOutils() {
  Object.keys(parametres).forEach(o => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = o;
    outilSelect.appendChild(opt);
  });
}

function remplirMatieres() {
  matiereSelect.innerHTML = "";
  Object.keys(parametres[outilSelect.value]).forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    matiereSelect.appendChild(opt);
  });
}

outilSelect.addEventListener("change", () => {
  remplirMatieres();
  rafraichir();
});

matiereSelect.addEventListener("change", rafraichir);
diamInput.addEventListener("input", rafraichir);
zInput.addEventListener("input", rafraichir);

remplirOutils();
remplirMatieres();


// ============================================================
// ANIMATION OUTIL
// ============================================================
const wheelCanvas = document.getElementById("wheelCanvas");
const ctxWheel = wheelCanvas.getContext("2d");
let angle = 0;
let rotationSpeed = 0;

function drawWheel() {
  ctxWheel.clearRect(0, 0, 300, 300);
  ctxWheel.save();
  ctxWheel.translate(150, 150);
  ctxWheel.rotate(angle);

  ctxWheel.beginPath();
  ctxWheel.arc(0, 0, 80, 0, Math.PI * 2);
  ctxWheel.stroke();

  ctxWheel.beginPath();
  ctxWheel.moveTo(0, 0);
  ctxWheel.lineTo(80, 0);
  ctxWheel.strokeStyle = "red";
  ctxWheel.stroke();

  ctxWheel.restore();

  angle += rotationSpeed;
  requestAnimationFrame(drawWheel);
}
drawWheel();


// ============================================================
// ZONE PEDAGOGIQUE
// ============================================================
function miseAJourPedagogie(VcRange, D, N) {
  analyseVc.textContent =
    "➤ Quand Vc augmente, N augmente.";
  
  analyseD.textContent =
    "➤ Quand le diamètre augmente, la vitesse de rotation diminue pour conserver la même Vc.";

  formuleExplication.innerHTML = `
    <strong>Formule fondamentale :</strong><br>
    <code>N = (Vc × 1000) / (π × D)</code><br><br>
    Avec vos valeurs :<br>
    <code>N = (${formatRange(VcRange)} × 1000) / (π × ${D})</code><br>
    ≈ <strong>${Math.round(N)} tr/min</strong>
  `;
}


// ============================================================
// RAFRAICHISSEMENT PRINCIPAL
// ============================================================
function rafraichir() {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(diamInput.value);
  const Z = parseFloat(zInput.value);

  const data = parametres[outil][mat];
  const VcRange = data.Vc;
  const fzRange = data.fz;

  vcRecoInput.value = formatRange(VcRange);
  fzRecoInput.value = fzRange ? formatRange(fzRange) : "—";

  const Vc = moyenne(VcRange);
  const fz = fzRange ? moyenne(fzRange) : NaN;

  const N = calcRPM(Vc, D);
  rpmInput.value = Math.round(N);

  const Vf = calcVf(N, fz, Z);
  vfInput.value = isNaN(Vf) ? "" : Vf.toFixed(1);

  rotationSpeed = (N / 60) * 0.02;

  miseAJourPedagogie(VcRange, D, N);
}

rafraichir();


// ============================================================
// GRAPHIQUES
// ============================================================

// 1) Vc = f(D)
const chart = new Chart(document.getElementById("chartCanvas"), {
  type: "scatter",
  data: { datasets: [{ label: "Vc (m/min) en fonction du diamètre", data: [], pointRadius: 5 }] },
  options: {
    scales: {
      x: { title: { display: true, text: "Diamètre (mm)" } },
      y: { title: { display: true, text: "Vc (m/min)" } }
    }
  }
});

// 2) N = f(D)
const chartND = new Chart(document.getElementById("chartND"), {
  type: "scatter",
  data: { datasets: [{ label: "N en fonction de D", data: [], pointRadius: 4 }] },
  options: {
    scales: {
      x: { title: { display: true, text: "Diamètre D (mm)" } },
      y: { title: { display: true, text: "N (tr/min)" } }
    }
  }
});

// 3) N = f(Vc)
const chartNVc = new Chart(document.getElementById("chartNVc"), {
  type: "scatter",
  data: { datasets: [{ label: "N en fonction de Vc", data: [], pointRadius: 4 }] },
  options: {
    scales: {
      x: { title: { display: true, text: "Vc (m/min)" } },
      y: { title: { display: true, text: "N (tr/min)" } }
    }
  }
});


// ============================================================
// AJOUT LIGNE + GRAPHIQUES
// ============================================================
document.getElementById("addRow").addEventListener("click", () => {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(diamInput.value);
  const Z = parseFloat(zInput.value);

  const data = parametres[outil][mat];
  const VcRange = data.Vc;
  const fzRange = data.fz;

  const Vc = moyenne(VcRange);
  const fz = fzRange ? moyenne(fzRange) : NaN;

  const N = calcRPM(Vc, D);
  const Vf = calcVf(N, fz, Z);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${outil}</td>
    <td>${mat}</td>
    <td>${D}</td>
    <td>${Z}</td>
    <td>${formatRange(VcRange)}</td>
    <td>${fzRange ? formatRange(fzRange) : "—"}</td>
    <td>${Math.round(N)}</td>
    <td>${isNaN(Vf) ? "—" : Vf.toFixed(1)}</td>
  `;
  document.querySelector("#dataTable tbody").appendChild(row);

  // GRAPHIQUE 1 : Vc = f(D)
  chart.data.datasets[0].data.push({ x: D, y: Vc });
  chart.update();

  // GRAPHIQUE 2 : N = f(D)
  chartND.data.datasets[0].data.push({ x: D, y: N });
  chartND.update();

  // GRAPHIQUE 3 : N = f(Vc)
  chartNVc.data.datasets[0].data.push({ x: Vc, y: N });
  chartNVc.update();
});


// ============================================================
// FIN DU SCRIPT
// ============================================================
