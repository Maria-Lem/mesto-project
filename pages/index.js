const popup = document.querySelector('.popup');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelector('.button_type_close');

const form = document.querySelector('.form');
const userName = document.querySelector('#userName');
const userOccupation = document.querySelector('#userOccupation');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

function openPopup() {
  if (popup.classList.contains('popup_opened') === true) {
    popup.classList.remove('popup_opened');
  } else {
    popup.classList.add('popup_opened');
  }
}

// При открытии модального окна, шначения инпутов автоматически заполняются значениями в профиле
userName.value = profileName.textContent;
userOccupation.value = profileOccupation.textContent;

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', openPopup);