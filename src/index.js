// index.js

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const addIcon = new URL("./images/add-icon.svg", import.meta.url);
const avatar = new URL("./images/avatar.jpg", import.meta.url);
const cardOne = new URL("./images/card_1.jpg", import.meta.url);
const cardTwo = new URL("./images/card_2.jpg", import.meta.url);
const cardThree = new URL("./images/card_3.jpg", import.meta.url);
const close = new URL("./images/close.svg", import.meta.url);
const deleteIcon = new URL("./images/delete-icon.svg", import.meta.url);
const editIcon = new URL("./images/edit-icon.svg", import.meta.url);
const likeActive = new URL("./images/like-active.svg", import.meta.url);
const likeInactive = new URL("./images/like-inactive.svg", import.meta.url);
const logo = new URL("./images/logo.svg", import.meta.url);

const galleryList = [
  { name: "Add Icon", link: addIcon },
  { name: "Avatar", link: avatar },
  { name: "Card One", link: cardOne },
  { name: "Card Two", link: cardTwo },
  { name: "Card Three", link: cardThree },
  { name: "Close", link: close },
  { name: "Delete Icon", link: deleteIcon },
  { name: "Edit Icon", link: editIcon },
  { name: "Like Active", link: likeActive },
  { name: "Like Inactive", link: likeInactive },
  { name: "Logo", link: logo },
];

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
const newCardSubmitButton = formElementNewCard.querySelector(".popup__button");
const formElement = popupEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileSubmitButton = formElement.querySelector(".popup__button");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element, deleteCard, openImage));
});

function openImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;

  openPopup(popupTypeImage);
  closePopup();
}

editPopupButton.addEventListener("click", function () {
  openPopup(popupEdit);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  closePopup();
});

popupAddButton.addEventListener("click", function () {
  openPopup(popupNewCard);
  closePopup();
});

//функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);
profileSubmitButton.addEventListener("click", (e) => {
  e.target.closest(".popup").classList.remove("popup_is-opened");
});

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
}

formElementNewCard.addEventListener("submit", createNewCard);
newCardSubmitButton.addEventListener("click", (e) => {
  e.target.closest(".popup").classList.remove("popup_is-opened");
});

//вызов cardLike
likeCard();
