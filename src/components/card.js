import {
  cardLikeApi,
  deleteLikeApi,
  deleteCardApi,
  editAvatarApi,
} from "./api";
//import { closePopup } from "./modal";

export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(element, deleteCard, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like-count");
  const cardId = element._id;
  //const userId = element.owner._id;
  //console.log(userId === element.owner._id)

  likeCounter.textContent = element.likes.length;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  if (userId !== element.owner._id) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.style.display = "block";
  }

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement, element._id);
  });

  cardLikeButton.addEventListener("click", (evt) => {
    likeCard(evt, cardId, likeCounter);
  });

  cardImage.addEventListener("click", openImage);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then((data) => {
      cardElement.remove();
      console.log(data, "карточка удалена");
    })
    .catch((err) => {
      console.log(err, "ошибка при удалении карточки");
    });
}
//функция добавления сердечка
function likeCard(evt, cardId, likeCounter) {
  const cardLikeButton = evt.target;

  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    cardLikeApi(cardId)
      .then((data) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err, "Ошибка при лайке карточки");
      });
  } else {
    deleteLikeApi(cardId)
      .then((data) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err, "Ошибка при удалении лайка");
      });
  }
}
