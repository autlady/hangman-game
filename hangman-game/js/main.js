const task = document.querySelector(".game-task");
const wordDisplay = document.querySelector(".word");
const keyboardWrapper = document.querySelector(".keyboard");

// выбор случайного слова из списка
const getRandomWord = () => {
    const {word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    task.innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    console.log(button, clickedLetter);
}

// создание клавиатуры
for (let i = 1040; i <= 1071; i++) {
    const letterBtn = document.createElement("button");
    letterBtn.innerText = String.fromCharCode(i);
    letterBtn.classList.add("btn-letter");
    keyboardWrapper.appendChild(letterBtn);
    letterBtn.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));

}

getRandomWord();