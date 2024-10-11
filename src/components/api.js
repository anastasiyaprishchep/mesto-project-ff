const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "91449441-3560-49e4-b605-bed2a341315e",
    "Content-Type": "application/json",
  },
};

//const PATH = "https://nomoreparties.co/v1/pwff-cohort-1";
//const authorization = "91449441-3560-49e4-b605-bed2a341315e";

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Данные не получены");
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const editProfile = (nameInput, aboutInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput,
    }),
  }).then(handleResponse);
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const cardLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export const deleteLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const editAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};
