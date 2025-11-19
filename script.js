// =============================
// Variables globales
// =============================
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

let angle = 0;
let rotationSpeed = 0; // vitesse de rotation visuelle

// =============================
// Calcul vitesse de coupe
// Vc (m/min) = π * D(mm) * N(rpm) / 1000
// =============================
function calcVc(D, N) {
  return Math.PI * D * N / 1000;
}

// =============================
// Dessin + animation de la roue
// =============================
function drawWheel() {
  const radius = canvas.width / 4;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);

  // Roue / outil
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Trait = repère visuel
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(radius, 0);
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.restore();

  angle += rotationSpeed;
  requestAnimationFrame(drawWheel);
}

drawWheel();

// =============================
// Mise à jour des valeurs
// =============================
document.getElementById("update").addEventListener("click", () => {
  const D = parseFloat(document.getElementById("diametre").value);
  const N = parseFloat(document.getElementById("rpm").value);

  if (isNaN(D) || isNaN(N)) return;

  const Vc = calcVc(D, N);
  document.getElementById("vc").value = Vc.toFixed(2);

  // RPM → tr/min → tr/s
  const turnsPerSecond = N / 60;

  // Animation visuelle
  rotationSpeed = turnsPerSecond * 2 * Math.PI * 0.02;
});

// =============================
// Tableau + Graphique
// =============================
const tableBody = document.querySelector("#dataTable tbody");

let chart = new Chart(document.getElementById("chartCanvas"), {
  type: "scatter",
  data: {
    datasets: [{
      label: "Vc en fonction du diamètre",
      data: [],
      pointRadius: 5
    }]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Diamètre (mm)" } },
      y: { title: { display: true, text: "Vc (m/min)" } }
    }
  }
});

document.getElementById("addRow").addEventListener("click", () => {
  const D = parseFloat(document.getElementById("diametre").value);
  const N = parseFloat(document.getElementById("rpm").value);

  if (isNaN(D) || isNaN(N)) return;

  const Vc = calcVc(D, N);

  // Ajout tableau
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${D}</td>
    <td>${N}</td>
    <td>${Vc.toFixed(2)}</td>
  `;
  tableBody.appendChild(row);

  // Ajout graphique
  chart.data.datasets[0].data.push({ x: D, y: Vc });
  chart.update();
});
