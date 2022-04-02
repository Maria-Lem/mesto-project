const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelectorAll('.button_type_close');
const buttonAdd = document.querySelector('.button_type_add');
const buttonLike = document.querySelectorAll('.button_type_like');
const buttonDelete = document.querySelectorAll('.button_type_delete');
const buttonCreate = document.querySelector('.button-text_type_add');

const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
const userName = document.querySelector('.form__input_type_name');
const userOccupation = document.querySelector('.form__input_type_occupation');
const cardInputName = document.querySelector('.form__input_type_place');
const cardInputPhoto = document.querySelector('.form__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const cardsBlock = document.querySelector('.cards');
const cardImage = document.querySelector('.card__image');

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
initialCards.forEach((elem) => {
  const cardBlockTemplate = document.querySelector('#cardBlockTemplate').content;
  const cardElement = cardBlockTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = elem.name;
  cardElement.querySelector('.card__image').src = elem.link;
  cardElement.querySelector('.card__image').alt = elem.name;
  
  cardElement.querySelector('.button_type_like').addEventListener('click', e => e.target.classList.toggle('button_active'));

  cardElement.querySelector('.button_type_delete').addEventListener('click', e => {
    const cardItem = e.target.closest('.card');
    cardItem.remove();
  });
  
  // cardElement.querySelector('.card__image').addEventListener('click', e => {
  //   // console.log(e.target.src.parentElement)
  //   openCard(e.target.alt, e.target.src);
  // });
  
  // cardElement.querySelector('.button_type_close').removeEventListener('click',  console.log('hello'));

  
  cardsBlock.append(cardElement);
});

// Open and close modal wondows
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// При открытии модального окна, шначения инпутов автоматически заполняются значениями в профиле
userName.value = profileName.textContent;
userOccupation.value = profileOccupation.textContent;

function changeProfileName(nameValue, jobValue) {
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;
}

// Creating new card
// function addCard(placeValue, photoValue) {
//   const cardContainer = document.createElement('article');
//   cardContainer.classList.add('card');

//   const cardImage = document.createElement('img');
//   cardImage.classList.add('card__image');
//   cardImage.src = photoValue;
//   cardImage.alt = placeValue;

//   const cardContent = document.createElement('div');
//   cardContent.classList.add('card__content');

//   const cardTitle = document.createElement('h3');
//   cardTitle.classList.add('card__title');
//   cardTitle.textContent = placeValue;

//   const cardButton = document.createElement('button');
//   cardButton.classList.add('button', 'button_type_like');

//   cardContent.append(cardTitle, cardButton);
//   cardContainer.append(cardImage, cardContent);
//   cardsBlock.prepend(cardContainer);
// }

//Creating new card
function addCard(placeValue, photoValue) {
  const cardTemplate = document.querySelector('#cardBlockTemplate').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = placeValue;
  cardElement.querySelector('.card__image').src = photoValue;

  cardElement.querySelector('.button_type_like').addEventListener('click', e => e.target.classList.toggle('button_active'));

  cardElement.querySelector('.button_type_delete').addEventListener('click', e => {
    const cardItem = e.target.closest('.card');
    cardItem.remove();
  });

  cardElement.querySelector('.card__image').addEventListener('click', e => {
    openCard(e.target.alt, e.target.src);
  });

  cardsBlock.prepend(cardElement);
  
}

//Opening card modal window
function openCard(placeValue, photoValue) {
  const cardPopupTemplate = document.querySelector('#cardPopup').content;
  const cardPopupElem = cardPopupTemplate.querySelector('.card_popup').cloneNode(true);

  cardPopupElem.querySelector('.card__title_popup').textContent = placeValue;
  cardPopupElem.querySelector('.card__image_popup').src = photoValue;
  cardPopupElem.querySelector('.card__image_popup').alt = placeValue;
  document.querySelector('.card__image').addEventListener('click', e => {
    // cardPopupElem.classList.add('card_opened');
    // console.log(cardPopupElem)
    openPopup(cardPopupElem);
    // openCard(e.target.alt, e.target.src);

  });
// console.log(document.querySelector('.card__image'))
  // cardPopupElem.querySelector('.card__image_popup').parentElement.parentElement.addEventListener('open', e => e.target.classList.add('popup'));

  cardPopupElem.querySelector('.button_type_close').addEventListener('click', function(e) {
    const cardItem = e.target.closest('.card_popup');
    console.log(cardItem);
    cardItem.style.transition = 'opacity 2s';
    cardItem.remove();
    // cardsBlock.querySelector('.card_popup').classList.add('card_opened');
  });
  
  cardsBlock.prepend(cardPopupElem);
}

buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonClose[1].addEventListener('click', () => closePopup(popupAdd));
buttonEdit.addEventListener('click', () => openPopup(popupEdit));
buttonClose[0].addEventListener('click', () => closePopup(popupEdit));

buttonLike.forEach(item => {
  item.addEventListener('click', function (e) {
    e.target.classList.toggle('button_active');
  });
});

buttonDelete.forEach(item => {
  item.addEventListener('click', function () {
    const cardItem = item.closest('.card');
    cardItem.remove();
  });
});

formEdit.addEventListener('submit', function (e) {
  e.preventDefault();
  changeProfileName(userName.value, userOccupation.value);
  closeEdit();
});

formAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  addCard(cardInputName.value, cardInputPhoto.value);
  formAdd.reset();
  closeAdd();
});