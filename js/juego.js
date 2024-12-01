// Diccionarios disponibles y lógica del juego
const diccionarios = {
    frutas: ["manzana", "pera", "uva", "platano", "fresa"],
    animales: ["gato", "perro", "elefante", "jirafa", "caballo"],
    paises: ["mexico", "canada", "argentina", "brasil", "chile"],
    otros: ["lapiz", "teclado", "telefono", "coche", "camion"]
};

let palabraSeleccionada = "";
let palabraOculta = [];
let letrasIncorrectas = [];
let intentosRestantes = 6;
let ctx = document.getElementById("hangman-canvas").getContext("2d");
let juegoFinalizado = false; // Variable para controlar si el juego terminó

function iniciarJuego(diccionariosSeleccionados = Object.keys(diccionarios)) {
    // Limpiar el lienzo antes de iniciar un nuevo juego
    ctx.clearRect(0, 0, 200, 200);

    // El resto de la lógica sigue igual
    const diccionarioSeleccionado = diccionariosSeleccionados[Math.floor(Math.random() * diccionariosSeleccionados.length)];
    const palabras = diccionarios[diccionarioSeleccionado];
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

    // Inicializar el estado del juego
    palabraOculta = Array(palabraSeleccionada.length).fill("_");
    letrasIncorrectas = [];
    intentosRestantes = 6;
    juegoFinalizado = false;

    // Mostrar palabra oculta y mensaje
    document.getElementById("word-display").textContent = palabraOculta.join(" ");
    document.getElementById("message").textContent = `Diccionario: ${diccionarioSeleccionado}`;
    document.getElementById("wrong-letters").textContent = "Letras incorrectas: ";
    document.getElementById("attempts-left").textContent = `Intentos restantes: ${intentosRestantes}`;
    
    // Activar entrada de letras
    document.getElementById("letter-input").disabled = false;
    document.getElementById("guess-button").disabled = false; 
}


function manejarLetra(letra) {
    if (juegoFinalizado) return; // Si el juego ya terminó, no se procesan más letras

    if (palabraSeleccionada.includes(letra)) {
        // Actualizar la palabra oculta con la letra correcta
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === letra) {
                palabraOculta[i] = letra;
            }
        }
    } else {
        // Si la letra es incorrecta
        if (!letrasIncorrectas.includes(letra)) {
            letrasIncorrectas.push(letra);
            intentosRestantes--; // Restar un intento
            drawHangman(6 - intentosRestantes); // Llamada para dibujar el ahorcado según intentos restantes
        }
    }

    // Actualizar la interfaz
    document.getElementById("word-display").textContent = palabraOculta.join(" ");
    document.getElementById("wrong-letters").textContent = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;
    document.getElementById("attempts-left").textContent = `Intentos restantes: ${intentosRestantes}`;

    // Comprobar si se ganó o perdió
    if (!palabraOculta.includes("_")) {
        document.getElementById("message").textContent = "¡Ganaste!";
        juegoFinalizado = true; // Se finaliza el juego cuando se gana
    } else if (intentosRestantes <= 0) {
        document.getElementById("message").textContent = `¡Perdiste! La palabra era: ${palabraSeleccionada}`;
        juegoFinalizado = true; // Se finaliza el juego cuando se pierden los intentos
    }

    // Desactivar la entrada de letras cuando el juego termina
    if (juegoFinalizado) {
        document.getElementById("letter-input").disabled = true;
        document.getElementById("guess-button").disabled = true; // Si tienes un botón para hacer el intento
    }
}


// Función para verificar si se presionó Enter
function checkEnter(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("letter-input");
        const letra = input.value.toLowerCase();

        // Verificar que la entrada sea una letra válida
        if (letra && /^[a-zñ]$/.test(letra)) { // Validar que sea una letra
            manejarLetra(letra);
        } else {
            alert("Por favor ingresa una letra válida.");
        }

        input.value = ""; // Limpiar el campo
    }
}

// Función para dibujar el ahorcado
function drawHangman(errors) {
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

// Reiniciar el juego
function reiniciarJuego() {
    iniciarJuego(); // Iniciar un nuevo juego
}
