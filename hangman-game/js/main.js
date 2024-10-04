window.addEventListener('load', () => {
    // window.localStorage.clear();
	gameResults = JSON.parse(localStorage.getItem('games')) || [];
    const resultsWrapper = document.querySelector(".results");
    gameResults.length === 0 ? resultsWrapper.innerHTML = "Пока нет результатов" : gameResults.map((res) => {
        resultsWrapper.innerHTML += `<div class="results-item">
        <div class="results-num">${gameResults.indexOf(res) + 1}</div>
        <div class="results-word">${res.word} / категория</div>
        <div class="results-steps">${res.score} / 6</div>
        <img src="./img/results/${res.victory}.png" width="30" alt="${res.victory}">
    </div>`;
})
})

const task = document.querySelector(".game-task");
const wordDisplay = document.querySelector(".word");
const gameImg = document.querySelector(".img-hangman");
const keyboardWrapper = document.querySelector(".keyboard");
const guessesText = document.querySelector(".game-score");
const finishModal = document.getElementById("finish-modal");
const finishModalText = document.getElementById("finish-modal-text");
const modalImg = document.querySelector(".modal-img");
const btnPlayGame = document.getElementById("play-again");

var audioClick = new Audio('sounds/click.mp3');
var audioWin = new Audio('sounds/win.mp3');
var audioLoose = new Audio('sounds/loose.mp3');
const volume = document.querySelector(".btn-sound");
const volumeIcon = document.querySelector(".img__sound");

// включение и отключение звука

function soundOn() {
    volumeIcon.src = 'img/sound.svg'
    audioClick.muted = false;
    audioWin.muted = false;
    audioLoose.muted = false;
    volume.classList.remove("muted");
}

function soundOff() {
    volumeIcon.src = 'img/mute.svg'
    audioClick.muted = true;
    audioWin.muted = true;
    audioLoose.muted = true;
    volume.classList.add("muted");
}

volume.addEventListener('click', () => {
    const isSound = volume.classList.contains("muted");
    if (isSound) {
        soundOn();
    } else {
        soundOff();
    }
})

let currentWord, wrongGuessCount, correctLetters;
const maxGuesesCount = 6;

// сброс всех данных
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    keyboardWrapper.querySelectorAll(".btn-letter").forEach(btn => btn.disabled = false);
    gameImg.src = `img/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesesCount}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    finishModal.classList.remove("show");
}

// выбор случайного слова из списка
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    task.innerText = hint;
    resetGame();
}

const initGame = (button, clickedLetter) => {
    // проверка есть ли буква в слове
    if(currentWord.includes(clickedLetter)) {
        // показать верные буквы в слове
        [...currentWord].forEach((letter, index) => {
            if(letter == clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll(".letter")[index].innerText = letter;
                wordDisplay.querySelectorAll(".letter")[index].classList.add("guessed");
            }
        })
    } else {
        // если буквы нет в слове, то увеличение счетчика и изменение картинки
        wrongGuessCount++;
        gameImg.src = `img/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesesCount}`;

    // заканчиваем игру
    if(wrongGuessCount === maxGuesesCount) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

const gameOver = (isVictory) => {

    //запись данных в localStorage
    const gameResult = {
        word: currentWord,
        score: +wrongGuessCount,
        victory: isVictory.toString()
    };

    gameResults = JSON.parse(localStorage.getItem('games')) || [];
    gameResults.push(gameResult);
    if (gameResults.length > 10) {
        gameResults.shift();
    }
    localStorage.setItem('games', JSON.stringify(gameResults));

    console.log(gameResults);
    // показываем модальное окно после окончания игры
    setTimeout(() => {
        isVictory ? audioWin.play() : audioLoose.play();
        finishModalText.innerText = isVictory ? `Вы победили!` : `Вы проиграли!`;
        modalImg.src = `img/${isVictory ? 'victory' : 'lost'}.gif`;
        finishModal.classList.add("show");
    }, 400);
}

// создание клавиатуры
for (let i = 1072; i <= 1103; i++) {
    const letterBtn = document.createElement("button");
    letterBtn.innerText = String.fromCharCode(i);
    letterBtn.classList.add("btn-letter");
    keyboardWrapper.appendChild(letterBtn);
    letterBtn.addEventListener("click", e => {
        audioClick.play();
        initGame(e.target, String.fromCharCode(i))});

}

getRandomWord();
btnPlayGame.addEventListener("click", getRandomWord);


// сохранение результата игры в localstorage

// const saveGame = () => {
//     let gameResult = {
//         word: currentWord,
//         score: wrongGuessCount,
//         victory: isVictory
//     };
//     localStorage.setItem('game', JSON.stringify(gameResult));
// }

// Game.saveFile = function(){
//     var file = {
//         score: Game.scene.score,
//         visits: Game.scene.visits
//     };
//     localStorage.setItem('saveFile',JSON.stringify(file));
// };

// Game.loadFile = function(){
//     var file = JSON.parse(localStorage.getItem('saveFile'));
//     Game.scene.score = file.score;
//     Game.scene.visits = file.visits;
// };