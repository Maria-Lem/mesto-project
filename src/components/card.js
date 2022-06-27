import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#cardBlockTemplate').content;
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Creating card
function renderCard(placeValue, photoValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = placeValue;
  cardImage.src = photoValue;
  cardImage.alt = placeValue;

  cardElement.querySelector('.button_type_like').addEventListener('click', e => e.target.classList.toggle('button_active'));

  cardElement.querySelector('.button_type_delete').addEventListener('click', e => {
    const cardItem = e.target.closest('.card');
    cardItem.remove();
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = photoValue;
    popupImage.alt = placeValue;
    popupCaption.textContent = placeValue;
    openPopup(popupCard);
  });

  return cardElement;
}

export { renderCard };