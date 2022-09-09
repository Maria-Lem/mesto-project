import {
  openPopup
} from "./modal.js";

const cardTemplate = document.querySelector('#cardBlockTemplate').content;
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Creating card
function renderCard(placeValue, photoValue, numberOfLikes, likes, userDataId, id, cardId, handleDeleteCard, handleLikeCard, handleDislikeCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.button__heart-img');
  const cardLikes = cardElement.querySelector('.button__likes-number');
  const deleteButton = cardElement.querySelector('.button_type_delete');

  cardTitle.textContent = placeValue;
  cardImage.src = photoValue;
  cardImage.alt = placeValue;
  cardLikes.textContent = numberOfLikes;

  if (likes.some(like => like._id === userDataId)) {
    likeButton.classList.add('button_active');
  }
  
  if (userDataId !== id) {
    deleteButton.classList.remove('button_visible');
  } else {
    deleteButton.classList.add('button_visible');
    deleteButton.addEventListener('click', e => handleDeleteCard(cardId, e.target));
  }

  likeButton.addEventListener('click', e => {
    if (likeButton.classList.contains('button_active')) {
      handleDislikeCard(cardId, cardLikes, e.target);
    } else {
      handleLikeCard(cardId, cardLikes, e.target);
    }
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = photoValue;
    popupImage.alt = placeValue;
    popupCaption.textContent = placeValue;
    openPopup(popupCard);
  });

  return cardElement;
}

export {
  renderCard
};