// index.js

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

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
}

formElementNewCard.addEventListener("submit", createNewCard);


const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`)

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
}; 

setEventListeners(form)

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    })
      setEventListeners(formElement);
  })
}

enableValidation()

