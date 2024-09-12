const timeToGuess = 5;
const lettersWithAudio = [
    ['А', '01-bukva-a.wav'],
    ['Б', '02-bukva-b.wav'],
    ['В', '03-bukva-v.wav'],
    ['Г', '04-bukva-g.wav'],
    ['Д', '05-bukva-d.wav'],
    ['Е', '06-bukva-e.wav'],
    ['Ж', '07-bukva-zh.wav'],
    ['З', '08-bukva-z.wav'],
    ['И', '09-bukva-i.wav'],
    ['Й', '10-bukva-i-kratko.wav'],
    ['К', '11-bukva-k.wav'],
    ['Л', '12-bukva-l.wav'],
    ['М', '13-bukva-m.wav'],
    ['Н', '14-bukva-n.wav'],
    ['О', '15-bukva-o.wav'],
    ['П', '16-bukva-p.wav'],
    ['Р', '17-bukva-r.wav'],
    ['С', '18-bukva-s.wav'],
    ['Т', '19-bukva-t.wav'],
    ['У', '20-bukva-u.wav'],
    ['Ф', '21-bukva-f.wav'],
    ['Х', '22-bukva-h.wav'],
    ['Ц', '23-bukva-c.wav'],
    ['Ч', '24-bukva-ch.wav'],
    ['Ш', '25-bukva-sh.wav'],
    ['Щ', '26-bukva-sht.wav'],
    ['Ъ', '27-bukva-er-golyam.wav'],
    ['Ь', '28-bukva-er-malak.wav'],
    ['Ю', '29-bukva-yu.wav'],
    ['Я', '30-bukva-ya.wav']
];
let currentLetterIndex = 0;
let results = [];
let timeLeft = timeToGuess;
let timerInterval;

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");

const gameScreen = document.getElementById("game-screen");
const letterElement = document.getElementById("letter");
const smileyElement = document.getElementById("smiley");
const frownyElement = document.getElementById("frowny");
const emojiContainer = document.getElementById("emoji-container");
const timerContainer = document.getElementById("timer-container");
const timeLeftElement = document.getElementById("timeLeft");

const resultScreen = document.getElementById("result-screen");
const resultGrid = document.getElementById("result-grid");
const restartButton = document.getElementById("restart-button");

// Добавяме слушател за бутона "Започни игра"
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Функция за разбъркване на масива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showNextLetter() {
    if (currentLetterIndex < lettersWithAudio.length) {
        letterElement.textContent = lettersWithAudio[currentLetterIndex][0];
        timeLeft = timeToGuess;
        timeLeftElement.textContent = timeLeft;

        timerInterval = setInterval(updateTimer, 1000);
    } else {
        showResult();
    }
}

function updateTimer() {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
    }
}

function playAudio() {
    const audio = new Audio(`audio/${lettersWithAudio[currentLetterIndex][1]}`);
    audio.play();
}

function recordResult(isCorrect) {
    clearInterval(timerInterval);
    const letter = lettersWithAudio[currentLetterIndex][0];
    results.push({ letter: letter, correct: isCorrect });
}

smileyElement.addEventListener("click", function() {
    recordResult(true);
    currentLetterIndex++;
    showNextLetter();
});

frownyElement.addEventListener("click", function() {
    recordResult(false);
    currentLetterIndex++;
    showNextLetter();
});

// Функция за стартиране на играта
function startGame() {
    startScreen.style.display = 'none'; // Скриваме началния екран
    resultScreen.style.display = 'none'; // Скриваме екрана с резултатите
    gameScreen.style.display = 'block'; // Показваме екрана за играта
    currentLetterIndex = 0;
    results = [];
    shuffleArray(lettersWithAudio); // Разбъркваме буквите
    showNextLetter();
}

function showResult() {
    // Изчистваме съдържанието на resultGrid преди да добавим новите резултати
    resultGrid.innerHTML = '';

    // Скриваме началния екран и екрана за играта
    startScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    // Добавяме резултатите към таблицата
    results.forEach(result => {
        const letterElement = document.createElement('div');
        letterElement.textContent = result.letter;
        letterElement.classList.add('grid-item');
        if (result.correct) {
            letterElement.classList.add('correct');
        } else {
            letterElement.classList.add('wrong');
        }
        resultGrid.appendChild(letterElement);
    });
}