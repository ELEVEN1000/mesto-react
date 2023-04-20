import React, {useEffect, useState} from "react";
import './Header.jsx';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import Api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [popupProfileOpen, setProfilePopupOpen] = useState(false);
  const [popupAvatarOpen, setAvatarPopupOpen] = useState(false);
  const [popupCardOpen, setCardPopupOpen] = useState(false);
  const [popupAnswerOpen, setAnswerPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (!isLiked) {
      Api
        .addLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((item) =>
            item._id === card._id ? newCard : item
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((item) =>
            item._id === card._id ? newCard : item
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleCardDelete(card) {
    Api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(items) {
    Api
      .changeProfile(items)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(items) {
    Api
      .changeAvatar(items)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(items) {
    Api
      .postCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Promise.all([Api.getUser(), Api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  },[]);

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main
          onEditAvatar={onEditAvatar}
          onEditProfile={onEditProfile}
          onAddPlace={onAddPlace}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}/>
        <Footer/>

        <EditProfilePopup isOpen={popupProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={popupCardOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={popupAvatarOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm title="Вы уверены?" name="popupUpdateAvatar" isOpen={popupAnswerOpen} closeAllPopups={closeAllPopups} form="form_confirm">
            <button className="popup__save-button popup__confirm-button" type="submit" aria-label="save">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  )
}
export default App;
