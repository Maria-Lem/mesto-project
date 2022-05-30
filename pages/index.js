const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popup = document.querySelectorAll('.popup');
const popupContent = document.querySelectorAll('.container');

const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');
const buttonClose = document.querySelectorAll('.button_type_close');
const buttonLike = document.querySelectorAll('.button_type_like');
const buttonDelete = document.querySelectorAll('.button_type_delete');

const formEdit = document.forms.editProfilePopup;
const formAdd = document.forms.addCardPopup;
const userName = formEdit.elements.userName;
const userOccupation = formEdit.elements.userOccupation;
const photoName = formAdd.elements.photoName;
const photoLink = formAdd.elements.photoLink;

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

const closeOnEsc = (popup) => {
  const esc = (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
    document.removeEventListener('keydown', esc);
  };

  document.addEventListener('keydown', esc);
};

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

// CLose popups by clicking on overlay
popupContent.forEach(container => container.addEventListener('click', e => e.stopPropagation()));
popup.forEach(overlay => overlay.addEventListener('click', e => closePopup(e.target.closest('.popup'))));

buttonClose.forEach(btn => btn.addEventListener('click', e => closePopup(e.target.closest('.popup'))));


formEdit.addEventListener('submit', function () {
  changeProfileName(userName.value, userOccupation.value);
  closePopup(popupEdit);
});

formAdd.addEventListener('submit', function () {
  cardsBlock.prepend(renderCard(photoName.value, photoLink.value));
  closePopup(popupAdd);
  formAdd.reset();
});

// Validation

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_disabled');
  } else {
    buttonElement.classList.remove('form__submit_disabled');
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');

    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      toggleButtonState(inputList, buttonElement);
    });

    setEventListeners(formElement);
  });
};

enableValidation();