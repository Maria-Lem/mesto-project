const mestoApiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '11a4c094-1331-44b4-8d63-0b635dd3a5c6',
    'Content-Type': 'application/json'
  }
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getUser = () => {
  return fetch(`${mestoApiConfig.baseUrl}/users/me`, {
    headers: mestoApiConfig.headers
  })
    .then(getResponse)
}

const getCards = () => {
  return fetch(`${mestoApiConfig.baseUrl}/cards`, {
    headers: mestoApiConfig.headers
  })
    .then(getResponse)
}

const changeUserName = (name, about) => {
  return fetch(`${mestoApiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(getResponse)
}

const addNewCard = (name, link) => {
  return fetch(`${mestoApiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(getResponse)
}

const changeAvatar = (avatar) => {
  return fetch(`${mestoApiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then(getResponse)
}

const deleteCard = (cardId) => {
  return fetch(`${mestoApiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: mestoApiConfig.headers
  })
    .then(getResponse)
}

const likeCard = (cardId) => {
  return fetch(`${mestoApiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: mestoApiConfig.headers
  })
    .then(getResponse)
}

const deleteLike = (cardId) => {
  return fetch(`${mestoApiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: mestoApiConfig.headers
  })
    .then(getResponse)
}

export {
  getUser,
  getCards,
  changeUserName,
  addNewCard,
  changeAvatar,
  deleteCard,
  likeCard,
  deleteLike
};