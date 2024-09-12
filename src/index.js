// index.js

import "./pages/index.css";
//import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getInitialCards, getUserInfo, editProfile, addNewCard } from "./components/api.js"
import { editAvatarApi } from "./components/api.js";

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
const saveNewCardButton = popupNewCard.querySelector(".popup__button")


const formElementEdit = popupEdit.querySelector(".popup__form");
const nameInputEdit = formElementEdit.querySelector(".popup__input_type_name");
const jobInputEdit = formElementEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");
const saveEditButton = popupEdit.querySelector(".popup__button");

const editIcon = document.querySelector(".edit-icon");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = popupAvatar.querySelector(".popup__form");
const saveAvatarButton = popupAvatar.querySelector(".popup__button")


// функция загрузки кнопки

function buttonSaveLoader(loader, button) {
  if(loader) {
    button.textContent = "Сохранение...";
  }
  else if (!loader) {
    button.textContent = "Сохранить";
  }
}

//открытие попапа аватара

editIcon.addEventListener('click', function () {
  openPopup(popupAvatar);
})

popupAvatarForm.addEventListener ('submit', () => {
  const avatarLinkInput = document.querySelector(".popup__input_type_avatar_url");
  
  buttonSaveLoader(true, saveAvatarButton);
  editAvatarApi(avatarLinkInput.value)
  .then((data) => {
    const avatarImage = document.querySelector(".profile__image");
    avatarImage.style.backgroundImage = `url(${data.avatar})`;
    closePopup(popupAvatar);
    popupAvatarForm.reset();
  })
  .catch((err) => {
   console.log(err, 'ошибка при редактировании аватара')
  })
  .finally(() => {
    buttonSaveLoader(false, saveAvatarButton);
  })
})

let userId 

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

//открытие увеличенной картинки
function openImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;

  openPopup(popupTypeImage);
}

editPopupButton.addEventListener("click", function () {
  openPopup(popupEdit);

  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileDescription.textContent;

  clearValidation(formElementEdit, validationConfig);
});

popupAddButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

//функция редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  buttonSaveLoader(true, saveEditButton);

  editProfile(nameInputEdit.value, jobInputEdit.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupEdit);
    formElementEdit.reset()
  }) 
  .catch((err) => {
    console.log(err, 'ошибка при редактировании профиля')
  })
  .finally(() => {
    buttonSaveLoader(false, saveEditButton);
  })
}

formElementEdit.addEventListener("submit", handleProfileFormSubmit);

//функция создания новой карточки

function createNewCard(evt) {
  evt.preventDefault();

  buttonSaveLoader(true, saveNewCardButton);
  addNewCard(nameInputNewCard.value, linkInputNewCard.value) 
    .then((data) => {
      const newCard = createCard(data, deleteCard, openImage);
      placesList.prepend(newCard);
      closePopup(popupNewCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err, 'ошибка создания новой карточки')
    })
    .finally(() => {
      buttonSaveLoader(false, saveNewCardButton);
    })
  
  clearValidation(formElementNewCard, validationConfig);
}

formElementNewCard.addEventListener("submit", createNewCard);

// включаем валидацию
enableValidation(validationConfig);

function getUserinfoAndCards() {
return Promise.all([
  getInitialCards(),
  getUserInfo()
])
.then(([cardsData, userData]) => {
  userId = userData._id;

  cardsData.forEach(function (element) {
    placesList.append(createCard(element, deleteCard, likeCard, openImage, userId));
  });
})

.catch((err)=> {
  console.log('err', err);
})
}

getUserinfoAndCards()





  
