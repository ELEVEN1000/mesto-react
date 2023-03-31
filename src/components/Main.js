import React, {useEffect, useState} from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onAn}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUser()
      .then((resp) => {
        setUserName(resp.name);
        setUserDescription(resp.about);
        setUserAvatar(resp.avatar);
      })
      .catch((err) => console.log(err));

    api
      .getCards()
      .then((resp) => {
        setCards(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__overlay">
          <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" onClick={onEditAvatar}/>
        </div>

        <div className="profile__info">
          <div className="profile__items">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__profession">{userDescription}</p>
          </div>
          <button className="profile__button-edit" name="edit" type="button" aria-label="edit" onClick={onEditProfile}></button>
        </div>

        <button className="profile__button-add" name="add" type="button" aria-label="Добавить место" onClick={onAddPlace}></button>

      </section>

      <section className="elements">{cards.map((card) => (
        <Card card={card} key={card._id} onCardClick={onCardClick}/>
      ))}
      </section>

    </main>
  )
}

export default Main;
