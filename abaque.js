// ============================================================
// 📈 GENERATION AUTOMATIQUE DE L’ABAQUE (OPTION D)
// ============================================================

const canvasA = document.getElementById("abaqueCanvas");
const ctxA = canvasA.getContext("2d");

canvasA.style.background = "white";

// --- Axes
const diamMin = 1;
const diamMax = 60;

const Nmin = 50;
const Nmax = 3000;

// --- Vitesses de coupe (m/min)
const Vc_list = [10, 15, 20, 30, 40, 50, 60, 80, 100];

// Conversion coordonnées → Canvas
function xFromD(D) {
    return ((D - diamMin) / (diamMax - diamMax)) * canvasA.width;
}

function yFromN(N) {
    return canvasA.height - ((N - Nmin) / (Nmax - Nmin)) * canvasA.height;
}

// ------------------------------------------------------------
// 🧱 Grille
// ------------------------------------------------------------
function drawGridA() {
    ctxA.strokeStyle = "#ddd";
    ctxA.lineWidth = 1;

    // Verticaux
    for (let d = diamMin; d <= diamMax; d += 5) {
        ctxA.beginPath();
        ctxA.moveTo(xFromD(d), 0);
        ctxA.lineTo(xFromD(d), canvasA.height);
        ctxA.stroke();
    }

    // Horizontaux
    for (let n = 100; n <= Nmax; n += 200) {
        ctxA.beginPath();
        ctxA.moveTo(0, yFromN(n));
        ctxA.lineTo(canvasA.width, yFromN(n));
        ctxA.stroke();
    }
}

// ------------------------------------------------------------
// 📈 Tracé d’une courbe N = (1000 × Vc) / (π × D)
// ------------------------------------------------------------
function drawIsocurve(Vc) {
    ctxA.strokeStyle = "black";
    ctxA.lineWidth = 2;
    ctxA.beginPath();

    let first = true;

    for (let D = diamMin; D <= diamMax; D += 0.5) {
        const N = (1000 * Vc) / (Math.PI * D);

        if (N < Nmin || N > Nmax) continue;

        const x = xFromD(D);
        const y = yFromN(N);

        if (first) {
            ctxA.moveTo(x, y);
            first = false;
        } else {
            ctxA.lineTo(x, y);
        }
    }

    ctxA.stroke();

    // Légende
    ctxA.font = "14px Arial";
    ctxA.fillStyle = "black";
    ctxA.fillText(Vc + " m/min", xFromD(diamMax) - 70, yFromN((1000 * Vc) / (Math.PI * diamMax)));
}

// ------------------------------------------------------------
// ▶️ Dessin complet
// ------------------------------------------------------------
function dessinerAbaqueAuto() {
    ctxA.clearRect(0, 0, canvasA.width, canvasA.height);

    drawGridA();

    for (const Vc of Vc_list) {
        drawIsocurve(Vc);
    }

    // Titres
    ctxA.fillStyle = "black";
    ctxA.font = "20px Arial";
    ctxA.fillText("Abaque Vc / Diamètre / RPM", 20, 30);

    // Axe X
    ctxA.font = "16px Arial";
    ctxA.fillText("Diamètre (mm)", canvasA.width / 2 - 40, canvasA.height - 10);

    // Axe Y
    ctxA.save();
    ctxA.rotate(-Math.PI / 2);
    ctxA.fillText("RPM (tr/min)", -canvasA.height / 2 - 40, 20);
    ctxA.restore();
}

dessinerAbaqueAuto();
