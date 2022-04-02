const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelectorAll('.button_type_close');
const buttonAdd = document.querySelector('.button_type_add');
const buttonLike = document.querySelectorAll('.button_type_like');
const buttonDelete = document.querySelectorAll('.button_type_delete');

const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
const userName = document.querySelector('.form__input_type_name');
const userOccupation = document.querySelector('.form__input_type_occupation');
const cardInputName = document.querySelector('.form__input_type_place');
const cardInputPhoto = document.querySelector('.form__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const cardsBlock = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cardBlockTemplate').content;


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

//Adding cards to the page from initialCards array
initialCards.forEach((item) => {
  cardsBlock.append(renderCard(item.name, item.link));
})

// Open and close modal wondows
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

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
buttonAdd.addEventListener('click', () => openPopup(popupAdd));

buttonClose.forEach(btn => btn.addEventListener('click', e => closePopup(e.target.closest('.popup'))))

formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
  changeProfileName(userName.value, userOccupation.value);
  closePopup(popupEdit);
});

formAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  cardsBlock.prepend(renderCard(cardInputName.value, cardInputPhoto.value));
  closePopup(popupAdd);
  formAdd.reset();
});