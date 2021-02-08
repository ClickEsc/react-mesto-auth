function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form noValidate onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`} name={`${props.name}-form`}>
        <button className="popup__close" onClick={props.onClose} type="button" aria-label="Закрыть попап"></button>
        <h2 className="popup__title">{`${props.title}`}</h2>
        {props.children}
        <button className="popup__save" type="submit" aria-label="Сохранить изменения">{`${props.buttonTitle}`}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;