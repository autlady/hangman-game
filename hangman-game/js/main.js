const task = document.querySelector(".game-task");
const wordDisplay = document.querySelector(".word");
const gameImg = document.querySelector(".img-hangman");
const keyboardWrapper = document.querySelector(".keyboard");
const guessesText = document.querySelector(".game-score");
let currentWord, wrongGuessCount = 0;
const maxGuesesCount = 6;

// выбор случайного слова из списка
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    task.innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    // проверка есть ли буква в слове
    if(currentWord.includes(clickedLetter)) {
        // показать верные буквы в слове
        [...currentWord].forEach((letter, index) => {
            if(letter == clickedLetter) {
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
}

// создание клавиатуры
for (let i = 1072; i <= 1103; i++) {
    const letterBtn = document.createElement("button");
    letterBtn.innerText = String.fromCharCode(i);
    letterBtn.classList.add("btn-letter");
    keyboardWrapper.appendChild(letterBtn);
    letterBtn.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));

}

getRandomWord();