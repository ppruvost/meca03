// =============================
// Variables globales
// =============================
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

let angle = 0;
let rotationSpeed = 0;

// =============================
// Calcule la fréquence (Hz)
// f = v / (π * d)
// =============================
function calcFreq(d, v) {
  return v / (Math.PI * d);
}

// =============================
// Animation de la roue
// =============================
function drawWheel() {
  const radius = canvas.width / 4;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);

  // Cercle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Un trait pour visualiser la rotation
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
// Mise à jour des paramètres
// =============================
document.getElementById("update").addEventListener("click", () => {
  const d = parseFloat(document.getElementById("diametre").value);
  const v = parseFloat(document.getElementById("vitesse").value);
  const freq = calcFreq(d, v);

  rotationSpeed = freq * 0.1; // vitesse visuelle

  console.log("Fréquence =", freq.toFixed(2), "Hz");
});

// =============================
// Ajout au tableau + Graphique
// =============================
const tableBody = document.querySelector("#dataTable tbody");

let chart = new Chart(document.getElementById("chartCanvas"), {
  type: "scatter",
  data: {
    datasets: [{
      label: "Fréquence en fonction du diamètre",
      data: [],
      pointRadius: 5
    }]
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Diamètre (cm)" } },
      y: { title: { display: true, text: "Fréquence (Hz)" } }
    }
  }
});

document.getElementById("addRow").addEventListener("click", () => {
  const d = parseFloat(document.getElementById("diametre").value);
  const v = parseFloat(document.getElementById("vitesse").value);
  const freq = calcFreq(d, v);

  // Ajout tableau
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${d}</td>
    <td>${v}</td>
    <td>${freq.toFixed(3)}</td>
  `;
  tableBody.appendChild(row);

  // Ajout graphique
  chart.data.datasets[0].data.push({ x: d, y: freq });
  chart.update();
});
