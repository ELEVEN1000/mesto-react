import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  const handleClick = () => {onCardClick(card);}
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button-like ${isLiked && 'element__button-like_active'}`);

  function handleDeleteCard() {
    onCardDelete(card);
  }
  function handleLikeCard() {
    onCardLike(card);
  }

  return (
      <article className="element">
        {isOwn && <button className="element__trash" type="button" aria-label="Удалить место" onClick={handleDeleteCard}></button>}
        <img src={card.link} alt={`Фотография ${card.name}`} className="element__image" onClick={handleClick}/>
        <div className="element__content">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" ></button>
            <span className="element__clock"></span>
          </div>
        </div>
      </article>
  )
}

export default Card;
