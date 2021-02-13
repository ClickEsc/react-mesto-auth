import tickMark from '../images/tick-mark.svg';

function InfoToolTip(props) {
  return (
    <div className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__tooltip">
        <button className="popup__close" onClick={props.onClose} type="button" aria-label="Закрыть попап"></button>
        <img className="popup__tooltip-image" src={tickMark} />
        <p className="popup__tooltip-text">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}
  
export default InfoToolTip;