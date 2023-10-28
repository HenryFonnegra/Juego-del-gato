// Inicialización de variables
let currentPlayer = 'X'; // Jugador actual, comienza con 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Estado actual del tablero
let gameActive = true; // Indica si el juego está en curso
const message = document.getElementById('message'); // Elemento para mostrar mensajes
const cells = document.getElementsByClassName('cell'); // Casillas del tablero

// Función para manejar el intento de un jugador de marcar una casilla
function makeMove(cellIndex) {
    // Verificar si la casilla está vacía y el juego está activo
    if (gameBoard[cellIndex] === '' && gameActive) {
        // Generar una multiplicación aleatoria
        const multiplication = generateRandomMultiplication();
        // Calcular la respuesta correcta
        const answer = eval(multiplication);

        // Solicitar al jugador que responda la multiplicación
        const userAnswer = prompt(`Resuelve la multiplicación: ${multiplication}`);
        // Comprobar si la respuesta del jugador es correcta
        if (userAnswer === answer.toString()) {
            // Marcar la casilla con el símbolo del jugador actual
            gameBoard[cellIndex] = currentPlayer;
            cells[cellIndex].textContent = currentPlayer;

            // Verificar si alguien ganó el juego
            if (checkWin()) {
                message.innerText = `${currentPlayer} gana el juego!`;
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                // Comprobar si hay un empate
                message.innerText = 'Empate';
                gameActive = false;
            } else {
                // Cambiar al siguiente jugador
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        } else {
            // Respuesta incorrecta, el jugador pierde el turno
            message.innerText = 'Respuesta incorrecta. Turno perdido.';
            // Esperar un momento y luego borrar el mensaje y cambiar al siguiente jugador
            setTimeout(() => {
                message.innerText = '';
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }, 1500);
        }
    }
}

// Genera una multiplicación aleatoria en el formato "num1 * num2"
function generateRandomMultiplication() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return `${num1} * ${num2}`;
}

// Comprueba si hay un ganador en el tablero
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true; // Hay un ganador
        }
    }

    return false; // No hay ganador todavía
}

// Función para reiniciar el tablero y comenzar un nuevo juego
function resetBoard() {
    currentPlayer = 'X'; // Reiniciar al jugador actual
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reiniciar el tablero
    gameActive = true; // Reactivar el juego
    message.innerText = ''; // Borrar cualquier mensaje existente
    Array.from(cells).forEach(cell => cell.textContent = ''); // Borrar contenido de las casillas
}

// Llamar a la función de reinicio inicial para configurar el tablero
resetBoard();
