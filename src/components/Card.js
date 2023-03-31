function Card({card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  }
  return (
      <article className="element">
        <button className="element__trash" type="button" aria-label="Удалить место"></button>
        <img src={card.link} alt="" className="element__image" onClick={handleClick}/>
        <div className="element__content">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button className="element__button-like" type="button" aria-label="Нравится"></button>
            <span className="element__clock"></span>
          </div>
        </div>
      </article>
  )
}

export default Card;
