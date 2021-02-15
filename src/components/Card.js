import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  
  const currentUserInfo = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки, 
  // чтобы скрыть или показать иконку удаления карточки
  const isOwn = props.card.owner._id === currentUserInfo._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUserInfo._id);

  const cardLikeButtonClassName = `${isLiked ? 'photo-gallery__like-button photo-gallery__like-button_clicked' : 'photo-gallery__like-button'}`; 

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="photo-gallery__item">
      <img className="photo-gallery__image" onClick={handleCardClick} alt={props.card.alt} src={props.card.link}/>
      <h2 className="photo-gallery__heading">{props.card.name}</h2>
      <div className="photo-gallery__like-container">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
        <p className="photo-gallery__like-counter">{`${props.card.likes.length}`}</p>
      </div>
      {isOwn ? 
        <button className="photo-gallery__remove-button" onClick={handleDeleteClick} type="button"></button>
      : ''}
    </li>
  );
}

export default Card;