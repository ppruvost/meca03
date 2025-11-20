// script.js — version finalisée
// Contient l'objet 'parametres' (transcription fidèle du PDF) + UI, calculs, tableau, graphique.
// Sources : "Tableau param coupe_Vc-fz.pdf" et "EXERCICE CONDITIONS DE COUPE.pdf". 

// -----------------------------
// Paramètres (retranscription fidèle du PDF)
// -----------------------------
const parametres = {
  "FORET HSS": {
    "ALUMINIUM":          { Vc: [70],        fz: [0.1, 0.25] },
    "ACIER DOUX":         { Vc: [25],        fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [25, 35],    fz: [0.08, 0.12] },
    "LAITON / CUIVRE":    { Vc: [22],        fz: [0.1] },
    "ACIER PRETRAITE":    { Vc: [20],        fz: [0.08] },
    "INOX":               { Vc: [16],        fz: [0.07] },
    "TITANE":             { Vc: [12],        fz: [0.03, 0.06] },
    "INCONEL / HASTELLOY":{ Vc: [10],        fz: [0.03, 0.06] }
  },

  "FORET CARBURE": {
    "ALUMINIUM":          { Vc: [100, 150],  fz: [0.15, 0.3] },
    "ACIER DOUX":         { Vc: [60, 80],    fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [60, 100],   fz: [0.08, 0.18] },
    "LAITON / CUIVRE":    { Vc: [50],        fz: [0.08, 0.1] },
    "ACIER PRETRAITE":    { Vc: [35, 40],    fz: [0.08, 0.12] },
    "INOX":               { Vc: [30],        fz: [0.08] },
    "TITANE":             { Vc: [25],        fz: [0.03, 0.06] },
    "INCONEL / HASTELLOY":{ Vc: [22],        fz: [0.02, 0.04] }
  },

  "FORET A PLAQUETTES": {
    "ALUMINIUM":          { Vc: [200],       fz: [0.1] },
    "ACIER DOUX":         { Vc: [120],       fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [120],       fz: [0.1] },
    "LAITON / CUIVRE":    { Vc: [110],       fz: [0.1] },
    "ACIER PRETRAITE":    { Vc: [100],       fz: [0.1] },
    "INOX":               { Vc: [80],        fz: [0.1] },
    "TITANE":             { Vc: [60],        fz: [0.1] },
    "INCONEL / HASTELLOY":{ Vc: [50],        fz: [0.08] }
  },

  "FRAISE HSS": {
    "ALUMINIUM":          { Vc: [120],       fz: [0.1, 0.25] },
    "ACIER DOUX":         { Vc: [25],        fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [25],        fz: [0.08, 0.12] },
    "LAITON / CUIVRE":    { Vc: [22],        fz: [0.1] },
    "ACIER PRETRAITE":    { Vc: [20],        fz: [0.08] },
    "INOX":               { Vc: [16],        fz: [0.06] },
    "TITANE":             { Vc: [12],        fz: [0.025, 0.05] },
    "INCONEL / HASTELLOY":{ Vc: [10],        fz: [0.02, 0.04] }
  },

  "FRAISE CARBURE": {
    "ALUMINIUM":          { Vc: [150, 250],  fz: [0.15, 0.3] },
    "ACIER DOUX":         { Vc: [60, 120],   fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [60, 80],    fz: [0.1, 0.2] },
    "LAITON / CUIVRE":    { Vc: [50],        fz: [0.08, 0.1] },
    "ACIER PRETRAITE":    { Vc: [35, 40],    fz: [0.1, 0.15] },
    "INOX":               { Vc: [30],        fz: [0.08, 0.12] },
    "TITANE":             { Vc: [25],        fz: [0.025, 0.05] },
    "INCONEL / HASTELLOY":{ Vc: [22],        fz: [0.02, 0.04] }
  },

  "FRAISE A PLAQUETTES": {
    "ALUMINIUM":          { Vc: [200, 300],  fz: [0.05, 0.1] },
    "ACIER DOUX":         { Vc: [140],       fz: [0.05, 0.1] },
    "ACIER MI-DUR":       { Vc: [120, 140],  fz: [0.05, 0.1] },
    "LAITON / CUIVRE":    { Vc: [120],       fz: [0.05, 0.1] },
    "ACIER PRETRAITE":    { Vc: [110],       fz: [0.05, 0.1] },
    "INOX":               { Vc: [100],       fz: [0.05, 0.1] },
    "TITANE":             { Vc: [80],        fz: [0.05, 0.07] },
    "INCONEL / HASTELLOY":{ Vc: [70],        fz: [0.03, 0.05] }
  },

  "ALESOIR HSS": {
    "ALUMINIUM":          { Vc: [30],        fz: [0.1] },
    "ACIER DOUX":         { Vc: [16],        fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [16],        fz: [0.1] },
    "LAITON / CUIVRE":    { Vc: [15],        fz: [0.1] },
    "ACIER PRETRAITE":    { Vc: [14],        fz: [0.1] },
    "INOX":               { Vc: [12],        fz: [0.1] },
    "TITANE":             { Vc: [10],        fz: [0.1] },
    "INCONEL / HASTELLOY":{ Vc: [10],        fz: [0.08] }
  },

  "ALESOIR CARBURE": {
    "ALUMINIUM":          { Vc: [50],        fz: [0.1] },
    "ACIER DOUX":         { Vc: [25],        fz: [0.1] },
    "ACIER MI-DUR":       { Vc: [25],        fz: [0.1] },
    "LAITON / CUIVRE":    { Vc: [24],        fz: [0.1] },
    "ACIER PRETRAITE":    { Vc: [22],        fz: [0.1] },
    "INOX":               { Vc: [20],        fz: [0.1] },
    "TITANE":             { Vc: [16],        fz: [0.08] },
    "INCONEL / HASTELLOY":{ Vc: [15],        fz: [0.08] }
  },

  "TETE A ALESER": {
    "ALUMINIUM":          { Vc: [200],       fz: [0.05, 0.1] },
    "ACIER DOUX":         { Vc: [120],       fz: [0.05, 0.1] },
    "ACIER MI-DUR":       { Vc: [120],       fz: [0.05, 0.1] },
    "LAITON / CUIVRE":    { Vc: [110],       fz: [0.05, 0.1] },
    "ACIER PRETRAITE":    { Vc: [100],       fz: [0.05, 0.1] },
    "INOX":               { Vc: [60, 80],    fz: [0.05, 0.1] },
    "TITANE":             { Vc: [50],        fz: [0.05, 0.07] },
    "INCONEL / HASTELLOY":{ Vc: [50],        fz: [0.03, 0.05] }
  },

  "TARAUD": {
    "ALUMINIUM":          { Vc: [25] },
    "ACIER DOUX":         { Vc: [9] },
    "ACIER MI-DUR":       { Vc: [9] },
    "LAITON / CUIVRE":    { Vc: [8] },
    "ACIER PRETRAITE":    { Vc: [8] },
    "INOX":               { Vc: [5] },
    "TITANE":             { Vc: [4] },
    "INCONEL / HASTELLOY":{ Vc: [3] }
  }
};

// -----------------------------
// Utilitaires
// -----------------------------
function moyenne(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return NaN;
  return arr.reduce((a,b)=>a+b,0)/arr.length;
}

function formatRange(arr) {
  if (!Array.isArray(arr)) return "—";
  if (arr.length === 1) return String(arr[0]);
  return `${arr[0]} - ${arr[1]}`;
}

// Calcule N (tr/min) : N = Vc * 1000 / (π * D)
function calcRPM_fromVc(Vc, D_mm) {
  if (!Vc || !D_mm || D_mm <= 0) return NaN;
  return (Vc * 1000) / (Math.PI * D_mm);
}

// Calcule Vf (mm/min) : Vf = N * fz * Z
function calcVf(N, fz, Z) {
  if (isNaN(N) || isNaN(fz) || isNaN(Z)) return NaN;
  return N * fz * Z;
}

// -----------------------------
// DOM éléments
// -----------------------------
const outilSelect = document.getElementById("outil");
const matiereSelect = document.getElementById("matiere");
const diamInput = document.getElementById("diametre");
const zInput = document.getElementById("z");
const vcRecoInput = document.getElementById("vcReco");
const fzRecoInput = document.getElementById("fzReco");
const rpmInput = document.getElementById("rpm");
const vfInput = document.getElementById("vf");
const updateBtn = document.getElementById("update");
const addRowBtn = document.getElementById("addRow");
const tableBody = document.querySelector("#dataTable tbody");
const chartCanvas = document.getElementById("chartCanvas");

// -----------------------------
// Remplir menu Outils -> Matières
// -----------------------------
function remplirOutils() {
  outilSelect.innerHTML = "";
  Object.keys(parametres).forEach(outil => {
    const opt = document.createElement("option");
    opt.value = outil;
    opt.textContent = outil;
    outilSelect.appendChild(opt);
  });
}

function remplirMatieresPourOutil(outil) {
  matiereSelect.innerHTML = "";
  const matieres = Object.keys(parametres[outil]);
  matieres.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    matiereSelect.appendChild(opt);
  });
}

// Au changement d'outil, on remplit les matières et met à jour l'affichage
outilSelect.addEventListener("change", () => {
  remplirMatieresPourOutil(outilSelect.value);
  rafraichirAffichage();
});

// changement de matière recalcul automatique
matiereSelect.addEventListener("change", rafraichirAffichage);
diamInput.addEventListener("input", rafraichirAffichage);
zInput.addEventListener("input", rafraichirAffichage);

// initialisation
remplirOutils();
remplirMatieresPourOutil(outilSelect.value);

// -----------------------------
// Chart.js — configuration
// -----------------------------
const chart = new Chart(chartCanvas.getContext("2d"), {
  type: "scatter",
  data: {
    datasets: [{
      label: "Vc (m/min) en fonction du diamètre (mm)",
      data: [],
      pointRadius: 5
    }]
  },
  options: {
    scales: {
      x: {
        title: { display: true, text: "Diamètre (mm)" },
        beginAtZero: true
      },
      y: {
        title: { display: true, text: "Vc (m/min)" },
        beginAtZero: true
      }
    }
  }
});

// -----------------------------
// Animation roue (visuelle)
// -----------------------------
const wheelCanvas = document.getElementById("wheelCanvas");
const wCtx = wheelCanvas.getContext("2d");
let angle = 0;
let rotationSpeed = 0; // radians per frame (approx)

function drawWheel() {
  const W = wheelCanvas.width;
  const H = wheelCanvas.height;
  const radius = Math.min(W,H) / 4;

  wCtx.clearRect(0,0,W,H);
  wCtx.save();
  wCtx.translate(W/2, H/2);
  wCtx.rotate(angle);

  // cercle
  wCtx.beginPath();
  wCtx.arc(0,0,radius,0,Math.PI*2);
  wCtx.lineWidth = 2;
  wCtx.strokeStyle = "#333";
  wCtx.stroke();

  // repère
  wCtx.beginPath();
  wCtx.moveTo(0,0);
  wCtx.lineTo(radius,0);
  wCtx.strokeStyle = "red";
  wCtx.lineWidth = 2;
  wCtx.stroke();

  wCtx.restore();

  angle += rotationSpeed;
  requestAnimationFrame(drawWheel);
}
requestAnimationFrame(drawWheel);

// -----------------------------
// Rafraîchir affichage selon sélection
// -----------------------------
function rafraichirAffichage() {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(diamInput.value);
  const Z = parseFloat(zInput.value);

  if (!outil || !mat) return;

  const param = parametres[outil][mat];
  if (!param) {
    vcRecoInput.value = "—";
    fzRecoInput.value = "—";
    rpmInput.value = "";
    vfInput.value = "";
    rotationSpeed = 0;
    return;
  }

  const VcRange = param.Vc || [];
  const fzRange = param.fz || null;

  // Affichage des plages (texte)
  vcRecoInput.value = formatRange(VcRange);
  fzRecoInput.value = fzRange ? formatRange(fzRange) : "—";

  // Calculs numériques : on prend la moyenne si plage
  const Vc_num = VcRange.length === 0 ? NaN : moyenne(VcRange);
  const fz_num = fzRange ? moyenne(fzRange) : NaN;

  // Calcul RPM
  const N = calcRPM_fromVc(Vc_num, D);
  rpmInput.value = isNaN(N) ? "" : Math.round(N);

  // Calcul Vf si fz disponible
  const Vf = (isNaN(fz_num) || isNaN(N) || isNaN(Z)) ? NaN : calcVf(N, fz_num, Z);
  vfInput.value = isNaN(Vf) ? "" : Vf.toFixed(1);

  // Mise à jour animation en fonction de N
  // conversion N (tr/min) -> tr/s = N/60; rotationSpeed choisit comme radians/frame (≈ tr/s * 2π * facteur)
  rotationSpeed = isNaN(N) ? 0 : (N/60) * 2 * Math.PI * 0.01;
}

// bouton Mettre à jour → recalcul (déjà fait automatiquement sur input, mais utile)
updateBtn.addEventListener("click", rafraichirAffichage);

// Initial refresh
rafraichirAffichage();

// -----------------------------
// Ajouter une ligne au tableau + ajouter point au graphique
// -----------------------------
addRowBtn.addEventListener("click", () => {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(diamInput.value);
  const Z = parseFloat(zInput.value);

  const param = parametres[outil][mat];
  if (!param) return;

  // Valeurs numériques utilisées pour calculs (moyennes si plages)
  const Vc_num = param.Vc && param.Vc.length ? moyenne(param.Vc) : NaN;
  const fz_num = param.fz && param.fz.length ? moyenne(param.fz) : NaN;

  const N = calcRPM_fromVc(Vc_num, D);
  const Vf = (!isNaN(N) && !isNaN(fz_num) && !isNaN(Z)) ? calcVf(N, fz_num, Z) : NaN;

  // Construire cellule fz affichée : si aucune valeur, '—'
  const fz_display = param.fz ? formatRange(param.fz) : "—";
  const vc_display = formatRange(param.Vc || []);

  // Créer ligne
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${outil}</td>
    <td>${mat}</td>
    <td>${Number.isFinite(D) ? D : ""}</td>
    <td>${Number.isFinite(Z) ? Z : ""}</td>
    <td>${vc_display}</td>
    <td>${fz_display}</td>
    <td>${Number.isFinite(N) ? Math.round(N) : ""}</td>
    <td>${Number.isFinite(Vf) ? Vf.toFixed(1) : ""}</td>
  `;
  tableBody.appendChild(tr);

  // Ajouter au graphique : utiliser Vc_num (moyenne) si disponible
  if (!isNaN(Vc_num) && Number.isFinite(D)) {
    chart.data.datasets[0].data.push({ x: D, y: Vc_num });
    chart.update();
  }
});

// -----------------------------
// Petites protections / UX
// -----------------------------
/*
- Si une matière n'a pas de fz (ex : certains tarauds), Vf ne sera pas calculée.
- Les plages sont affichées textuellement, les calculs utilisent la moyenne de la plage.
- Si tu veux forcer l'utilisation d'une borne min ou max au lieu de la moyenne, je peux l'ajouter.
*/

// Fin du script.js
