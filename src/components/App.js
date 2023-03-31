import React, {useState} from "react";
import './Header.js';
import Header from "./Header.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";

function App() {
  const [popupProfileOpen, setProfilePopupOpen] = useState(false);
  const [popupAvatarOpen, setAvatarPopupOpen] = useState(false);
  const [popupCardOpen, setCardPopupOpen] = useState(false);
  const [popupAnswerOpen, setAnswerPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setProfilePopupOpen(false);
    setAvatarPopupOpen(false);
    setCardPopupOpen(false);
    setAnswerPopupOpen(false);
    setSelectedCard({});
  };

  const onEditAvatar = () => {
    setAvatarPopupOpen(true);
  };

  const onEditProfile = () => {
    setProfilePopupOpen(true);
  };

  const onAddPlace = () => {
    setCardPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="page">
      <Header/>
      <Main
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onCardClick={handleCardClick}/>
      <Footer/>

      <PopupWithForm title="Редактировать профиль" name="popupProfile" isOpen={popupProfileOpen} closeAllPopups={closeAllPopups} textButton="Сохранить" form="form_profile">
          <input type="text" placeholder="Имя" className="popup__input popup__input_name" id="input-name" name="name" minLength="2" maxLength="40" required/>
          <span className="input-name-error popup__error"></span>
          <input type="text" placeholder="О себе" className="popup__input popup__input_job" id="input-job" name="about" minLength="2" maxLength="200" required/>
          <span className="input-job-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="popupAddCard" isOpen={popupCardOpen} closeAllPopups={closeAllPopups} textButton="Создать" form="form_card">
          <input type="text" placeholder="Название" className="popup__input popup__input_name_add" id="input-name-add" name="name" minLength="2" maxLength="30" required/>
          <span className="input-name-add-error popup__error"></span>
          <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link_add" id="input-link-add" name="link" required/>
          <span className="input-link-add-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="popupUpdateAvatar" isOpen={popupAvatarOpen} closeAllPopups={closeAllPopups} textButton="Сохранить" form="form_avatar">
          <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link_add" id="input-link-update" name="avatar" required/>
          <span className="input-link-update-error popup__error"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="popupUpdateAvatar" isOpen={popupAnswerOpen} closeAllPopups={closeAllPopups} form="form_confirm">
          <button className="popup__save-button popup__confirm-button" type="submit" aria-label="save">Да</button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  )
}
export default App;
