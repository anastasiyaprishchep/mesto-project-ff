// @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
console.log(placesList);
// @todo: Функция создания карточки
function createCard(element, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').alt = element.name;
  cardDelete.addEventListener('click', function () {
    deleteCard(cardElement);
     
  });
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(elem) {
  elem.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element, deleteCard));
})