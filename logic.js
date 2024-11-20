let secretNumber;
let attempts = 0;
let timer;
let seconds = 0;
let gameStarted = false;

const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("resBtn");
const msgElement = document.getElementById("msg");
const attemptElement = document.getElementById("Attempt");
const timerElement = document.getElementById("Timer");
const inputElement = document.getElementById("inp");
const difficultySelector = document.getElementById("difficulty");

function startGame() {
    const difficulty = difficultySelector.value;
    let range;
    if (difficulty === "easy") range = 100;
    else if (difficulty === "medium") range = 500;
    else range = 1000;

    secretNumber = Math.floor(Math.random() * range) + 1;
    attempts = 0;
    seconds = 0;
    gameStarted = true;

    updateAttempts();
    startTimer();
    restartButton.style.display = "none";
    msgElement.textContent = "Game started! Try guessing the number.";
}

function updateAttempts() {
    attemptElement.textContent = attempts;
}

function showMessage(message, color) {
    msgElement.textContent = message;
    msgElement.style.color = color;
}

function startTimer() {
    timer = setInterval(() => {
        if (gameStarted) {
            seconds++;
            timerElement.textContent = seconds;
        }
    }, 1000);
}

submitButton.addEventListener("click", () => {
    const userGuess = parseInt(inputElement.value);

    if (!gameStarted) return;
    if (isNaN(userGuess) || userGuess < 1 || userGuess > (difficultySelector.value === "easy" ? 100 : difficultySelector.value === "medium" ? 500 : 1000)) {
        showMessage("Please enter a valid number within the correct range.", "red");
        return;
    }

    attempts++;
    updateAttempts();

    if (userGuess === secretNumber) {
        showMessage(`Congratulations! You guessed the number in ${attempts} attempts and ${seconds} seconds!`, "green");
        clearInterval(timer);
        gameStarted = false;
        restartButton.style.display = "inline-block";
    } else if (userGuess < secretNumber) {
        showMessage(`Try higher! You've made ${attempts} attempt(s).`, "orange");
    } else {
        showMessage(`Try lower! You've made ${attempts} attempt(s).`, "orange");
    }
});

restartButton.addEventListener("click", () => {
    startGame();
});

startGame(); 