function PopupWithForm ({title, name, isOpen, closeAllPopups, children, textButton, form}) {

  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button className="popup__close-button" type="button" onClick={closeAllPopups} aria-label="Закрыть"></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__${form}`} name={name} noValidate>
          {children}
          <button className="popup__save-button" type="submit">{textButton || ""}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
