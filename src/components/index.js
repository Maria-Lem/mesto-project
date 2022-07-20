import '../pages/index.css'; // добавьте импорт главного файла стилей 
import {
  renderCard
} from "./card.js";
import {
  getUser,
  getCards,
  changeUserName,
  addNewCard,
  changeAvatar,
} from './api.js';
import {
  openPopup,
  closePopup,
  closeOnEsc
} from "./modal.js";
import {
  enableValidation
} from './validate.js';
import {
  renderLoading
} from './modal.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupChangeAvatar = document.querySelector('.popup_type_avatar');
const popups = document.querySelectorAll('.popup');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonSubmitEdit = document.querySelector('.form__submit-edit');
const buttonAdd = document.querySelector('.button_type_add');
const buttonSubmitAdd = document.querySelector('.form__submit-add');
const avatar = document.querySelector('.profile__pic-container');
const buttonSubmitAvatar = document.querySelector('.form__submit-avatar');

const formEdit = document.forms.editProfilePopup;
const formAdd = document.forms.addCardPopup;
const formAvatar = document.forms.changeAvatarPopup;
const userName = formEdit.elements.userName;
const userOccupation = formEdit.elements.userOccupation;
const photoName = formAdd.elements.photoName;
const photoLink = formAdd.elements.photoLink;
const avatarLink = formAvatar.elements.avatarLink;

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const profileAvatar = document.querySelector('.profile__pic');

const cardsBlock = document.querySelector('.cards');

Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    profileName.textContent = userData.name;
    profileOccupation.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    cardData.forEach(item => {
      cardsBlock.append(renderCard(item.name, item.link, item.likes.length, userData._id, item.owner._id, item._id));
    });
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
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

avatar.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
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
  renderLoading(true, buttonSubmitEdit);
  changeUserName(userName.value, userOccupation.value)
    .then(data => {
      changeProfileName(data.name, data.about);
      closePopup(popupEdit);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitEdit, 'Сохранить');
    })
});

formAdd.addEventListener('submit', function () {
  renderLoading(true, buttonSubmitAdd);
  Promise.all([getUser(), addNewCard(photoName.value, photoLink.value)])
    .then(([userData, newCardData]) => {
      cardsBlock.prepend(renderCard(newCardData.name, newCardData.link, newCardData.likes.length, userData._id, newCardData.owner._id, newCardData._id))
      closePopup(popupAdd);
      formAdd.reset();
    })
    .finally(() => {
      renderLoading(false, buttonSubmitAdd, 'Создать');
    })
});

formAvatar.addEventListener('submit', () => {
  renderLoading(true, buttonSubmitAvatar);
  changeAvatar(avatarLink.value)
    .then(data => {
      profileAvatar.src = data.avatar;
      closePopup(popupChangeAvatar);
      formAvatar.reset();
    })
    .finally(() => {
      renderLoading(false, buttonSubmitAvatar, 'Сохранить');
    })
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});