// Open and close modal windows
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
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

export { openPopup, closePopup, closeOnEsc };