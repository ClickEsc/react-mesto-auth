function InfoToolTip(props) {
  return (
    <div className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__tooltip">
        <button className="popup__close" onClick={props.onClose} type="button" aria-label="Закрыть попап"></button>
        <img className="popup__tooltip-image" src={props.content ? props.content.src: ''} />
        <p className="popup__tooltip-text">{props.content ? props.content.text : ''}</p>
      </div>
    </div>
  );
}
  
export default InfoToolTip;