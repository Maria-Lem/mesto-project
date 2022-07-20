import { openPopup, closeOnEsc } from "./modal.js";
import { deleteCard, likeCard } from "./api.js";

const cardTemplate = document.querySelector('#cardBlockTemplate').content;
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Creating card
function renderCard(placeValue, photoValue, numberOfLikes, id) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikes = cardElement.querySelector('.button__likes-number');
  const  deleteButton = cardElement.querySelector('.button_type_delete');

  cardTitle.textContent = placeValue;
  cardImage.src = photoValue;
  cardImage.alt = placeValue;
  cardLikes.textContent = numberOfLikes;

  if ('46f2ef1a527b080d0e0a0456' !== id) {
    deleteButton.classList.remove('button_visible');
  } else {
    deleteButton.classList.add('button_visible');
  }
  
  deleteButton.addEventListener('click', e => {
    deleteCard(id)
    .then(() => {
        console.log(e)
        e.target.closest('.card').remove();
        // if ('46f2ef1a527b080d0e0a0456' === id) {
            
        //   }
        })
  });

  cardElement.querySelector('.button__heart-img').addEventListener('click', e => {
    likeCard(id)
      .then((res) =>{
        cardLikes.textContent = res.likes.length;

        e.target.classList.toggle('button_active');
        // numberOfLikes++;
        console.log(res)
      })
  });
    
  cardImage.addEventListener('click', () => {
    popupImage.src = photoValue;
    popupImage.alt = placeValue;
    popupCaption.textContent = placeValue;
    openPopup(popupCard);
    closeOnEsc(popupCard);
  });

  return cardElement;
}

export { renderCard };