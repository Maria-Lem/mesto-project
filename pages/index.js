const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelectorAll('.button_type_close');
const buttonAdd = document.querySelector('.button_type_add');
const buttonCreate = document.querySelector('.button-text_type_add');

const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
const userName = document.querySelector('.form__input_type_name');
const userOccupation = document.querySelector('.form__input_type_occupation');
const cardName = document.querySelector('.form__input_type_place');
const cardPhoto = document.querySelector('.form__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const cardsBlock = document.querySelector('.cards');

// function openPopupEdit(e) {
//   if (e.target.matches('.button_type_edit')) {
//     popupEdit.classList.add('popup_opened');
//   } else if (e.target.matches('.button_type_close')) {
//     popupEdit.classList.remove('popup_opened');
//   }
// }

// Open and close modal wondows
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

function changeProfileName(nameValue, jobValue) {
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;
}

// Creating new card
function addCard(placeValue, photoValue) {
  const cardContainer = document.createElement('article');
  cardContainer.classList.add('card');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');
  cardImage.src = photoValue;
  cardImage.alt = placeValue;

  const cardContent = document.createElement('div');
  cardContent.classList.add('card__content');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card__title');
  cardTitle.textContent = placeValue;

  const cardButton = document.createElement('button');
  cardButton.classList.add('button', 'button_type_like');

  cardContent.append(cardTitle, cardButton);
  cardContainer.append(cardImage, cardContent);
  cardsBlock.prepend(cardContainer);
}

buttonAdd.addEventListener('click', openAdd);
buttonClose[1].addEventListener('click', closeAdd);
buttonEdit.addEventListener('click', openEdit);
buttonClose[0].addEventListener('click', closeEdit);

formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('hello');
  changeProfileName(userName.value, userOccupation.value);
  closeEdit();
})

formAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  addCard(cardName.value, cardPhoto.value);
  formAdd.reset();
  closeAdd();
});