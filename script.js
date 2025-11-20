// ============================================================
// 📈 GENERATION DE L’ABAQUE Vc / D / N
// ============================================================

const canvas = document.getElementById("abaqueCanvas");
const ctx = canvas.getContext("2d");

canvas.style.background = "white";

// --- Axe : Diamètre (mm)
const diamMin = 1;
const diamMax = 50;

// --- Axe : N (tours/min)
const Nmin = 50;
const Nmax = 2000;

// --- Liste des vitesses de coupe comme dans le tableau Scribd
const Vc_list = [10, 15, 20, 25, 30, 40, 50, 60, 80, 100];

// ------------------------------------------------------------
// 🔧 Fonction pour convertir valeurs → coordonnées sur le canvas
// ------------------------------------------------------------
function xFromD(D) {
  return ((D - diamMin) / (diamMax - diamMin)) * canvas.width;
}

function yFromN(N) {
  return canvas.height - ((N - Nmin) / (Nmax - Nmin)) * canvas.height;
}

// ------------------------------------------------------------
// 🧱 Grille
// ------------------------------------------------------------
function drawGrid() {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  // Lignes verticales (diamètres)
  for (let d = diamMin; d <= diamMax; d += 2) {
    ctx.beginPath();
    ctx.moveTo(xFromD(d), 0);
    ctx.lineTo(xFromD(d), canvas.height);
    ctx.stroke();
  }

  // Lignes horizontales (vitesses de rotation)
  for (let N = 100; N <= Nmax; N += 100) {
    ctx.beginPath();
    ctx.moveTo(0, yFromN(N));
    ctx.lineTo(canvas.width, yFromN(N));
    ctx.stroke();
  }
}

// ------------------------------------------------------------
// 📈 Traçage d’une courbe N = (1000 * Vc) / (π * D)
// ------------------------------------------------------------
function drawCurve(Vc) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  ctx.beginPath();

  let first = true;
  for (let D = diamMin; D <= diamMax; D += 0.5) {
    const N = (1000 * Vc) / (Math.PI * D);

    if (N < Nmin || N > Nmax) continue;

    const x = xFromD(D);
    const y = yFromN(N);

    if (first) {
      ctx.moveTo(x, y);
      first = false;
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  // Légende en bout de courbe
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  ctx.fillText(Vc + " m/min", xFromD(diamMax) - 70, yFromN((1000 * Vc) / (Math.PI * diamMax)));
}

// ------------------------------------------------------------
// ▶️ Dessiner l'abaque complet
// ------------------------------------------------------------
function dessinerAbaque() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  for (const Vc of Vc_list) {
    drawCurve(Vc);
  }

  // Titres
  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.fillText("Abaque Vc / Diamètre / N", 10, 25);

  // Axes
  ctx.font = "14px Arial";
  ctx.fillText("Diamètre (mm)", canvas.width / 2 - 40, canvas.height - 10);
  ctx.save();
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Vitesse de rotation (tr/min)", -canvas.height / 2 - 60, 20);
  ctx.restore();
}

// Lancer le dessin
dessinerAbaque();
