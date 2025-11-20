// =============================
// TABLEAU PARAMÈTRES (extrait du PDF fourni)
// =============================
const parametres = {
  "FORET HSS": {
    "ALUMINIUM":  { Vc: [70],     fz: [0.1, 0.25] },
    "ACIER DOUX": { Vc: [25],     fz: [0.1] },
    "ACIER MI-DUR": { Vc: [25,35], fz: [0.08,0.12] },
    "LAITON": { Vc: [22], fz: [0.1] },
    "ACIER PRETRAITE": { Vc: [20], fz: [0.08] },
    "INOX": { Vc: [16], fz: [0.07] },
    "TITANE": { Vc: [12], fz: [0.03,0.06] },
    "INCONEL": { Vc: [10], fz: [0.03,0.06] }
  },

  "FRAISE CARBURE": {
    "ALUMINIUM": { Vc: [150,250], fz: [0.15,0.3] },
    "ACIER DOUX": { Vc: [60,120], fz: [0.1] },
    "ACIER MI-DUR": { Vc: [60,80], fz: [0.1,0.2] },
    "LAITON": { Vc: [50], fz: [0.08,0.1] },
    "ACIER PRETRAITE": { Vc: [35,40], fz: [0.1,0.15] },
    "INOX": { Vc: [30], fz: [0.08,0.12] },
    "TITANE": { Vc: [25], fz: [0.025,0.05] },
    "INCONEL": { Vc: [22], fz: [0.02,0.04] }
  }
};

// Remplissage menus déroulants
const outilSelect = document.getElementById("outil");
const matiereSelect = document.getElementById("matiere");

Object.keys(parametres).forEach(outil => {
  const opt = document.createElement("option");
  opt.value = outil;
  opt.textContent = outil;
  outilSelect.appendChild(opt);
});

function fillMatieres() {
  matiereSelect.innerHTML = "";
  const outil = outilSelect.value;
  Object.keys(parametres[outil]).forEach(mat => {
    const opt = document.createElement("option");
    opt.value = mat;
    opt.textContent = mat;
    matiereSelect.appendChild(opt);
  });
}
outilSelect.addEventListener("change", fillMatieres);
fillMatieres();

// =============================
// CALCULS
// =============================
function calcRPM(Vc, D) {
  return (Vc * 1000) / (Math.PI * D);
}

function calcVf(N, fz, Z) {
  return N * fz * Z;
}

// =============================
// Animation roue
// =============================
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
let angle = 0;
let rotationSpeed = 0;

function drawWheel() {
  ctx.clearRect(0,0,300,300);
  ctx.save();
  ctx.translate(150,150);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.arc(0,0,80,0,Math.PI*2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(80,0);
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.restore();
  angle += rotationSpeed;
  requestAnimationFrame(drawWheel);
}
drawWheel();

// =============================
// Mise à jour valeurs
// =============================
document.getElementById("update").addEventListener("click", () => {

  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(document.getElementById("diametre").value);
  const Z = parseFloat(document.getElementById("z").value);

  const VcRange = parametres[outil][mat].Vc;
  const fzRange = parametres[outil][mat].fz;

  const Vc = (VcRange.length === 1) ? VcRange[0] : (VcRange[0] + VcRange[1]) / 2;
  const fz = (fzRange.length === 1) ? fzRange[0] : (fzRange[0] + fzRange[1]) / 2;

  document.getElementById("vcReco").value =
    VcRange.length === 1 ? Vc : `${VcRange[0]} - ${VcRange[1]}`;
  document.getElementById("fzReco").value =
    fzRange.length === 1 ? fz : `${fzRange[0]} - ${fzRange[1]}`;

  const N = calcRPM(Vc, D);
  const Vf = calcVf(N, fz, Z);

  document.getElementById("rpm").value = N.toFixed(0);
  document.getElementById("vf").value = Vf.toFixed(1);

  rotationSpeed = (N/60) * 0.03;
});

// =============================
// Tableau + graphique
// =============================
const tableBody = document.querySelector("#dataTable tbody");

let chart = new Chart(document.getElementById("chartCanvas"), {
  type: "scatter",
  data: {
    datasets: [{
      label: "Vc vs diamètre",
      data: [],
      pointRadius: 5
    }]
  }
});

// Ajouter ligne
document.getElementById("addRow").addEventListener("click", () => {
  const outil = outilSelect.value;
  const mat = matiereSelect.value;
  const D = parseFloat(document.getElementById("diametre").value);
  const Z = parseFloat(document.getElementById("z").value);
  const Vc = parseFloat(document.getElementById("rpm").value);
  const fz = parseFloat(document.getElementById("fzReco").value);

  const N = parseFloat(document.getElementById("rpm").value);
  const Vf = parseFloat(document.getElementById("vf").value);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${outil}</td>
    <td>${mat}</td>
    <td>${D}</td>
    <td>${Z}</td>
    <td>${Vc}</td>
    <td>${fz}</td>
    <td>${N.toFixed(0)}</td>
    <td>${Vf.toFixed(1)}</td>
  `;
  tableBody.appendChild(row);

  chart.data.datasets[0].data.push({ x: D, y: Vc });
  chart.update();
});
