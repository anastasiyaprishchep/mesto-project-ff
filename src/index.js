// index.js

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { userInfo, getCards, getUserInfo } from "./components/api.js"
import { Promise } from "core-js/shim";

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const editPopupButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formElementNewCard = popupNewCard.querySelector(".popup__form");
const nameInputNewCard = formElementNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkInputNewCard = formElementNewCard.querySelector(
  ".popup__input_type_url"
);
const formElement = popupEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");

const editForm = popupEdit.querySelector(".popup__form");
const cardForm = popupNewCard.querySelector(".popup__form");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//закрытие попапа при клике на крестик
popups.forEach((popup) => {
  const closePopupButton = popup.querySelector(".popup__close");
  closePopupButton.addEventListener("click", () => {
    closePopup(popup);
  });
});

//закрытие по оверлею
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element, deleteCard, openImage));
});

//открытие увеличенной картинки
function openImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;

  openPopup(popupTypeImage);
}

editPopupButton.addEventListener("click", function () {
  openPopup(popupEdit);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(editForm, validationConfig);
});

popupAddButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

//функция редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//функция создания новой карточки

function createNewCard(evt) {
  evt.preventDefault();

  const cardList = {
    name: nameInputNewCard.value,
    link: linkInputNewCard.value,
  };

  const newCard = createCard(cardList, deleteCard, openImage);

  placesList.prepend(newCard);

  evt.target.reset();

  closePopup(popupNewCard);
  clearValidation(cardForm, validationConfig);
}

formElementNewCard.addEventListener("submit", createNewCard);

// включаем валидацию
enableValidation(validationConfig);

// получаем данные пользователя
getUserInfo().then((result) => {
  console.log(result);
});

// получаем карточки
getCards().then((result) => {
  console.log(result);
});