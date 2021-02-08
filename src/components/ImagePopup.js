function ImagePopup(props) {
  return (
    <div className={`popup popup_${props.name} ${props.card && 'popup_opened'}`}>
      <figure className="popup__container popup__container_show-image">
        <button className="popup__close popup__close_show-image" onClick={props.onClose} type="button" aria-label="Закрыть попап"></button>
        <img className="popup__image" alt={props.card ? props.card.alt : ''} src={props.card ? props.card.src : ''}/>
        <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </div>
  );
}
  
export default ImagePopup;