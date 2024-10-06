
class ResultsHTML {

   createResult() {
		let gameResults = JSON.parse(localStorage.getItem('games')) || [];
		const resultsWrapper = document.querySelector(".results");
		gameResults.length === 0 ? resultsWrapper.innerHTML = "Пока нет результатов" : gameResults.map((res) => {
			resultsWrapper.innerHTML += `<div class="results-item">
        <div class="results-num">${gameResults.indexOf(res) + 1}</div>
        <div class="results-word">${res.word} / ${res.category}</div>
        <div class="results-steps">${res.score} / 6</div>
        <img src="./img/results/${res.victory}.png" width="30" alt="${res.victory}">
    </div>`;
		})
	}

	removeResults() {
		const resultsWrapper = document.querySelector(".results");
		if(resultsWrapper.children.length) {
			const allResults = resultsWrapper.querySelectorAll('.results-item');
			allResults.forEach( elem => elem.remove());
		}

        if (resultsWrapper.textContent) resultsWrapper.textContent = "";
	}
}

document.addEventListener("DOMContentLoaded", function (){

	/* =============== modal с атрибутом frame-modal ===============*/
  const bodyEl = document.body;
	const modalFramesOpen = document.querySelectorAll('[frame-btn]');
	const modalFrames = document.querySelectorAll('[frame-modal]');
	if (modalFrames.length > 0) {
		const modalFramesClose = document.querySelectorAll('[frame-close]');

		for (let item of modalFramesOpen) {
			item.addEventListener('click', function (e) {
				for (let item of modalFrames) {
					item.classList.remove('show');
					bodyEl.classList.remove('noscroll');
				}

				e.preventDefault();

				const itemAttr = item.getAttribute('frame-btn');

				if (itemAttr === 'results-modal') {
					const resultObject = new ResultsHTML();
					resultObject.createResult();
				}

				for (let frame of modalFrames) {
					const frameAttr = frame.getAttribute('frame-modal');
					if (frameAttr === itemAttr) {
						frame.classList.add('show');
						bodyEl.classList.add('noscroll');
					}
				}
			});
		}
		/*==  закрыть модалки  frame-modal по клику на кнопку ======*/
		for (let item of modalFramesClose) {
			item.addEventListener('click', function (e) {
				e.preventDefault();
				const resultsObject = new ResultsHTML();
				resultsObject.removeResults();
				item.closest('[frame-modal]').classList.remove('show');
				bodyEl.classList.remove('noscroll');
			});
		}
		/*=============== закрыть модалки по клику вне ===============*/
		for (let frame of modalFrames) {
			frame.addEventListener('click', function (e) {
				if (e.target === e.currentTarget) {
					const resultsObject = new ResultsHTML();
					resultsObject.removeResults();
					this.classList.remove('show');
					bodyEl.classList.remove('noscroll');
				}
			});
		}
	}
});
