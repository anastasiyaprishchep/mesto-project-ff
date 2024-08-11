export { openPopup, closePopup };

//функция открытия модального окна
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  popupElement.classList.add("popup_is-animated");
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupElement.classList.add("popup_is-opened");
    }
  });
}

//функция закрытия модального окна
function closePopup() {
  //при нажатии на крестик
  const closePopupButton = document.querySelectorAll(".popup__close");
  const popup = document.querySelectorAll(".popup");

  closePopupButton.forEach((element) => {
    element.addEventListener("click", function () {
      element.closest(".popup").classList.remove("popup_is-opened");
    });
  });

  // при клике на Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      for (let i = 0; i < popup.length; i++) {
        popup[i].classList.remove("popup_is-opened");
      }
    }
  });

  //при клике вне модального окна
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup_is-opened")) {
      e.target.classList.remove("popup_is-opened");
    }
  });
}
