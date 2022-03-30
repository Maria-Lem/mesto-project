const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelectorAll('.button_type_close');
const buttonAdd = document.querySelector('.button_type_add');

const form = document.querySelector('.form');
const userName = document.querySelector('.form__input_type_name');
const userOccupation = document.querySelector('.form__input_type_occupation');
const cardName = document.querySelector('.form__input_type_place');
const cardPhoto = document.querySelector('.form__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

function openPopupEdit(e) {
  if (e.target.matches('.button_type_edit')) {
    popupEdit.classList.add('popup_opened');
  } else if (e.target.matches('.button_type_close')) {
    popupEdit.classList.remove('popup_opened');
  }
  // if (popupEdit.classList.contains('popup_opened') === true) {
  //   popupEdit.classList.remove('popup_opened');
  // } else {
  //   popupEdit.classList.add('popup_opened');
  // }
}
console.log(buttonClose);
function openPopupAdd() {
  if (popupAdd.classList.contains('popup_opened') === true) {
    popupAdd.classList.remove('popup_opened');
  } else {
    popupAdd.classList.add('popup_opened');
  }
}

function openEdit() {
  popupEdit.classList.add('popup_opened');
}

function openAdd() {
  popupAdd.classList.add('popup_opened');
}

function closeEdit() {
  popupEdit.classList.remove('popup_opened');
}

function closeAdd() {
  popupAdd.classList.remove('popup_opened');
}

// При открытии модального окна, шначения инпутов автоматически заполняются значениями в профиле
userName.value = profileName.textContent;
userOccupation.value = profileOccupation.textContent;

buttonAdd.addEventListener('click', openAdd);
buttonClose[1].addEventListener('click', closeAdd);
// buttonEdit.addEventListener('click', openPopupEdit);
// buttonClose.addEventListener('click', openPopupEdit);
buttonEdit.addEventListener('click', openEdit);
buttonClose[0].addEventListener('click', closeEdit);