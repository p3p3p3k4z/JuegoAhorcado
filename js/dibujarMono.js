// Función para dibujar el ahorcado
function drawHangman(errors) {
    const canvas = document.getElementById("hangman-canvas");
    const ctx = canvas.getContext("2d");

    if (errors === 1) {
        ctx.beginPath();
        ctx.arc(100, 40, 20, 0, Math.PI * 2);
        ctx.stroke();
    } else if (errors === 2) {
        ctx.beginPath();
        ctx.moveTo(100, 60);
        ctx.lineTo(100, 120);
        ctx.stroke();
    } else if (errors === 3) {
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(80, 100);
        ctx.stroke();
    } else if (errors === 4) {
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(120, 100);
        ctx.stroke();
    } else if (errors === 5) {
        ctx.beginPath();
        ctx.moveTo(100, 120);
        ctx.lineTo(80, 150);
        ctx.stroke();
    } else if (errors === 6) {
        ctx.beginPath();
        ctx.moveTo(100, 120);
        ctx.lineTo(120, 150);
        ctx.stroke();
    }
}

function clearCanvas() {
    const canvas = document.getElementById("hangman-canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpia todo el canvas
}

