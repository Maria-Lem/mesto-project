import { openPopup, closeOnEsc } from "./modal.js";
import { deleteCard, likeCard, deleteLike } from "./api.js";

const cardTemplate = document.querySelector('#cardBlockTemplate').content;
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Creating card
function renderCard(placeValue, photoValue, numberOfLikes, userDataId, id, cardId) {
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

  if (userDataId !== id) {
    deleteButton.classList.remove('button_visible');
  } else {
    deleteButton.classList.add('button_visible');
    deleteButton.addEventListener('click', e => {
      deleteCard(cardId)
      .then(() => {
          e.target.closest('.card').remove();
          })
    });
  }
  
  likeButton.addEventListener('click', e => {
    if (likeButton.classList.contains('button_active')) {
      deleteLike(cardId)
        .then(res => {
          cardLikes.textContent = res.likes.length;
          e.target.classList.remove('button_active');
        })
    } else {
      likeCard(cardId)
        .then(res =>{
          cardLikes.textContent = res.likes.length;
          e.target.classList.add('button_active');
        })
    }
  });

  const renderLike = (isLiked) => {
    if (isLiked) {
      likeButton.classList.add('button_active');

    } else {
      likeButton.classList.remove('button_active');
    }
  }
    
  cardImage.addEventListener('click', () => {
    popupImage.src = photoValue;
    popupImage.alt = placeValue;
    popupCaption.textContent = placeValue;
    openPopup(popupCard);
  });

  return cardElement;
}

export { renderCard };