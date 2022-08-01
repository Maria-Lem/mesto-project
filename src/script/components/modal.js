// Open and close modal windows
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

const closeOnEsc = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const renderLoading = (isLoading, submitButton, text) => {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.classList.add('form__submit_disabled');
    submitButton.setAttribute('disabled', true);
    submitButton.textContent = text;
  }
}

export { openPopup, closePopup, closeOnEsc, renderLoading };