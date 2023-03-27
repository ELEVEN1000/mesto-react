import React from "react";

function Profile() {
  return (
    <section className="profile">

      <div className="profile__overlay">
        <img src="<%=require('../images/Avatar.png')%> " alt="Аватар профиля" className="profile__avatar"/>
      </div>

      <div className="profile__info">
        <div className="profile__items">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <p className="profile__profession">Исследователь океана</p>
        </div>
        <button className="profile__button-edit" name="edit" type="button" aria-label="edit"></button>
      </div>

      <button className="profile__button-add" name="add" type="button" aria-label="add"></button>

    </section>
  )
}

export default Profile;
