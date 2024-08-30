const PATH = "https://nomoreparties.co/v1/pwff-cohort-1"
const authorization = "91449441-3560-49e4-b605-bed2a341315e";
const handleResponse = (res) => res.json()

export const getUserInfo = () => {
  return fetch(`${PATH}/users/me`, {
    method: "GET",
    headers: { 
      authorization
    },
  })
    .then(handleResponse)
};

export const getCards = () => {
  return fetch(`${PATH}/cards`, {
    headers: {
      authorization
    },
  })
    .then(handleResponse)
};
