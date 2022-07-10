import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { renderCard } from "./card.js";
import { openPopup, closePopup, closeOnEsc } from "./modal.js";
import { enableValidation } from './validate.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popups = document.querySelectorAll('.popup');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');

const formEdit = document.forms.editProfilePopup;
const formAdd = document.forms.addCardPopup;
const userName = formEdit.elements.userName;
const userOccupation = formEdit.elements.userOccupation;
const photoName = formAdd.elements.photoName;
const photoLink = formAdd.elements.photoLink;

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const cardsBlock = document.querySelector('.cards');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Adding cards to the page from initialCards array
initialCards.forEach((item) => {
  cardsBlock.append(renderCard(item.name, item.link));
})

function changeProfileName(nameValue, jobValue) {
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;
}

buttonEdit.addEventListener('click', () => {
  // При открытии модального окна, шначения инпутов автоматически заполняются значениями в профиле
  userName.value = profileName.textContent;
  userOccupation.value = profileOccupation.textContent;
  openPopup(popupEdit);
  closeOnEsc(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  closeOnEsc(popupAdd);
});

// CLose popups by clicking on overlay & close button
popups.forEach(popup => {
  popup.addEventListener('mousedown', e => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }

    if (e.target.classList.contains('button_type_close')) {
      closePopup(popup);
    }
  })
});

formEdit.addEventListener('submit', function () {
  changeProfileName(userName.value, userOccupation.value);
  closePopup(popupEdit);
});

formAdd.addEventListener('submit', function () {
  cardsBlock.prepend(renderCard(photoName.value, photoLink.value));
  closePopup(popupAdd);
  formAdd.reset();
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 