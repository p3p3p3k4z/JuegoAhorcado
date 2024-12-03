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
let juegoFinalizado = false;
let vidas = 3;
let n_juegos = 0;

// Recuperar el número de juegos desde localStorage si existe
if (localStorage.getItem("n_juegos") !== null) {
    n_juegos = parseInt(localStorage.getItem("n_juegos"));
} else {
    n_juegos = 0; // Si no existe, iniciar en 0
}

// Función para iniciar el juego
function iniciarJuego(diccionariosSeleccionados = Object.keys(diccionarios)) {
    const diccionarioSeleccionado = diccionariosSeleccionados[Math.floor(Math.random() * diccionariosSeleccionados.length)];
    const palabras = diccionarios[diccionarioSeleccionado];
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

    palabraOculta = Array(palabraSeleccionada.length).fill("_");
    letrasIncorrectas = [];
    intentosRestantes = 6;

    if (vidas === 0) {
        vidas = 5; // Resetea vidas si el jugador perdió
    }
    juegoFinalizado = false;

    document.getElementById("word-display").textContent = palabraOculta.join(" ");
    document.getElementById("message").textContent = `Diccionario: ${diccionarioSeleccionado}`;
    document.getElementById("wrong-letters").textContent = "Letras incorrectas: ";
    document.getElementById("attempts-left").textContent = `Intentos restantes: ${intentosRestantes}`;
    document.getElementById("lives-left").textContent = `Vidas restantes: ${vidas}`;

    document.getElementById("letter-input").disabled = false;
    document.getElementById("guess-button").disabled = false;

	n_juegos++;
	localStorage.setItem("n_juegos", n_juegos);

    console.log("Número de juegos jugados:", n_juegos); 
}

function manejarLetra(letra) {
    if (juegoFinalizado) return;

    if (palabraSeleccionada.includes(letra)) {
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === letra) {
                palabraOculta[i] = letra;
            }
        }
    } else {
        if (!letrasIncorrectas.includes(letra)) {
            letrasIncorrectas.push(letra);
            intentosRestantes--;
            drawHangman(6 - intentosRestantes);
        }
    }

    document.getElementById("word-display").textContent = palabraOculta.join(" ");
    document.getElementById("wrong-letters").textContent = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;
    document.getElementById("attempts-left").textContent = `Intentos restantes: ${intentosRestantes}`;

    if (!palabraOculta.includes("_")) {
        document.getElementById("message").textContent = "¡Ganaste!";
        juegoFinalizado = true;
    }else if (intentosRestantes <= 0) {
        vidas--;
        document.getElementById("lives-left").textContent = `Vidas restantes: ${vidas}`;
            
        if (vidas > 0) {
            clearCanvas(); 
            intentosRestantes = 6;
            letrasIncorrectas = [];
            document.getElementById("message").textContent = "Perdiste una vida. Nueva palabra.";
            iniciarJuego();
         } else {
            document.getElementById("message").textContent = `¡Perdiste! Se acabaron tus vidas. La palabra era: ${palabraSeleccionada}`;
            juegoFinalizado = true;
            }
        }
        

    if (juegoFinalizado) {
        document.getElementById("letter-input").disabled = true;
        document.getElementById("guess-button").disabled = true;
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

function reiniciarJuego() {
    iniciarJuego(); // Iniciar un nuevo juego
}

