const dropdown = document.querySelector('.dropdown');
const dropDownBtn = dropdown.querySelector('.dropdown__button');
const dropDownList = dropdown.querySelector('.dropdown__list');
const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
const dropDownInput = dropdown.querySelector('.dropdown__input-hidden');

// клик по кнопке. Открыть/закрыть select
dropDownBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const dropActive = document.querySelector('.dropdown__list--visible');
    if (dropActive) {
        dropActive.classList.remove('dropdown__list--visible');
    }
    if (this.classList.contains('dropdown__button--active')) {
        dropDownList.classList.remove('dropdown__list--visible');
        this.classList.remove('dropdown__button--active');
    } else {
        dropDownList.classList.add('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
    }

});

// выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.classList.add('text-black');

        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__list--visible');
        dropDownBtn.classList.remove('dropdown__button--active');
    })
})

// клик снаружи дропдауна. Закрыть дропдаун
document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');

    }
})

// нажатие на Tab или Escape. Закрыть дропдаун
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
    }
})



