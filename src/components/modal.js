export { openPopup, closePopup };

//функция открытия модального окна
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  popupElement.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupByEsc);
}

//функция закрытия модального окна
function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//функция закрытия по Esc
function closePopupByEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
