const task = document.querySelector(".game-task");
const wordDisplay = document.querySelector(".word");

// выбор случайного слова из списка
const getRandomWord = () => {
    const {word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    task.innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

// создание клавиатуры

getRandomWord();