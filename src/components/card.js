export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(element, deleteCard, openImage, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  cardImage.addEventListener("click", openImage);

  cardDelete.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardLikeButton.addEventListener("click", likeCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(elem) {
  elem.closest(".card").remove();
}

//функция добавления сердечка
function likeCard() {
  document.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_is-active");
    }
  });
}
